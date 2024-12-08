import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../../database/models/User";

import { ERROR_MESSAGES } from "../../constants/enum";
import { UserError } from "../../middlewares/errorHandler";

/**
 * Generates a JSON Web Token (JWT) for a given email.
 * @param email The email address of the user to be included in the token payload.
 * @returns A promise that resolves to the generated JWT as a string.
 */
export const generateToken = async (email: string) => {
  const token = jwt.sign({ email }, process.env.SECRET || "", { expiresIn: "1d" });
  return token;
};

/**
 * Creates a new user in the system with the provided email, name, and password.
 * @param email The email address of the user.
 * @param name The name of the user.
 * @param password The password of the user.
 * @returns - { newUser, token} : { The newly created user document ,  A JWT (JSON Web Token) for the user }.
 */
export const createUser = async (email: string, name: string, userPassword: string) => {
  const user = await User.findOne({ email });
  if (user) throw new UserError(ERROR_MESSAGES.USER_ALREADY_EXIST, 409);

  const newUser = new User({ email, name, password: userPassword });
  if (!newUser) throw new UserError(ERROR_MESSAGES.SERVER_ERROR, 500);

  await newUser.save();
  const token = await generateToken(email);

  return { user: newUser.toObject(), token };
};

/**
 * Authenticates a user by verifying their email and password. .
 * If the credentials are valid, a JWT token is generated for the user.
 * @param email The email address of the user attempting to log in.
 * @param userPassword The password entered by the user.
 * @returns - { newUser, token} : { User document ,  A JWT (JSON Web Token) for the user }.
 */
export const login = async (email: string, userPassword: string) => {
  const user = await User.findOne({ email }).populate("cart");
  if (!user) throw new UserError(ERROR_MESSAGES.NO_ACCESS, 401);

  const isPasswordMatch = await bcrypt.compare(userPassword, user.password);
  if (!isPasswordMatch) throw new UserError(ERROR_MESSAGES.NO_ACCESS, 401);

  const token = await generateToken(user.email);

  return { user: user.toObject(), token };
};
