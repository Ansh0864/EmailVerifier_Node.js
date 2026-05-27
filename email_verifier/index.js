const dns = require('dns').promises;
const net = require('net');
const { getDidYouMean } = require('./typoDetector');

function isValidSyntax(email) {
    if (!email || typeof email !== 'string') return false;
    if (email.length > 254) return false; 
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regex.test(email)) return false;
    if (email.includes('..')) return false;
    const parts = email.split('@');
    return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
}

function checkSMTP(mxRecord, email, domain) {
    return new Promise((resolve) => {
        const socket = net.createConnection(25, mxRecord);
        let step = 0;
        let result = 'unknown';
        let subresult = 'connection_error';
        let resultCode = 3; 
        
        socket.setTimeout(5000); 
        const cleanup = () => {
            if (!socket.destroyed) socket.destroy();
            resolve({ result, subresult, resultCode });
        };
        socket.on('timeout', () => {
            subresult = 'timeout';
            cleanup();
        });
        socket.on('error', () => {
            subresult = 'connection_error';
            cleanup();
        });
        socket.on('data', (data) => {
            const response = data.toString();
            const code = parseInt(response.substring(0, 3), 10);
            if (code >= 400 && code < 500) {
                result = 'unknown';
                subresult = 'greylisted';
                resultCode = 3;
                socket.write('QUIT\r\n');
                cleanup(); 
                return;
            }
            switch (step) {
                case 0: 
                    if (code === 220) { socket.write(`HELO ${domain}\r\n`); step++; } 
                    else cleanup();
                    break;
                case 1: 
                    if (code === 250) { socket.write(`MAIL FROM:<verify@${domain}>\r\n`); step++; } 
                    else cleanup();
                    break;
                case 2: 
                    if (code === 250) { socket.write(`RCPT TO:<${email}>\r\n`); step++; } 
                    else cleanup();
                    break;
                case 3: 
                    if (code === 250 || code === 251) {
                        result = 'valid';
                        subresult = 'mailbox_exists';
                        resultCode = 1;
                    } else if (code >= 500) {
                        result = 'invalid';
                        subresult = 'mailbox_does_not_exist';
                        resultCode = 6;
                    }
                    socket.write('QUIT\r\n');
                    step++;
                    break;
                case 4: 
                    cleanup();
                    break;
            }
        });
    });
}
async function verifyEmail(email) {
    const startTime = process.hrtime();
    const timestamp = new Date().toISOString();
    
    let response = {
        email,
        result: 'unknown',
        resultcode: 3,
        subresult: 'unhandled_error',
        domain: null,
        mxRecords: [],
        executiontime: 0,
        error: null,
        timestamp
    };
    const getExecutionTime = () => {
        const diff = process.hrtime(startTime);
        return parseFloat((diff[0] + diff[1] / 1e9).toFixed(2));
    };

    try {
        if (!email || typeof email !== 'string') {
            response.result = 'invalid';
            response.resultcode = 6;
            response.subresult = 'syntax_error';
            response.executiontime = getExecutionTime();
            return response;
        }
        const typo = getDidYouMean(email);
        if (typo) {
            response.didyoumean = typo;
            response.result = 'invalid';
            response.resultcode = 6;
            response.subresult = 'typo_detected';
            response.domain = email.split('@')[1];
            response.executiontime = getExecutionTime();
            return response;
        }
        if (!isValidSyntax(email)) {
            response.result = 'invalid';
            response.resultcode = 6;
            response.subresult = 'syntax_error';
            response.executiontime = getExecutionTime();
            return response;
        }
        const domain = email.split('@')[1];
        response.domain = domain;
        let records;
        try {
            records = await dns.resolveMx(domain);
        } catch (err) {
            response.result = 'invalid';
            response.resultcode = 6;
            response.subresult = 'domain_not_found';
            response.error = "DNS MX lookup failed.";
            response.executiontime = getExecutionTime();
            return response;
        }

        if (!records || records.length === 0) {
            response.result = 'invalid';
            response.resultcode = 6;
            response.subresult = 'no_mx_records';
            response.executiontime = getExecutionTime();
            return response;
        }
        records.sort((a, b) => a.priority - b.priority);
        response.mxRecords = records.map(r => r.exchange);      
        const primaryMx = response.mxRecords[0];
        const smtpResult = await checkSMTP(primaryMx, email, domain);       
        response.result = smtpResult.result;
        response.resultcode = smtpResult.resultCode;
        response.subresult = smtpResult.subresult;
        
    } catch (error) {
        response.result = 'unknown';
        response.resultcode = 3;
        response.subresult = 'exception_thrown';
        response.error = error.message;
    }

    response.executiontime = getExecutionTime();
    return response;
}

module.exports = { verifyEmail, getDidYouMean };