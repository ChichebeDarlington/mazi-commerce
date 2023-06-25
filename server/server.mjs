import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.mjs";
import database from "./database/db.mjs";
import seedsRouter from "./routes/seeds.mjs";
import userRouter from "./routes/user.mjs";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({}));

app.use("/api/products", productsRouter);
app.use("/api/seeds", seedsRouter);
app.use("/api/users", userRouter);

app.use((error, req, res, next) => {
  res.status(500).json({ msg: error.message });
});

const port = process.env.PORT || 7000;

const startConnection = async () => {
  await database(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`DB CONNECTED, Server running at port ${port}`);
  });
};

startConnection();
