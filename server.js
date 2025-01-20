import express from "express";
import cors from "cors";
import databaseConncetion from "./src/config/db.js";
import authRouter from "./src/routes/authRoute.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import userRouter from "./src/routes/userRoutes.js";
const app = express();
const PORT = process.env.PORT || 8000;
// 1. database connectivity
databaseConncetion()
  .then(() => {
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`your app is live at  http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error, "it has cought");
  });

//2..  middleware

app.use(cors());
app.use(express.json());

// 3. router end points

app.use("/api/v1/auth", authRouter);

// private router
app.use("/api/v1/user", userRouter);


// error handler will come here
app.use(errorMiddleware);
