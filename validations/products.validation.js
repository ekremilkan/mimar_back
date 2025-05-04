const { body, param, query } = require("express-validator");

const productValidator = {
  // Ürün oluşturma validasyonu
  validateCreate() {
    return [
      body("name.en").notEmpty(),
      body("name.tr").notEmpty(),
      body("description.en").optional().isString(),
      body("description.tr").optional().isString(),
      body("image").optional().isString(),
      body("order").optional().isInt(),
      body("active").notEmpty().isBoolean(),
    ];
  },

  // Ürün güncelleme validasyonu
  validateUpdate() {
    return [
      param("productId").notEmpty().isMongoId(),
      body("name.en").optional().notEmpty(),
      body("name.tr").optional().notEmpty(),
      body("description.en").optional().isString(),
      body("description.tr").optional().isString(),
      body("image").optional().isString(),
      body("order").optional().isInt(),
      body("active").optional().isBoolean(),
    ];
  },

  // Ürünü ID ile getirme validasyonu
  validateGetById() {
    return [param("productId").notEmpty().isMongoId()];
  },

  // Ürünü slug ile getirme validasyonu
  validateGetBySlug() {
    return [
      param("slug").notEmpty(),
      param("lang").notEmpty().isIn(["en", "tr"]),
    ];
  },

  // Ürünü isim ile getirme validasyonu
  validateGetByName() {
    return [
      param("name").notEmpty(),
      param("lang").notEmpty().isIn(["en", "tr"]),
    ];
  },

  // Ürünü silme validasyonu
  validateDelete() {
    return [param("productId").notEmpty().isMongoId()];
  },

  // Listeleme query validasyonu
  validateList() {
    return [
      query("search").optional().isString(),
      query("active").optional().isBoolean(),
      query("sortBy").optional().isString(),
      query("order").optional().isIn(["asc", "desc"]),
    ];
  },
};

module.exports = productValidator;
