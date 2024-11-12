import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import backgroundImage from './assets/abstract-1867937_1920.jpg';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const App = () => {
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerNumber, setOwnerNumber] = useState('');
  const [altNumber, setAltNumber] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [address, setAddress] = useState('');
  const [plotNumber, setPlotNumber] = useState('');
  const [sector, setSector] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    //object created 
    const newErrors = {};
    if (!companyName) newErrors.companyName = 'Company Name is required';
    if (!ownerName) newErrors.ownerName = 'Owner/Manager Name is required';

    if (!ownerNumber) newErrors.ownerNumber = 'Owner/Manager Number is required';
    else if (!/^\d{10}$/.test(ownerNumber)) newErrors.ownerNumber = 'Invalid phone number';
    if (!gstNumber) newErrors.gstNumber = 'GST Number is required';

    else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/.test(gstNumber)) {
      newErrors.gstNumber = 'Invalid GST Number';
    }

    if (!address) newErrors.address = 'Address is required';
    if (!plotNumber) newErrors.plotNumber = 'Plot Number is required';
    if (!sector) newErrors.sector = 'Sector is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      try {
        // Prepare the data to be sent to the backend
        const userdata = {
          companyName,
          ownerName,
          ownerNumber,
          altNumber,
          companyEmail,
          gstNumber,
          address,
          plotNumber,
          sector
        };
        const response = await axios.post('http://localhost:3000/user', userdata);

        if (response.status === 200) {
          toast.success('Form submitted successfully!');

          setCompanyName('');
          setOwnerName('');
          setOwnerNumber('');
          setAltNumber('');
          setCompanyEmail('');
          setGstNumber('');
          setAddress('');
          setPlotNumber('');
          setSector('');
          setErrors({});
        } else {

          toast.error('Error submitting the form. Please try again.');
        }
      } catch (error) {
        console.error('Network error:', error);
        toast.error('Network error. Please try again later.');
      }
    }
  };


  return (
    <div className="relative min-h-screen">
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} />
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <div className="bg-white bg-opacity-90 w-full max-w-md p-10 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Company Information
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.companyName && <p className="text-red-500">{errors.companyName}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Owner/Manager Name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.ownerName && <p className="text-red-500">{errors.ownerName}</p>}
            </div>
            <div>
              <input
                type="number"
                placeholder="Owner/Manager Number"
                value={ownerNumber}
                onChange={(e) => setOwnerNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.ownerNumber && <p className="text-red-500">{errors.ownerNumber}</p>}
            </div>
            <div>
              <input
                type="number"
                placeholder="Alternative Number (optional)"
                value={altNumber}
                onChange={(e) => setAltNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Company Email (optional)"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="GST Number"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.gstNumber && <p className="text-red-500">{errors.gstNumber}</p>}
            </div>

            <div className="border border-gray-300 p-4 rounded">
              <h3 className="  mb-2">Address</h3>
              <div>
                <input
                  type="text"
                  placeholder="Plot No."
                  value={plotNumber}
                  onChange={(e) => setPlotNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                {errors.plotNumber && <p className="text-red-500">{errors.plotNumber}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Sector"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                {errors.sector && <p className="text-red-500">{errors.sector}</p>}
              </div>
              <textarea
                placeholder="Full Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
              {errors.address && <p className="text-red-500">{errors.address}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600 transition duration-300 shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;