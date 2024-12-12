import express from "express";
import cors from "cors";
import databaseConncetion from "./src/config/db.js";
const app = express();
const PORT = process.env.PORT || 8000;
databaseConncetion()
  .then(() => {
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`your app is live at  http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//1.  middleware

app.use(cors());
app.use(express.json());

// 2. database connectivity

app.get("/", (req, res, next) => {
  res.json("your server is live hehehe");
});

// error handler will come here
