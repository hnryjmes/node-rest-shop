import express from "express";
const app = express();

import orderRoutes from "./api/routes/orders";
import productRoutes from "./api/routes/products";

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

export default app;
