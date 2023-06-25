import expressAsyncHandler from "express-async-handler";
import User from "../models/users.mjs";
import { generateWebToken } from "../utils/auth.mjs";
import bcrypt from "bcryptjs";
import { comparePassword } from "../bcrypt/bcrypt.mjs";

// export const userSignin = async (req, res) => {
//   const { email, password } = req.body;
//   const user = User.findOne({ email });

//   console.log(user);

//   const verifypassword = await comparePassword(password, user.password);
//   if (verifypassword) {
//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateWebToken(user._id),
//     });
//   }
//   res.status(401).json({ error: "Invalid email or password" });
// };

export const userSignup = expressAsyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = new User({
    name,
    email,
    password: bcrypt.hashSync(password),
  });

  await user.save();
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateWebToken(user._id),
  });
});

export const userSignin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateWebToken(user._id),
      });
      return;
    }
  }
  res.status(401).json({ error: "Invalid email or password" });
});
