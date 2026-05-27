const { verifyEmail, getDidYouMean } = require('./index');
const net = require('net');
const dns = require('dns').promises;

jest.mock('net');
jest.mock('dns', () => ({
  promises: { resolveMx: jest.fn() }
}));

describe('Email Verification Module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('Edge Cases & Syntax [cite: 40, 49, 50, 51, 52, 53]', () => {
        test('1. Rejects empty string [cite: 50]', async () => {
            const res = await verifyEmail('');
            expect(res.result).toBe('invalid');
            expect(res.subresult).toBe('syntax_error');
        });
        test('2. Rejects null/undefined [cite: 51]', async () => {
            const res = await verifyEmail(null);
            expect(res.result).toBe('invalid');
        });
        test('3. Rejects missing @ [cite: 42]', async () => {
            const res = await verifyEmail('userexample.com');
            expect(res.result).toBe('invalid');
        });
        test('4. Rejects multiple @ symbols [cite: 53]', async () => {
            const res = await verifyEmail('user@@example.com');
            expect(res.result).toBe('invalid');
        });
        test('5. Rejects double dots in domain [cite: 42]', async () => {
            const res = await verifyEmail('user@example..com');
            expect(res.result).toBe('invalid');
        });
        test('6. Rejects very long emails [cite: 52]', async () => {
            const longEmail = 'a'.repeat(250) + '@example.com';
            const res = await verifyEmail(longEmail);
            expect(res.result).toBe('invalid');
            expect(res.subresult).toBe('syntax_error');
        });
    });

    describe('Did You Mean? (Typo Detection) [cite: 24, 25, 26, 27, 28, 29, 30]', () => {
        test('7. Detects gmial.com typo ', async () => {
            const res = await verifyEmail('user@gmial.com');
            expect(res.didyoumean).toBe('user@gmail.com');
            expect(res.result).toBe('invalid');
            expect(res.subresult).toBe('typo_detected');
        });
        test('8. Detects yahooo.com typo ', async () => {
            const res = await verifyEmail('test@yahooo.com');
            expect(res.didyoumean).toBe('test@yahoo.com');
        });
        test('9. Detects hotmial.com typo [cite: 29]', async () => {
            expect(getDidYouMean('user@hotmial.com')).toBe('user@hotmail.com');
        });
        test('10. Detects outlok.com typo [cite: 30]', async () => {
            expect(getDidYouMean('user@outlok.com')).toBe('user@outlook.com');
        });
    });
    describe('SMTP & Domain Logic [cite: 43, 44, 45, 46, 47, 48]', () => {
        let mockSocket;
        beforeEach(() => {
            dns.resolveMx.mockResolvedValue([{ exchange: 'mx.example.com', priority: 10 }]);
            mockSocket = {
                setTimeout: jest.fn(),
                on: jest.fn(),
                write: jest.fn(),
                destroy: jest.fn(),
                destroyed: false
            };
            net.createConnection.mockReturnValue(mockSocket);
        });
        const simulateSMTP = (responses) => {
            const onData = mockSocket.on.mock.calls.find(call => call[0] === 'data')[1];
            responses.forEach(res => onData(Buffer.from(res)));
        };

        test('11. Valid Email formats pass (Mocked 250) [cite: 41]', async () => {
            const promise = verifyEmail('user@example.com');
            await new Promise(r => setTimeout(r, 10)); 
            simulateSMTP(['220', '250', '250', '250', '221']); 
            const res = await promise;
            expect(res.result).toBe('valid');
            expect(res.resultcode).toBe(1);
            expect(res.subresult).toBe('mailbox_exists');
            expect(res.mxRecords).toContain('mx.example.com');
        });

        test('12. 550 Error -> invalid result [cite: 44, 46]', async () => {
            const promise = verifyEmail('fake@example.com');
            await new Promise(r => setTimeout(r, 10));
            simulateSMTP(['220', '250', '250', '550 User unknown', '221']); 
            
            const res = await promise;
            expect(res.result).toBe('invalid');
            expect(res.resultcode).toBe(6);
            expect(res.subresult).toBe('mailbox_does_not_exist');
        });
        test('13. 450 Error (Greylisted) -> unknown result [cite: 45, 47]', async () => {
            const promise = verifyEmail('grey@example.com');
            await new Promise(r => setTimeout(r, 10));
            simulateSMTP(['220', '250', '250', '450 Try again later']); 
            
            const res = await promise;
            expect(res.result).toBe('unknown');
            expect(res.resultcode).toBe(3);
            expect(res.subresult).toBe('greylisted');
        });
        test('14. Connection timeout -> unknown result [cite: 48]', async () => {
            const promise = verifyEmail('timeout@example.com');
            await new Promise(r => setTimeout(r, 10));
            const onTimeout = mockSocket.on.mock.calls.find(call => call[0] === 'timeout')[1];
            onTimeout();
            
            const res = await promise;
            expect(res.result).toBe('unknown');
            expect(res.subresult).toBe('timeout');
        });

        test('15. DNS lookup fails (Invalid domain)', async () => {
            dns.resolveMx.mockRejectedValue(new Error('ENOTFOUND'));
            
            const res = await verifyEmail('user@baddomain12345.com');
            expect(res.result).toBe('invalid');
            expect(res.subresult).toBe('domain_not_found');
        });
    });
});