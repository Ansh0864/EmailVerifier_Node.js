import { useState } from "react";
import styles from "./PricingPage.module.css";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const plans = [
    { 
      name: "Starter", 
      monthlyPrice: 0, 
      annualPrice: 0, 
      limit: "100 Verifications/mo", 
      button: "Get Started" 
    },
    { 
      name: "Pro", 
      monthlyPrice: 29, 
      annualPrice: 24, // $290/yr is ~$24/mo
      limit: "10,000 Verifications/mo", 
      button: "Start Pro Trial", 
      popular: true 
    },
    { 
      name: "Enterprise", 
      monthlyPrice: 99, 
      annualPrice: 79, // $948/yr is ~$79/mo
      limit: "Unlimited Verifications", 
      button: "Contact Sales" 
    }
  ];

  const faqs = [
    { q: "What counts as a verification?", a: "Every unique email address you process through our system counts as one verification. If you verify the same email twice in one billing cycle, it only counts once." },
    { q: "Can I cancel my subscription at any time?", a: "Yes, you can downgrade or cancel your subscription at any time from your billing dashboard. No questions asked." },
    { q: "Do unused verifications roll over?", a: "On the Pro plan, unused verifications do not roll over to the next month. They reset on your billing date." }
  ];

  const handlePlanClick = (planName) => {
    alert(`Redirecting to checkout for the ${planName} plan (${isAnnual ? 'Annual' : 'Monthly'} billing)!`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Simple, Transparent Pricing</h1>
        <p className={styles.subtitle}>Pay only for what you need. Cancel anytime.</p>
        
        {/* Billing Toggle */}
        <div className={styles.toggleWrapper}>
          <span className={!isAnnual ? styles.activeLabel : styles.inactiveLabel}>Monthly</span>
          <button 
            className={`${styles.toggleBtn} ${isAnnual ? styles.toggleAnnual : ''}`}
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <div className={styles.toggleCircle}></div>
          </button>
          <span className={isAnnual ? styles.activeLabel : styles.inactiveLabel}>
            Annually <span className={styles.discountBadge}>Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className={styles.grid}>
        {plans.map((plan, i) => {
          const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          
          return (
            <div key={i} className={`${styles.card} ${plan.popular ? styles.popularCard : ''}`}>
              {plan.popular && <span className={styles.popularBadge}>MOST POPULAR</span>}
              <h3 className={styles.planName}>{plan.name}</h3>
              
              <div className={styles.priceContainer}>
                {currentPrice === 0 ? (
                  <span className={styles.price}>Free</span>
                ) : (
                  <>
                    <span className={styles.price}>${currentPrice}</span>
                    <span className={styles.billingCycle}>/mo</span>
                  </>
                )}
              </div>
              
              {isAnnual && currentPrice > 0 && (
                <p className={styles.annualNote}>Billed ${currentPrice * 12} yearly</p>
              )}
              {!isAnnual && currentPrice > 0 && (
                <p className={styles.annualNote}>Billed monthly</p>
              )}
              {currentPrice === 0 && <p className={styles.annualNote}>Free forever</p>}

              <p className={styles.limit}>{plan.limit}</p>
              <button 
                className={plan.popular ? styles.primaryBtn : styles.secondaryBtn}
                onClick={() => handlePlanClick(plan.name)}
              >
                {plan.button}
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive FAQ Section */}
      <div className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div key={i} className={styles.faqItem} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
              <div className={styles.faqQuestion}>
                {faq.q}
                <span className={styles.faqChevron}>{activeFaq === i ? '−' : '+'}</span>
              </div>
              {activeFaq === i && <div className={styles.faqAnswer}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}