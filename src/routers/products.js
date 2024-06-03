import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { Router } from "express";
import {
  getAllProductsController,
  postProductsController,
  getProductByIdController,
  deleteProductByIdController,
} from "../controllers/products.js";

const productsRouter = Router();

productsRouter.get("/", ctrlWrapper(getAllProductsController));

productsRouter.post("/", ctrlWrapper(postProductsController));

productsRouter.get("/:productId", ctrlWrapper(getProductByIdController));

productsRouter.delete("/:productId", ctrlWrapper(deleteProductByIdController));

export default productsRouter;