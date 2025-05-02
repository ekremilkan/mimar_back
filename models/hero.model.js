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

// Hero Slider şeması
const heroSliderSchema = new Schema(
  {
    title: multilingualFieldSchema, // Başlık (örn: "Build Your Dream With Passion")
    subtitle: multilingualFieldSchema, // Alt başlık veya kategori (örn: "Mimarlık")
    description: multilingualFieldSchema,
    buttonText: multilingualFieldSchema, 
    buttonUrl: { type: String, required: false }, 
    image: { type: String, required: true }, 
    order: { type: Number, default: 0 }, 
    active: { type: Boolean, default: true }, 
  },
  {
    minimize: true,
    timestamps: true,
    autoIndex: true,
  }
);

// Slaytların sıralama ile alınması için statik metod
heroSliderSchema.statics.getActiveSlides = function() {
  return this.find({ active: true }).sort({ order: 1 });
};

const HeroSlider = mongoose.model("HeroSlider", heroSliderSchema, "hero_sliders");
module.exports = HeroSlider;