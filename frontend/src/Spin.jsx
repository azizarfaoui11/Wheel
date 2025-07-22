import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Spin.css';

// Function to generate cards for the spin wheel
const generateCards = (products, noCodeImage) => {
  const num = 8; // Total slots on the wheel
  const cards = [];
  const colorGradients = [
    'bg-gradient-to-r from-yellow-500 via-yellow-800 to-yellow-900', // Gold
    'bg-gradient-to-r from-red-500 via-red-800 to-red-900', // Red
    'bg-gradient-to-r from-blue-500 via-blue-800 to-blue-900', // Blue
    'bg-black' // No Code
  ];

  products.forEach(product => {
    // Only include products with quantity > 0
   
      //const count = Math.max(Math.floor(product.percentage * num / 100), 1);
      for (let i = 0; i < 1; i++) {
        cards.push({
          id: product.id,
          content: <img src={product.img} alt={product.productName} className=" object-contain w-[120px] m-[10px] " />,
          backgroundColor: colorGradients[0], // Apply a color gradient (adjust if needed)
        });
      }
    
  });

  // Ensure "Désolé à la prochaine fois" (No Code) appears only once
  /*if (cards.length < num) {
    cards.push({
      id: null,
      content: <img src={noCodeImage} alt="No Code" className="w-16 h-16 object-cover rounded-full" />,
      backgroundColor: 'bg-black',
    });
  }*/

  // Shuffle the cards
  /*while (cards.length < num) {
    const j = Math.floor(Math.random() * (cards.length + 1));
    [cards[j], cards[cards.length - 1]] = [cards[cards.length - 1], cards[j]];
  }*/

  return cards.slice(0, num); // Ensure only 'num' slots on the wheel
};

const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [previousEndDegree, setPreviousEndDegree] = useState(0);
  const [cards, setCards] = useState([]);
  const [products, setProducts] = useState([]);
  const noCodeImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToHLCbHYQLlIyCP0DgmSQR5KEDoSS9uA15Lw&s";
  const wheelRef = useRef(null);
  const navigate = useNavigate();

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://polygame.tn/api/getALLProd');
      const data = response.data;
      const availableProducts = data;
      setProducts(availableProducts);
      setCards(generateCards(availableProducts, noCodeImage));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const spinWheel = async () => {
    if (isSpinning) return;
  
    setIsSpinning(true);
  
    try {
      // Call backend to spin and get the result
      const { data } = await axios.put('https://polygame.tn/api/spin/:id'); // Replace :id with the correct parameter if needed
      const { prize, allProducts } = data;
  
      console.log('Prize:', prize);
      console.log('All Products:', allProducts);
  
      // Get the userId from local storage
      const userId = localStorage.getItem('userId');
  
      // Check if userId is available
      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }
  
      // Define a mapping for the prize index to the corresponding rotation angle
      const rotationAngles = {
        2: 0,   // Stop at different angles based on prize index
        1: 45,
        0: 90,
        7: 135,
        6: 180,
        5: 225,
        4: 270,
        3: 265,
      };
  
      const prizeAngle = rotationAngles[prize.id] || 0;
      const fullRotations = 5 * 360;
      const finalAngle = fullRotations + prizeAngle;
  
      wheelRef.current.animate(
        [
          { transform: `rotate(${0}deg)` },
          { transform: `rotate(${prizeAngle + fullRotations}deg)` }
        ],
        {
          duration: 4000,
          easing: 'cubic-bezier(0.440, -0.205, 0.000, 1.130)', // Smooth easing
          fill: 'forwards',
        }
      );
  
      setPreviousEndDegree(previousEndDegree + finalAngle);
  
      setTimeout(async () => {
        try {
          // Only update rewards if prize ID is not 0 or 5
          if (prize.id !== 0 && prize.id !== 5) {
            // Update rewards in the backend when a prize is won
            await axios.post('https://polygame.tn/api/updateRewards', {
              userId,
              productName: prize.productName, // Send the won product's name
            });
  
            console.log('Reward posted to DB');
          } else {
            console.log('No reward stored for this prize.');
          }
        } catch (error) {
          console.error('Error posting reward:', error);
        }
  
        // Handle navigation based on prize product name with else if conditions
        if (prize.id === 1 || prize.id === 7 || prize.id === 4) {
          navigate('/Result2');
        } else if (prize.id === 2) {
          navigate('/Reduction2');
        } else if (prize.id === 3) {
          navigate('/Reduction1');
        } else if (prize.id === 6) {
          navigate('/Reduction3');
        } else if (prize.id === 0 || prize.id === 5) {
          navigate('/Result1');
        }
  
        setIsSpinning(false);
        setProducts(allProducts); // Refresh product list
      }, 7000);
    } catch (error) {
      console.error('Error during spin:', error);
      setIsSpinning(false);
    }
  };
  
  
  
  

  return (
    <div 
      className={`${isSpinning ? 'pointer-events-none' : ''}`} 
      style={{ backgroundImage: 'url(/bg2.png)', backgroundSize: '100% 100%',    // Force the image to always match the screen size
        backgroundPosition: 'center',   // Center the image
        backgroundRepeat: 'no-repeat',  // Prevent the image from repeating
        width: '100vw',                 // Make sure the div takes full viewport width
        height: '100vh', }}
    >
      <div className="flex flex-col items-center h-screen">
        <div className="relative w-full h-[90%] flex justify-center items-center overflow-hidden">
          <fieldset className="ui-wheel-of-fortune">
            <div className="arrow"></div>
            <div className="gold-circle"></div>
            <ul ref={wheelRef}>
              {cards.map((card, index) => (
                <li key={index} className={card.backgroundColor === 'bg-black' ? 'no-code' : ''}>
                  {card.content}
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
        <button type="button" onClick={spinWheel} disabled={isSpinning} className={`spin-button ${isSpinning ? 'disabled' : ''}`}>
        <button
            className="m-[-20px] bg-no-repeat bg-center bg-cover py-2 px-12 rounded-full border-8 border-transparent shadow-none active:relative active:top-2 flex items-center justify-center mx-auto"
            style={{ backgroundImage: "url('/button.png')", width: '200px', height: '60px' }}
          >
            <img src="/tournez.png" className="w-[100px] h-[40px] mr-2" alt="Play Icon" />
          </button>
        </button>
      </div>
    </div>
  );
};

export default Wheel;