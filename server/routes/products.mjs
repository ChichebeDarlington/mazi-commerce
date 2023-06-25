import express from "express";

const router = express.Router();

import {
  productId,
  singleProduct,
  products,
} from "../controllers/products.mjs";

router.get("/", products);
router.get("/:slug", singleProduct);
router.get("/product/:_id", productId);

export default router;
