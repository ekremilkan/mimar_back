//title
//items => title description

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
    },
    { _id: false })

    const process = new Schema ({
        title: multilingualFieldSchema,
        content: [paragraphSchema],
    },{
        minimize: true,
        timestamps: true,
        autoIndex: true,
    })

    const Process = mongoose.model("Process", process, "process");
    module.exports = Process;