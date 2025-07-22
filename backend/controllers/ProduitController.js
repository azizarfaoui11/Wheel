const Produit = require('../models/Produit');

// Get all products (for displaying available gifts)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Produit.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ error: error.message });
  }
};





// Spin wheel logic
exports.spinWheel = async (req, res) => {
  try {
    // Fetch all products
    const allProducts = await Produit.findAll();

    // Filter products that have quantity greater than 0 for selection purposes
    const availableProducts = allProducts.filter(product => product.quantity > 0);

    if (availableProducts.length === 0) {
      return res.status(400).json({ error: 'No prizes available' });
    }

    // Calculate total weight based on product percentage
    const totalWeight = availableProducts.reduce((sum, product) => sum + product.percentage, 0);

    // Generate random number to select a product based on its weight
    let random = Math.random() * totalWeight;
    let selectedProduct;

    for (const product of availableProducts) {
      if (random < product.percentage) {
        selectedProduct = product;
        break;
      }
      random -= product.percentage;
    }

    if (!selectedProduct) {
      return res.status(500).json({ error: 'Failed to determine prize' });
    }

    // Decrement the selected product's quantity
    selectedProduct.quantity -= 1;

    // Update the selected product's quantity in the database
    await Produit.update({ quantity: selectedProduct.quantity }, { where: { id: selectedProduct.id } });

    // Return the selected prize and all products (including quantity 0) for display purposes
    res.status(200).json({ prize: selectedProduct, allProducts: allProducts });  // Include allProducts for UI display
  } catch (error) {
    console.error("Error during spin:", error);
    res.status(500).json({ error: error.message });
  }
};










