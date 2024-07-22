const express = require("express");
const morgan = require("morgan");
const cors = require('cors')

const {
  globalErrHandler,
  notFoundErr
} = require("../middlewares/globalErrorHandle");
const categoryRouter = require("../routes/categoryRouter");
const sellerRouter = require("../routes/sellerRouter");
const adminRouter = require("../routes/adminRouter");
const productRouter = require("../routes/productRouter");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// cors
const corsOptions = {
  origin: ['http://localhost:5173', 'https://smart-crud.vercel.app', 'https://smart-crud.vercel.app'], // Allow these origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

app.use(cors(corsOptions));

// Routes
app.use("/api/categories", categoryRouter);
app.use("/api/sellers", sellerRouter);
app.use("/api/admins", adminRouter);
app.use("/api/products", productRouter);

// Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
