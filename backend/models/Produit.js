const { DataTypes } = require('sequelize');
const sequelize = require('../db/index'); // Adjust the path as necessary

const Produit = sequelize.define('Produit', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  percentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
  
}, {
  tableName: 'produits', // Use 'produits' for the table name
  timestamps: false, // Set to true if you want createdAt and updatedAt fields
});

module.exports = Produit;
