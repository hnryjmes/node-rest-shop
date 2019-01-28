import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/product";

const router = Router();

router.get("/", (req, res, next) => {
  Product
    .find()
    .exec()
    .then((docs) => {
// tslint:disable-next-line: no-console
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
// tslint:disable-next-line: no-console
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
// tslint:disable-next-line: no-console
      console.log(result);
      res.status(201).json({
        createdProduct: product,
        message: "Handling POST requests to /products",
      });
    })
    .catch((err) => {
// tslint:disable-next-line: no-console
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((doc) => {
// tslint:disable-next-line: no-console
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
// tslint:disable-next-line: no-console
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps: any = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product
    .update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
// tslint:disable-next-line: no-console
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product
    .remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
// tslint:disable-next-line: no-console
      console.log(err);
      res.status(500).json({ error: err });
    });
});

export default router;
