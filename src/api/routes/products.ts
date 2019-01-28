import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/product";

const router = Router();

router.get("/", (req, res, next) => {
  Product
    .find()
    .select("name price _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc: any) => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            request: {
              type: "GET",
              url: `http://localhost:3000/products/${ doc._id }`,
            },
          };
        }),
      };
      res.status(200).json(response);
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
    .then((result: any) => {
// tslint:disable-next-line: no-console
      console.log(result);
      res.status(201).json({
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          request: {
            type: "GET",
            url: `http://localhost:3000/products/${ result._id }`,
          },
        },
        message: "Created product successfully",
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
    .select("name price _id")
    .exec()
    .then((doc) => {
// tslint:disable-next-line: no-console
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: `http://localhost:3000/products/${ doc._id }`,
          },
        });
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
    .updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: `http://localhost:3000/products/${ id }`,
        },
      });
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
    .deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          body: { name: "String", price: "Number" },
          type: "POST",
          url: "http://localhost:3000/products",
        },
      });
    })
    .catch((err) => {
// tslint:disable-next-line: no-console
      console.log(err);
      res.status(500).json({ error: err });
    });
});

export default router;
