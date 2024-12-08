import express from "express";
import cors from "cors";

import { errorHandler } from "./middlewares/errorHandler";
import userRouter from "./routers/User/user.controller";
import bookRouter from "./routers/Book/book.controller";
import userReviewsRouter from "./routers/UserReview/userReview.controller";
import userCartRouter from "./routers/UserCart/userCart.controller";

const app = express();
const port = process.env.PORT || 4000;

// Cors white list and JSON
app.use(cors());
app.use(express.json());

// Routers
app.use(userRouter);
app.use(bookRouter);
app.use(userReviewsRouter);
app.use(userCartRouter);
app.use(errorHandler);

app.listen(port, async () => console.log(`Server is online on Port: ${port}`));
