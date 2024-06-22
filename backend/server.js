import app from "./app.js";
import cloudinary from "cloudinary";
// const dotenv = require("dotenv");
// dotenv.config();
cloudinary.v2.config({
  cloud_name: 'dwwksaujr',
  api_key: '418698844129991',
  api_secret: 'O-Lp4p88SsNGM1JyuhBLW9JorjA',
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
