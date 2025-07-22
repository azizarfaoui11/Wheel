// controllers/UserController.js
const Users = require('../models/UserModel'); // Adjust the path as necessary

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { phone } = req.body;

    // Check if the phone number already exists
    const existingUser = await Users.findOne({ where: { phone: phone } });

    if (existingUser) {
      return res.status(400).json({ error: 'Phone number already exists' });
    }

    // If the phone number is not found, create the new user
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the URL
  const { city, profession, commande } = req.body; // Include commande in the data to update

  try {
    // Find the user by ID
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's fields, including commande
    await user.update({ city, profession, commande });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateRewards = async (req, res) => {
  const { userId, productName } = req.body;

  try {
    // Fetch the user from the database using the provided userId
    const user = await Users.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the current rewards as a string (if null, initialize as empty)
    let currentRewards = user.rewards || '';

    // If there are already rewards, append the new product name with a separator
    if (currentRewards) {
      currentRewards += `, ${productName}`; // Appends the new reward with a comma and space
    } else {
      currentRewards = productName; // If no previous rewards, simply set it to the product name
    }

    // Update the user's rewards field as a simple string
    user.rewards = currentRewards;

    // Save the updated user instance
    await user.save();

    return res.status(200).json({ message: 'Rewards updated successfully', rewards: currentRewards });
  } catch (error) {
    console.error('Error updating user rewards:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};





