const mongoose = require("mongoose");
const db = mongoose.connection;

db.once("open", () => {
  console.log("DB bağlantısı başarılı");
});

const connectDb = async () => {
  await mongoose.connect(`mongodb://127.0.0.1:27017/recap`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectDb };
