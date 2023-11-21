require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

//middleware logging
app.use((req, res, next) => {
  console.log(
    `This is requset path: ${req.path}, This is request method: ${req.method}`
  );
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "You are requesting from the root path",
  });
});

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

//middleware error handling
app.use((req, res, next) => {
  res.status(404).json({
    message: `page not found`,
  });
  next();
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    console.log("Connected MongoDB successfully"),
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    })
  )
  .catch((err) => console.log(err));

