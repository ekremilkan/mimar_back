const controller = require("../controllers/index");
const router = require("express").Router();
const validation = require("../validations/index");

router.post(
  "/createProduct",
  [validation.productsValidator.validateCreate()],
  controller.product.createProduct
);
router.get("/getAllProducts", controller.product.getAllProduct);
router.get(
  "/getProductById/:productId",
  [validation.productsValidator.validateGetById],
  controller.product.getProductById
);
router.get(
  "/getProductByName/:name/:lang",
  [validation.productsValidator.validateGetByName],
  controller.product.getProductByName
);
router.get(
  "/getProductBySlug/:slug/:lang",
  [validation.productsValidator.validateGetBySlug],
  controller.product.getProductBySlug
);
router.get("/getActiveProducts", controller.product.getActiveProducts);
router.get(
  "/listProducts",
  [validation.productsValidator.validateList],
  controller.product.listProducts
);
router.put(
  "/updateProduct/:productId",
  [validation.productsValidator.validateUpdate()],
  controller.product.updateProduct
);
router.delete(
  "/deleteProduct/:productId",
  [validation.productsValidator.validateDelete],
  controller.product.deleteProduct
);
