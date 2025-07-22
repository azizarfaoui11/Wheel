import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

function Profitez() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Define the pack names corresponding to each image
  const packs = [
    'Pack Hiver',
    'Pack Bronze',
    'Pack Silver',
    'Pack Gold',
    'Pack Premium'
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  // Submit the selected pack to the server
  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId'); // Assuming the user ID is stored in local storage
    if (!userId || selectedImage === null) {
      return;
    }

    const selectedPackName = packs[selectedImage]; // Get the selected pack name

    try {
      // Make a PUT request to update the user's commande
      const response = await axios.put(`https://polygame.tn/api/UpdateUser/${userId}`, {
        commande: selectedPackName, // Posting the selected pack name
      });

      if (response.status === 200) {
        console.log('Pack successfully saved!');
      } else {
        console.error('Failed to save the pack.');
      }
    } catch (error) {
      console.error('Error saving pack to the database:', error);
    }
  };

  return (
    <div
      className="text-white text-center p-6 bg-center min-h-screen flex flex-col justify-center items-center"
      style={{ 
        backgroundImage: `url('/bg3.png')`, 
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div>
        <img src="/profitez.png" alt="" className="w-[500px] h-[100px] mb-[60px]" />
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        {['/pack1.png', '/pack2.png', '/2pack.png', '/2pack2.png', '/pack5.png'].map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={`w-[230px] h-[280px] transform transition-all duration-300 hover:scale-110 cursor-pointer ${
              selectedImage === index ? 'border-4 border-red-500 scale-110' : ''
            }`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      <Link to="/Merci">
        <button onClick={handleSubmit}
          className="bg-no-repeat bg-center bg-cover py-2 px-6 rounded-full border-8 border-transparent shadow-none active:relative active:top-2 flex items-center justify-center"
          style={{ backgroundImage: "url('/button.png')", width: '200px', height: '80px' }}
        >
          <img src="/commandez.png" className="w-[100px] h-[40px] mr-1" alt="Play Icon" />
        </button>
      </Link>
    </div>
  );
}

export default Profitez;
