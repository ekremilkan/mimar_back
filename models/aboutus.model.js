const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const multilingualFieldSchema = new Schema(
  {
    en: { type: String, required: true }, // İngilizce
    tr: { type: String, required: false }, // Türkçe
  },
  { _id: false }
);

const paragraphSchema = new Schema(
  {
    title: multilingualFieldSchema,
    subtitle: multilingualFieldSchema,
    paragraph: multilingualFieldSchema,
    image: { type: String, trim: true },
  },
  { _id: false }
);

const aboutUs = new Schema(
  {
    title: multilingualFieldSchema,
    content: [paragraphSchema],
    image: { type: Schema.Types.String, required: true },
  },
  {
    minimize: true,
    timestamps: true,
    autoIndex: true,
  }
);

const About = mongoose.model("About", aboutUs, "abouts");
module.exports = About;
