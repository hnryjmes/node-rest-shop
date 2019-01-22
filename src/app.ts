import express from "express";
const app = express();
import morgan from "morgan";

import orderRoutes from "./api/routes/orders";
import productRoutes from "./api/routes/products";

app.use(morgan("dev"));

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
