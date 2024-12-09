import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;
app.use("/", (req, res, next) => {
  res.json("your server is live hehehe");
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`your app is live at  http://localhost:${PORT}`);
});
