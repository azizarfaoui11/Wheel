const express = require('express');
const router = express.Router();
const ProdController = require('../controllers/ProduitController'); 
//const  upload  = require('../middlewares/uploads'); // Avec les {}



router.get('/getALLProd', ProdController.getAllProducts);
router.put('/spin/:id', ProdController.spinWheel);
router.post('/addproduit',ProdController.createProduit);
router.delete('/deleteproduit/:id', ProdController.deleteProduit); 



module.exports = router;
