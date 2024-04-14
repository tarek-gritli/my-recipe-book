import { validationResult, matchedData } from "express-validator";
import { UserModel } from "../models/users.js";
import { hashPassword, comparePassword } from "../utils/helpers.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const data = matchedData(req);
  try {
    const user = await UserModel.findOne({ username: data.username });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new UserModel({
      username: data.username,
      password: hashPassword(data.password),
    });
    const newSavedUser = await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      error: "Error saving user to database",
    });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const findUser = await UserModel.findOne({ username });
    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (!comparePassword(password, findUser.password)) {
      return res.status(401).json({
        message: "Username or Password is Incorrect!",
      });
    }
    const token = jwt.sign({ id: findUser._id }, process.env.JWT_KEY);
    res.status(200).json({ token, userID: findUser._id });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const returnUsername = async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await UserModel.findById(id);
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ username: findUser.username });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
