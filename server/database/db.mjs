import mongoose from "mongoose";

const database = (URI) => {
  return mongoose.connect(URI);
};

export default database;
