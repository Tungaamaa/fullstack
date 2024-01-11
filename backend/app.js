require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const servicesRoutes = require("./routes/services");

const app = express();
app.use(express.json());
// app.use(cors());

app.use(
  cors({
  origin: ["https://fullstack-leap-frontend-five.vercel.app", "http://localhost:3000"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  })
 );

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
app.use("/services", servicesRoutes);

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

