const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Çok dilli alan için şema
const multilingualFieldSchema = new Schema(
  {
    en: { type: String, required: true }, // İngilizce
    tr: { type: String, required: false }, // Türkçe
  },
  { _id: false }
);

// Ürün şeması
const productSchema = new Schema(
  {
    name: multilingualFieldSchema, // Ürün adı (çok dilli)
    description: multilingualFieldSchema, // Ürün açıklaması (çok dilli)
    image: { 
      type: String, 
      required: true 
    }, // Ürün resmi (hem thumbnail hem de büyük görünüm için)
    slug: { 
      en: { type: String, unique: true },
      tr: { type: String, unique: true }
    }, // SEO-dostu URL (otomatik oluşturulacak)
    order: { type: Number, default: 0 }, // Sıralama (opsiyonel)
    active: { type: Boolean, default: true }, // Ürün aktif mi?
  },
  {
    minimize: true,
    timestamps: true,
    autoIndex: true,
  }
);

// Slug otomatik oluşturma için pre-save hook
productSchema.pre("save", function(next) {
  // İngilizce slug oluştur
  if (this.name.en) {
    this.slug.en = this.name.en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  
  // Türkçe slug oluştur (eğer Türkçe isim varsa)
  if (this.name.tr) {
    this.slug.tr = this.name.tr
      .toLowerCase()
      .replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  
  next();
});


const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;