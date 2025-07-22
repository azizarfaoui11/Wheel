import React from 'react';
import { Link } from 'react-router-dom';

function Result1() {
  return (
    <div
      className="text-white text-center p-6 bg-center min-h-screen flex flex-col justify-center items-center" // Halved padding
      style={{ 
        backgroundImage: `url('/bg3.png')`, 
        backgroundSize: '100% 100%',    // Force the image to always match the screen size
        backgroundPosition: 'center',   // Center the image
        backgroundRepeat: 'no-repeat',  // Prevent the image from repeating
        width: '100vw',                 // Make sure the div takes full viewport width
        height: '100vh',
      }}
    >
      {/* Centered smaller image */}
      <img src="/desole2.png" alt="Result" className="mb-4 w-[350px] h-[400px]" /> {/* Halved width and height */}

      <Link to="/Profitez">
        <button
          className="bg-no-repeat bg-center bg-cover py-1 px-6 rounded-full border-8 border-transparent shadow-none active:relative active:top-1 flex items-center justify-center"
          style={{ backgroundImage: "url('/button.png')", width: '200px', height: '80px' }} // Halved width and height
        >
          <img src="/suivant.png" className="w-[100px] h-[50px] mr-1" alt="Play Icon" /> {/* Halved width and height */}
        </button>
      </Link>
    </div>
  );
}

export default Result1;
