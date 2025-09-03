import express from "express";
import cors from "cors";
import databaseConncetion from "./src/config/db.js";
import authRouter from "./src/routes/authRoute.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import userRouter from "./src/routes/userRoutes.js";
import bookRouter from "./src/routes/bookRoute.js";
import borrowRouter from "./src/routes/boorowRoute.js";
import path from "path";
import cloudnaryConfig from "./src/config/cloudnaryConfig.js";
import { reviewRouter } from "./src/routes/reviewRoutes.js";
const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();
cloudnaryConfig();

// 1. database connectivity
databaseConncetion()
  .then(() => {
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`your app is live at  https://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//2..  middleware

app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 3. router end points

app.use("/api/v1/auth", authRouter);

// private router
app.use("/api/v1/user", userRouter);

// book routes
app.use("/api/v1/book", bookRouter);

// review router
app.use("/api/v1/review", reviewRouter);

// borrow route
app.use("/borrow-book", borrowRouter);

// error handler will come here
app.use(errorMiddleware);
