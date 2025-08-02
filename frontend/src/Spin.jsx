import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Spin.css';
import { FaXbox, FaMotorcycle } from 'react-icons/fa';
import { SiPlaystation } from 'react-icons/si';
import { GiScooter } from 'react-icons/gi';

const getIconForProduct = (name) => {
  const iconSize = 50;
  switch (name.toLowerCase().trim()) {
    case 'manette x box':
      return <FaXbox size={iconSize} />;
    case 'console play 5':
      return <SiPlaystation size={iconSize} />;
    case 'moto':
      return <FaMotorcycle size={iconSize} />;
    case 'trottinette':
      return <GiScooter size={iconSize} />;
    case 'rien gagne':
      return <span style={{ fontSize: iconSize }}>😞</span>;
    case 'offre speciale':
      return <span style={{ fontSize: iconSize }}>🔖</span>;
    default:
      return <span>🎁</span>;
  }
};

const generateCards = (products) => {
  const num = 6;
  const cards = [];
  const colorGradients = [
    'bg-gradient-to-r from-yellow-500 via-yellow-800 to-yellow-900',
    'bg-gradient-to-r from-red-500 via-red-800 to-red-900',
    'bg-gradient-to-r from-blue-500 via-blue-800 to-blue-900',
    'bg-gradient-to-r from-green-500 via-green-800 to-green-900',
    'bg-gradient-to-r from-purple-500 via-purple-800 to-purple-900',
    'bg-gradient-to-r from-pink-500 via-pink-800 to-pink-900',
  ];

  products.slice(0, num).forEach((product, index) => {
    cards.push({
      id: product.id,
      content: (
        <div className="flex flex-col items-center text-white text-sm text-center mr-12">
          {getIconForProduct(product.productName)}
          <span className="mt-1 px-1">{product.productName}</span>
        </div>
      ),
      backgroundColor: colorGradients[index % colorGradients.length],
    });
  });

  return cards;
};

const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [cards, setCards] = useState([]);
  const [products, setProducts] = useState([]);
  const wheelRef = useRef(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getALLProd');
      setProducts(response.data);
      setCards(generateCards(response.data));
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
const currentProducts = [...products]; // copie de la version affichée


    try {
      const { data } = await axios.put('http://localhost:5000/api/spin/:id');
      const { prize, allProducts } = data;

      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      const prizeIndex = currentProducts.findIndex(p => p.id === prize.id);
      if (prizeIndex === -1) {
        console.error('Produit non trouvé dans la roue');
        return;
      }

const rotationAngles = {
        2: 30,   // Stop at different angles based on prize index
        1: 75,
        6: 150,
        5: 210,
        4: 270,
        3: 320,
      };

     // const anglePerSlice = 360 / currentProducts.length;
     // const prizeAngle = 360 - (prizeIndex * anglePerSlice);
     // const finalAngle = + prizeAngle;
      const finalAngle = (5 * 360)  + rotationAngles[prize.id];


      wheelRef.current.animate(
        [
          { transform: `rotate(0deg)` },
          { transform: `rotate(${finalAngle}deg)` }
        ],
        {
          duration: 4000,
          easing: 'cubic-bezier(0.440, -0.205, 0.000, 1.130)',
          fill: 'forwards',
        }
      );

      setTimeout(async () => {
        try {
          await axios.post('http://localhost:5000/api/updateRewards', {
            userId,
            productName: prize.productName
          });
        } catch (error) {
          console.error('Error posting reward:', error);
        }

        const productName = prize.productName.toLowerCase().trim();
        if (["moto", "console play 5", "manette x box", "trottinette"].includes(productName)) {
          navigate('/Result2');
        } else if (productName === 'rien gagne') {
          navigate('/Result1');
        } else if (productName === 'offre speciale') {
          navigate('/Result3');
        }

        setIsSpinning(false);
        setProducts(allProducts);
      }, 7000);

    } catch (error) {
      console.error('Error during spin:', error);
      setIsSpinning(false);
    }
  };

  return (
    <div className={isSpinning ? 'pointer-events-none' : ''} style={{ backgroundImage: 'url(/bg2.png)', backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100vw', height: '100vh' }}>
      <div className="flex flex-col items-center h-screen">
        <div className="relative w-full h-[90%] flex justify-center items-center overflow-hidden">
          <fieldset className="ui-wheel-of-fortune">
            <div className="arrow"></div>
            <div className="gold-circle"></div>
            <ul ref={wheelRef}>
              {cards.map((card, index) => (
                <li key={index} className={`${card.backgroundColor} p-2 rounded-lg`}>
                  {card.content}
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
        <button
  type="button"
  onClick={spinWheel}
  disabled={isSpinning}
  className="m-[-20px] bg-no-repeat bg-center bg-cover py-2 px-12 rounded-full border-8 border-transparent shadow-none active:relative active:top-2 flex items-center justify-center mx-auto"
  style={{ backgroundImage: "url('/button.png')", width: '200px', height: '60px' }}
>
  <img src="/tournez.png" className="w-[100px] h-[40px] mr-2" alt="Play Icon" />
</button>

      </div>
    </div>
  );
};

export default Wheel;
