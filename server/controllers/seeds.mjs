import { data } from "../data.mjs";
import Product from "../models/products.mjs";
import User from "../models/users.mjs";

export const seedOne = async (req, res) => {
  await Product.deleteMany();
  const createProducts = await Product.insertMany(data.products);
  await User.deleteMany();
  const createUsers = await User.insertMany(data.users);
  res.status(201).json({ createProducts, createUsers });
};
