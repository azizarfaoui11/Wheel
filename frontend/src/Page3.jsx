import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';

function Page3() {
  const [formData, setFormData] = useState({
    city: '',
    profession: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.city.trim() || !formData.profession.trim()) {
      toast.error('Veuillez remplir tous les champs.', { closeOnClick: true });
      return; // Prevent submission
    }

    const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
    const dataToSend = { ...formData }; // Include only the data to update

    try {
      // Update user information
      await axios.put(`
       https://polygame.tn/api/UpdateUser/${userId}`, dataToSend);
      toast.success('Information soumise avec succès!', { closeOnClick: true });
      
      // Navigate to the Spin page
      navigate('/Spin'); // Use navigate for redirection
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
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
            <label className="block text-[#e1a224] text-xl mb-2" htmlFor="city">
              <img
                src="/ville.png"
                alt="Ville"
                className="w-[100px] h-[43px]" // Updated size
              />
            </label>
            <input
              id="city"
              type="text"
              placeholder="Votre ville"
              onChange={handleChange}
              className="bg-[#fef0d5] shadow appearance-none border rounded-full w-full sm:w-[250px] py-2 px-4 text-[#e1a224] text-xl leading-tight focus:outline-none focus:shadow-outline" // Adjusted width and padding
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#e1a224] text-xl mb-2" htmlFor="profession">
              <img
                src="/profession.png"
                alt="Profession"
                className="w-[160px] h-[50px]" // Updated size
              />
            </label>
            <input
              id="profession"
              type="text"
              placeholder="Votre profession"
              onChange={handleChange}
              className="bg-[#fef0d5] shadow appearance-none border rounded-full w-full sm:w-[250px] py-2 px-4 text-[#e1a224] text-xl leading-tight focus:outline-none focus:shadow-outline" // Adjusted width and padding
            />
          </div>

          {/* Wrapping the button in a flex container */}
          <div className="flex justify-center sm:justify-end">
            <button
              onClick={handleSubmit}
              className="bg-no-repeat bg-center bg-cover py-4 px-12 rounded-full border-8 border-transparent shadow-none active:relative active:top-2 flex items-center justify-center mx-auto"
              style={{ backgroundImage: "url('/button.png')", width: '200px', height: '80px' }} // Keep button size as it is
            >
              <img src="/suivant.png" className="w-[100px] h-[40px] mr-2" alt="Play Icon" /> {/* Keep icon size as it is */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page3;
