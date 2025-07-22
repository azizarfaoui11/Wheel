import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page2() {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Regular expression to allow only numbers and validate the first digit for phone
    const validPhoneRegex = /^[5279]\d{0,7}$/;

    // Check if the value matches the pattern for phone input
    if (id === 'phone' && !validPhoneRegex.test(value) && value.length > 0) {
      return; // Do not update state if the value is invalid and not empty
    }

    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;

    // Allow empty input or only digits/slashes (No validation on date)
    if (value.length === 0 || /^[0-9/]*$/.test(value)) {
      let formattedValue = value.replace(/\D/g, '').slice(0, 8);

      // Insert slashes in the appropriate positions
      if (formattedValue.length >= 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
      }
      if (formattedValue.length >= 5) {
        formattedValue = `${formattedValue.slice(0, 5)}/${formattedValue.slice(5)}`;
      }

      setFormData((prevData) => ({ ...prevData, dateOfBirth: formattedValue }));
    } else {
      // Directly update if invalid format (allow deleting)
      setFormData((prevData) => ({ ...prevData, dateOfBirth: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Remove date validation logic
    console.log('Form data before submission:', formData); // Debugging line
  
    try {
      const response = await axios.post('https://polygame.tn/api/CreateUser', formData);
      console.log('User created:', response.data);
      localStorage.setItem('userId', response.data.id);
      toast.success('Utilisateur créé avec succès!', { closeOnClick: true });
      navigate('/page3');
    } catch (error) {
      console.error('Error submitting form', error);
      toast.error('Une erreur est survenue, veuillez réessayer.', { closeOnClick: true });
    }
  };
  

  return (
    <div
      className="text-white text-center p-6 sm:p-12 bg-center min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: 'url(/bg2.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#e1a224] text-xl mb-2" htmlFor="fullName">
              <img
                src="/nomprenom.png"
                alt="Nom & Prénom"
                className="w-[150px] sm:w-[190px] h-[40px] sm:h-[52px]"
              />
            </label>
            <input
              className="bg-[#fef0d5] shadow appearance-none border rounded-full w-full sm:w-[300px] py-2 px-4 text-[#e1a224] text-lg leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              placeholder="Votre nom et prénom"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#e1a224] text-xl mb-2" htmlFor="dateOfBirth">
              <img
                src="/date.png"
                alt="Date de Naissance"
                className="w-[180px] sm:w-[230px] h-[40px] sm:h-[50px]"
              />
            </label>
            <input
              className="bg-[#fef0d5] shadow appearance-none border rounded-full w-full sm:w-[300px] py-2 px-4 text-gray-400 text-lg leading-tight focus:outline-none focus:shadow-outline"
              id="dateOfBirth"
              type="text"
              placeholder="JJ/MM/AAAA"
              value={formData.dateOfBirth}
              onChange={handleDateChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#e1a224] text-xl mb-2" htmlFor="phone">
              <img
                src="/telephone.png"
                alt="Téléphone"
                className="w-[120px] sm:w-[150px] h-[40px] sm:h-[53px]"
              />
            </label>
            <input
              className="bg-[#fef0d5] shadow appearance-none border rounded-full w-full sm:w-[300px] py-2 px-4 text-[#e1a224] text-lg leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Votre numéro de téléphone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#e1a224] text-xl mb-2" htmlFor="email">
              <img
                src="/email.png"
                alt="E-Mail"
                className="w-[80px] sm:w-[100px] h-[35px] sm:h-[40px]"
              />
            </label>
            <input
              className="bg-[#fef0d5] shadow appearance-none border rounded-full w-full sm:w-[300px] py-2 px-4 text-[#e1a224] text-lg leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Votre adresse e-mail"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-no-repeat bg-center bg-cover py-4 px-12 rounded-full border-8 border-transparent shadow-none active:relative active:top-2 flex items-center justify-center mx-auto"
            style={{ backgroundImage: "url('/button.png')", width: '200px', height: '80px' }}
          >
            <img src="/suivant.png" className="w-[100px] h-[40px] mr-2" alt="Suivant" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page2;
