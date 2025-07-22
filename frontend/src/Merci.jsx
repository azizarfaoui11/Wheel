import React from 'react';
import { Link } from 'react-router-dom';

function Merci() {
  return (
    <div
      className="text-white text-center p-12 bg-center min-h-screen flex flex-col justify-center items-center" // Halved padding
      style={{ 
        backgroundImage: `url('/mercibg.png')`, 
        backgroundSize: '100% 100%',    // Force the image to always match the screen size
        backgroundPosition: 'center',   // Center the image
        backgroundRepeat: 'no-repeat',  // Prevent the image from repeating
        width: '100vw',                 // Make sure the div takes full viewport width
        height: '100vh',
      }}
    >
      <Link to="/">
        <button
          className="mt-[400px] bg-no-repeat bg-center bg-cover py-2 px-12 rounded-full border-8 border-transparent shadow-none active:relative active:top-2 flex items-center justify-center" // Halved padding
          style={{ backgroundImage: "url('/btnmerci.png')", width: '150px', height: '150px' }} // Halved width and height
        >
          <img src="/btnfin.png" className="w-[500px] h-[50px]" /> {/* Halved width and height */}
        </button>
      </Link>
    </div>
  );
}

export default Merci;
