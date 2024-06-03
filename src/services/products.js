import Product from "../db/modals/product.js";

export const getAllProducts = () => Product.find();

export const postProduct = (payload) => Product.create(payload);

export const getProductById = (id) => Product.findById(id);

export const deleteProductById = (productId) =>
  Product.findByIdAndDelete(productId);