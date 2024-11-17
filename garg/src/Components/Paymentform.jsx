
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PaymentGateway = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [amount, setamount] = useState('')

  const handlePayment = async (e) => {
    e.preventDefault();//stop default behaviour of form

    try {
      // Backend API call to create Razorpay order
      const paymentinfo = {
        name,
        email,
        phone,
        amount: parseInt(amount)
      }
      const response = await axios.post("http://localhost:7000/pay", paymentinfo);
      const { amount: apiAmount, currency } = response.data;


      // Razorpay options
      const options = {
        key: "rzp_test_sy65fbrTe9nbB9",
        amount: apiAmount,
        currency: currency,
        name: paymentinfo.name,
        description: "Payment for your order",

        handler: (response) => {
          toast.success("Payment Successful!");
          console.log("Payment Details:", response);
        },
        prefill: {
          name: paymentinfo.name,
          email: paymentinfo.email,
          contact: paymentinfo.phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F4C430",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setphone('')
      setname('')
      setemail('')
      setamount('')
    } catch (error) {
      console.log(error)
      toast.error("Payment initiation failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} />
      <form
        onSubmit={handlePayment}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-lg font-bold mb-4 text-center">
          Secure Payment Gateway
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => { setname(e.target.value) }}
            required
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={email}

            onChange={(e) => { setemail(e.target.value) }}
            required
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone:
          </label>
          <input
            type="tel"
            name="phone"
            value={phone}

            onChange={(e) => { setphone(e.target.value) }}
            required

            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Amount (₹):
          </label>
          <input
            type="number"
            name="amount"
            value={amount}

            onChange={(e) => { setamount(e.target.value) }}
            required
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentGateway;
