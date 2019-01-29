import { Router } from "express";
import mongoose from "mongoose";
import Order from "../models/order";
import Product from "../models/product";

const router = Router();

router.get("/", (req, res, next) => {
  Order
    .find()
    .select("product quantity _id")
    .populate("product")
    .exec()
    .then((docs) => res.status(200).json({
      count: docs.length,
      orders: docs.map((doc: any) => {
        return {
          _id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          request: {
            type: "GET",
            url: `http://localhost:3000${ doc._id }`,
          },
        };
      }),
    }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/", (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
      });
      order
        .save()
        .then((result: any) => {
    // tslint:disable-next-line: no-console
          console.log(result);
          res.status(201).json({
            createdOrder: {
              _id: result._id,
              product: result.product,
              quantity: result.quantity,
            },
            message: "Order stored",
            request: {
              type: "GET",
              url: `http://localhost:3000${ result._id }`,
            },
          });
        })
        .catch((err) => {
    // tslint:disable-next-line: no-console
          console.log(err);
          res.status(500).json({ error: err });
        });
    });
});

router.get("/:orderId", (req, res, next) => {
  Order
    .findById(req.params.orderId)
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      res.status(200).json({
        order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:orderId", (req, res, next) => {
  Order
    .deleteOne({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          body: { productId: "ID", quantity: "Number" },
          type: "POST",
          url: "http://localhost:3000/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

export default router;
