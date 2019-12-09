import { useState, useEffect } from 'react';

const useRzrPay = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);

    document.body.appendChild(script);
  }, []);

  return options => {
    if (scriptLoaded) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };
};

export default useRzrPay;
