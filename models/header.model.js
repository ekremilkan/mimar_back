const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//çoklu dil şeması
const multilingualFieldSchema = new Schema(
  {
    en: { type: String, required: true }, // İngilizce
    tr: { type: String, required: false }, // Türkçe
  },
  { _id: false }
);


const headerMenuItemSchema = new Schema(
  {
    title: multilingualFieldSchema,
    destination: multilingualFieldSchema,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    parentId: { type: Schema.Types.ObjectId, ref: "MenuItem", default: null },
  },
  { _id: false }
);

//sosyal medya şeması
const socialMediaSchema = new Schema(
  {
    platform: {
      type: String,
      enum: ["instagram", "linkedin", "twitter", "whatsapp"],
      required: true,
    },
    url: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);


//header ana şeması
const headerSchema = new Schema(
  {
    headerMenuItems: [headerMenuItemSchema],
    socialMedia: [socialMediaSchema],
    languageSelector: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    minimize: true,
    autoIndex: true,
  }
);

headerSchema.pre("save", function (next) {
  if (this.isModified("headerMenuItems")) {
    const createSlug = (title) =>
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    this.headerMenuItems.forEach((item) => {
      if (!item.destination || Object.keys(item.destination).length === 0) {
        item.destination = {
          en: item.title.en ? `/${createSlug(item.title.en)}` : "/",
          tr: item.title.tr ? `/${createSlug(item.title.tr)}` : "/",
        };
      }
    });
  }
  next();
});

const Header = mongoose.model("Header", headerSchema, "headers");

module.exports = Header;
