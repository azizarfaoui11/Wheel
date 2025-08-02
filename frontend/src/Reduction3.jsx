import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

function Reduction3() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Define the pack names for each image with 20% reduction
  const packsWithReduction = [
    'Pack Hiver -20%',  // Pack 1 with 20% discount
    'Pack Bronze -20%', // Pack 2 with 20% discount
    'Pack Silver -20%', // Pack 3 with 20% discount
    'Pack Gold -20%',   // Pack 4 with 20% discount
    'Pack Premium -20%' // Pack 5 with 20% discount
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

    const selectedPackName = packsWithReduction[selectedImage]; // Get the pack name with 20% reduction

    try {
      // Make a PUT request to update the user's commande with the discounted pack
      const response = await axios.put(`http://localhost:5000/api/UpdateUser/${userId}`, {
        commande: selectedPackName, // Posting the discounted pack name
      });

      if (response.status === 200) {
        console.log('Discounted pack successfully saved!');
      } else {
        console.error('Failed to save the discounted pack.');
      }
    } catch (error) {
      console.error('Error saving discounted pack to the database:', error);
    }
  };

  return (
    <div
      className="text-white text-center p-6 bg-center min-h-screen flex flex-col justify-start items-center"
      style={{ 
        backgroundImage: `url('/bg2.png')`, 
        backgroundSize: '100% 100%',    // Force the image to always match the screen size
        backgroundPosition: 'center',   // Center the image
        backgroundRepeat: 'no-repeat',  // Prevent the image from repeating
        width: '100vw',                 // Make sure the div takes full viewport width
        height: '100vh',
      }}
    >
      {/* Top image container */}
      <div className="flex justify-center items-start mt-2 space-x-2">
        <img src="/appliquez.png" className="w-[500px] h-[150px]" alt="Image 1" />
        <img src="/20.png" className="w-[200px] h-[150px]" alt="Image 2" />
      </div>

      <div className="flex justify-center space-x-2 mb-4">
        {/* Repeat this image 5 times with hover and click effects */}
        {['/pack201.png', '/pack202.png', '/pack203.png', '/pack204.png', '/pack205.png'].map((image, index) => (
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

      {/* Button with Link */}
      <Link to="/Merci">
        <button onClick={handleSubmit}
          className="bg-no-repeat bg-center bg-cover py-2 px-12 rounded-full border-8 border-transparent shadow-none active:relative active:top-1 flex items-center justify-center mx-auto"
          style={{ backgroundImage: "url('/button.png')", width: '200px', height: '80px' }}
        >
          <img src="/commandez.png" className="w-[100px] h-[40px] mr-1" alt="Order Icon" />
        </button>
      </Link>
    </div>
  );
}

export default Reduction3;
