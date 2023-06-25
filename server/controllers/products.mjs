import { data } from "../data.mjs";
import Products from "../models/products.mjs";

export const products = async (req, res) => {
  const products = await Products.find();
  res.status(200).json(products);
};

export const singleProduct = async (req, res) => {
  const { slug } = req.params;
  const product = await Products.findOne({ slug: slug });
  if (product) {
    return res.status(200).json(product);
  }
  return res.status(400).json({ error: "No product found" });
};

export const productId = async (req, res) => {
  const { _id } = req.params;
  const product = await Products.findById(_id);
  if (product) {
    return res.status(200).json(product);
  }
  return res.status(400).json({ error: "No product found" });
};

// export const products = async (req, res) => {
//   res.json(data.products);
// };

// export const singleProduct = async (req, res) => {
//   const { slug } = req.params;
//   const product = data.products.find((p) => p.slug === slug);
//   if (product) {
//     return res.status(200).json(product);
//   }
//   return res.status(400).json({ error: "No product found" });
// };

// export const productId = async (req, res) => {
//   const { _id } = req.params;
//   const product = data.products.find((p) => p._id === _id);
//   if (product) {
//     return res.status(200).json(product);
//   }
//   return res.status(400).json({ error: "No product found" });
// };
