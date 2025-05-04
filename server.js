const express = require("express");
const db = require("./db/index");
const configs = require("./configs/index");
const utils = require("./utils/index");
const middlewares = require("./middlewares/index");
const cors = require("cors");
const router = require("./routers/index");
const consts = require("./consts/index");

const app = express();

// CORS yapılandırması
const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Başlangıç yapılandırmaları
configs.serverConfig.initialServerConfig();
utils.helper.createUploadDir("./uploads");

const PORT = process.env.PORT || 5005;

// Statik dosyalar ve JSON veri işleme
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/products", router.productsRouter)

// Logger middleware'i kullan
app.use(middlewares.loggerMiddleware);

db.mongooseConnection.connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
  });
});
