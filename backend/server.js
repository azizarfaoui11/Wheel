const express = require('express');
const app = express();
const cors=require('cors')
const db=require('./models/UserModel')
const d=require('./models/Produit')
const userRoutes=require('./routes/UserRoutes')
const prodRoutes=require('./routes/ProduitController')
// Defining a port
const PORT =5000;
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())

app.use('/api',userRoutes);
app.use('/api',prodRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  