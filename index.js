const express = require("express");
const dotENV = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path')

const app = express();

const PORT = process.env.PORT || 4000;

dotENV.config();
app.use(cors())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected succesfully!"))
  .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use("/vendor", vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`server started and running at ${PORT}`);
});

app.use("/", (req, res) => {
  res.send("<h1>welcome to foodie</h1>");
});

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const dotENV = require("dotenv");
// const vendorRoutes = require("./routes/vendorRoutes");

// const app = express();

// const PORT = process.env.PORT || 4000;

// dotENV.config();

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("mongodb connected succesfully");
//   })
//   .catch((error) => {
//     console.log(`${error}`);
//   });

// app.use(bodyParser.json());
// app.use("/vendor", vendorRoutes);

// app.listen(PORT, () => {
//   console.log(`server started and running succesfully ${PORT}`);
// });
