import express from "express";
import { seedOne } from "../controllers/seeds.mjs";

const seedRouter = express.Router();

seedRouter.get("/", seedOne);

export default seedRouter;
