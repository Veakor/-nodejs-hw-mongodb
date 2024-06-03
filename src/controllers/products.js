import createHttpError from "http-errors";
import {
  getAllProducts,
  postProduct,
  getProductById,
  deleteProductById,
} from "../services/products.js";
export const getAllProductsController = async (req, res, next) => {
  const products = await getAllProducts();
  res.json(products);
};

export const postProductsController = async (req, res, next) => {
  const { body } = req;
  const product = await postProduct(body);

  res.status(201).json(product);
};

export const getProductByIdController = async (req, res, next) => {
  const { productId } = req.params;
  const product = await getProductById(productId);

  if (!product) {
    next(createHttpError(404, "Product not found"));
    return;
  }

  res.json(product);
};

export const deleteProductByIdController = async (req, res, next) => {
  const { productId } = req.params;
  const product = await deleteProductById(productId);

  if (!product) {
    next(createHttpError(404, "Product not found"));
    return;
  }

  res.json(product);
};