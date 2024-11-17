import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registerform from './Components/Registerform';
import PaymentGateway from './Components/Paymentform';
import Loginform from './Components/Loginform';

export const App = () => {
  //razorpay api reload 
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);



  return (

    <div>
      <Router>
        <Routes>

          <Route path="/register" element={<Registerform />} />
        </Routes>
        <PaymentGateway />
        <Loginform />
      </Router>



    </div>
  )
}

export default App