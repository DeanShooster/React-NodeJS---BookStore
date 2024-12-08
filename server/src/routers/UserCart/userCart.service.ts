import Book from "../../database/models/Book";
import User from "../../database/models/User";

import { UserError } from "../../middlewares/errorHandler";
import { ERROR_MESSAGES } from "../../constants/enum";

export const addBookToUserCart = async (bookName: string, userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new UserError(ERROR_MESSAGES.BAD_REQUEST, 400);

  const book = await Book.findOne({ name: bookName });
  if (!book) throw new UserError(ERROR_MESSAGES.BAD_REQUEST, 400);

  user.cart.push(book._id);

  await user.save();
};
