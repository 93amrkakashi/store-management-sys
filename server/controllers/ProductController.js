const Products = require("../models/productModel");
const mongoose = require("mongoose");
const { formatISO } = require('date-fns');
// get all Products
const getProducts = async (req, res) => {
  const Productss = await Products.find({}).sort({ createdAt: -1 });
  res.status(200).json(Productss);
};

// get one Product
const getProduct = async (req, res) => {
  const { id } = req.params;
  const Product = await Products.findById(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "this Product does not exist" });
  }
  if (!Product) {
    return res.status(400).json({ error: "this Product does not exist" });
  }
  res.status(200).json(Product);
};

// create a Product
const createProduct = async (req, res) => {
  const { name, description, initQty, currQty, out, outDate, createdAt, creator, modifier } =
    req.body;
  // const outDate = formatISO(Date.now(), { representation: 'complete' });
  try {
    const Product = await Products.create({
      name,
      description,
      initQty,
      currQty: initQty,
      in:0,
      out: 0,
      inDate: formatISO(Date.now(), { representation: "complete" }),
      outDate: formatISO(Date.now(), { representation: "complete" }),
      creator,
      modifier,

    });
    res.status(200).json(Product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "this blog does not exist" });
  }
  const Product = await Products.findOneAndDelete({ _id: id });

  if (!Product) {
    return res.status(400).json({ error: "this Product does not exist" });
  }
  res.status(200).json(Product);
};

// update a Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid({ id })) {
    return res.status(400).json({ error: "this Product does not exist" });
  }
  console.log(id);

  const Product = await Products.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!Product) {
    return res.status(400).json({ error: "this Product does not exist" });
  }
  res.status(200).json(Product);
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
