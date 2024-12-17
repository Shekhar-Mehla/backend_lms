import express from "express";
import cors from "cors";
import databaseConncetion from "./src/config/db.js";
import UserRouter from "./src/routes/authRoute.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
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

app.use("/api/v1/auth", UserRouter);

// error handler will come here
app.use(errorMiddleware);
