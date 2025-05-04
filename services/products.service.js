const Product = require("../models/products.model");

exports.createProduct = async (req) => {
  try {
    const { name, description, image, order, active } = req.body;
    const existProduct = await Product.findOne({ "name.en": data.name.en });
    if (existProduct) {
      throw new Error("Bu ürün zaten var (İngilizce adı aynı)");
    }
    const product = new Product({ name, description, image, order, active });
    await product.save();
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllProducts = async () => {
  try {
    const products = await Product.find().sort({ order: 1, createdAt: -1 });
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getProductById = async (req) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

// Slug'a göre ürün getir (dil parametreli)
exports.getProductBySlug = async (req) => {
  try {
    const { slug, lang } = req.params; 
    const query = {};
    query[`slug.${lang}`] = slug;

    const product = await Product.findOne(query);
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getActiveProducts = async () => {
  try {
    const products = await Product.find({ active: true }).sort({
      order: 1,
      createdAt: -1,
    });
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

// Aramaya ve sıralamaya göre ürünleri getir
exports.listProducts = async (req) => {
  try {
    const { search, active, sortBy = "order", order = "asc" } = req.query;
    const filter = {};
    const sortOrder = order === "asc" ? 1 : -1;

    if (typeof active !== "undefined") {
      filter.active = active === "true"; 
    }

    if (search) {
      filter.$or = [
        { "name.en": { $regex: search, $options: "i" } }, //bir metin içinde belirli kurallara göre arama
        { "name.tr": { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).sort({ [sortBy]: sortOrder });
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateProduct = async (req) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      throw new Error("Ürün bulunamadı");
    }
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteProduct = async (req) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new Error("Ürün bulunamadı");
    }
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getProductByName = async (req) => {
  try {
    const { name, lang } = req.params;
    const query = {};
    query[`name.${lang}`] = name;

    const product = await Product.find(query);
    return product;
  } catch (error) {
    throw new Error(error);
  }
};
