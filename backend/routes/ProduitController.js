const express = require('express');
const router = express.Router();
const ProdController = require('../controllers/ProduitController'); 

router.get('/getALLProd', ProdController.getAllProducts);
router.put('/spin/:id', ProdController.spinWheel);

module.exports = router;
