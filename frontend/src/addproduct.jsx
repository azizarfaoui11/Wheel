import React, { useState } from 'react';
import axios from 'axios';

const AddProduit = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [percentage, setPercentage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    productName,
    quantity: parseInt(quantity), 
    percentage: parseFloat(percentage), 
  };

  try {
    const res = await axios.post('http://localhost:5000/api/addproduit', data);
    setMessage('✅ Produit ajouté avec succès !');
    console.log(res.data);
  } catch (error) {
    console.error(error);
    setMessage('❌ Erreur lors de l’ajout du produit');
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Ajouter un produit</h2>
      {message && <p className="mb-4 text-center">{message}</p>}
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label className="block font-semibold">Nom du produit</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Quantité</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Pourcentage</label>
          <input
            type="number"
            step="0.01"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddProduit;
