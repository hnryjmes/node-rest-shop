import express from "express";
const app = express();
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import orderRoutes from "./api/routes/orders";
import productRoutes from "./api/routes/products";

dotenv.config();

// tslint:disable-next-line: max-line-length
mongoose.connect(
  `mongodb+srv://node-shop:${ process.env.MONGO_ATLAS_PW }@node-rest-shop-mchfp.mongodb.net/test?retryWrites=true`,
  { useNewUrlParser: true },
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  next(error);
});

app.use((error: any, req: any, res: any, next: any) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
