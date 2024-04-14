import { Router } from "express";
import { checkSchema } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchema.js";
import dotenv from "dotenv";
import {
  registerUser,
  loginUser,
  returnUsername,
} from "../controllers/users.js";
dotenv.config();

const router = Router();

router.post("/register", checkSchema(createUserValidationSchema), registerUser);
router.post("/login", loginUser);

router.get("/:id", returnUsername);

export default router;
