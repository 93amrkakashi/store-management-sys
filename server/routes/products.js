const express = require("express");
const router = express.Router();
const { 
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
  
 } = require("../controllers/ProductController");

 
// get all Products
router.get('/', getProducts);

// get one Product
router.get('/:id', getProduct);

// create a Product
router.post('/', createProduct );

// delete a Product
router.delete('/:id', deleteProduct);

// update a Product
router.patch('/:id', updateProduct);





module.exports = router