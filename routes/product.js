const express = require("express");
const connection = require("../connection");
const router = express.Router();
const fileUpload = require("express-fileupload");

router.use(fileUpload());

router.post("/create", (req, res, next) => {
  const product = req.body;
  const image = req.files.image;

  if (!image) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  const imageData = image.data;

  const query =
    "INSERT INTO product (name, description, price, image) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [product.name, product.description, product.price, imageData],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "Product Added Successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.get("/read", (req, res, next) => {
  var query = "select *from product";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.patch("/update/:id", (req, res, next) => {
  const id = req.params.id;
  let product = req.body;
  var query = "update product set name=?, description=?, price=? where id =?";
  connection.query(
    query,
    [product.name, product.description, product.price, id],
    (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Product id does not dound" });
        }
        return res.status(200).json({ message: "Product Updated Succesfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.delete("/delete/:id", (req, res, next) => {
  const id = req.params.id;
  var query = "delete from product where id =?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "Product id does not dound" });
      }
      return res.status(200).json({ message: "Product Deleted Succesfully" });
    } else {
      return res.status(500).json(err);
    }
  });
});
module.exports = router;
