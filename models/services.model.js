const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const multilingualFieldSchema = new Schema(
  {
    en: { type: String, required: true },
    tr: { type: String, required: false },
  },
  { _id: false }
);

const serviceSchema = new Schema(
  {
    title: multilingualFieldSchema,
    description: multilingualFieldSchema,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, minimize: true, autoIndex: true }
);

const Service = mongoose.model("Service", serviceSchema, "services");

module.exports = Service;