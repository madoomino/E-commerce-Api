const router = require("express").Router();
const productsController = require("../controllers/productsController");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.createProduct);

router
  .route("/:id")
  .patch(productsController.editProduct)
  .delete(productsController.deleteProduct);

module.exports = router;
