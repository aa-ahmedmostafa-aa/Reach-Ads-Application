import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import statuses from 'http-status-codes'
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "reach secret", {
    expiresIn: maxAge,
  });
};

export const signup_post = async (req, res) => {
  const { email, password, fileImg,roleId } = req.body;

  try {
    const user = await User.create({ email, password, fileImg,roleId });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ token,id: user._id, roleId: user.roleId ,email:user.email });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const data = user.toAuthJSON();

    return res.status(statuses.OK).json({
      status: true,
      message: 'User logged in successfully',
      user:data
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
