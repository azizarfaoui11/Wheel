import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div
      className="text-white text-center p-12 bg-center min-h-screen flex flex-col justify-center items-center" // Halved padding
      style={{ 
        backgroundImage: `url('/bgBlue.png')`, 
        backgroundSize: '100% 100%',    // Force the image to always match the screen size
        backgroundPosition: 'center',   // Center the image
        backgroundRepeat: 'no-repeat',  // Prevent the image from repeating
        width: '100vw',                 // Make sure the div takes full viewport width
        height: '100vh',                // Full viewport height
      }}
    >
      <div className="mb-8"> {/* Halved margin-bottom */}
        <img src="/logo.png" alt="Poly Game Logo" className="w-[590px] h-auto" /> {/* Halved width */}
      </div>
      <div className="flex justify-center items-center">
        <Link to="/Page2">
          <button
            className="bg-no-repeat bg-center bg-cover py-2 px-12 rounded-full border-8 border-transparent shadow-none active:relative active:top-2 flex items-center justify-center" // Halved padding
            style={{ backgroundImage: "url('/button.png')", width: '200px', height: '80px' }} // Halved width and height
          >
            <img src="/play.png" className="w-[100px] h-[40px] mr-2" alt="Play Icon" /> {/* Halved width and height */}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
