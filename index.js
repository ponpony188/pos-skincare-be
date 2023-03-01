const { join } = require("path");
require('dotenv').config({ path: join(__dirname, '.env') });
const express = require('express');
const app = express();
const cors = require('cors');
const FileUpload = require('express-fileupload');

const bearerToken = require('express-bearer-token')
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(bearerToken());
// #destination file storage(image/pdf/document)
app.use("/", express.static(__dirname + "/public"));


// DB Check Connection
const { db } = require('./src/config/config');

app.get('/', (req, res) => {
  res.status(200).send('<h1>SKINCARE API</h1>');
})

// Routing Config
const userRouter = require('./src/routers/userRouter')
app.use('/user', userRouter);

// const productsRouter = require('./src/routers/productsRouter')
// app.use('/products', productsRouter);

// const checkoutRouter = require('./src/routers/checkoutRouter')
// app.use('/checkout', checkoutRouter);

// const reportRouter = require('./src/routers/reportRouter')
// app.use('/report', reportRouter);
// user main router dari excel

// Error Handling
app.use((err, req, res, next) => {
  // Error handling middleware functionality
  console.log(err); // log the error
  const status = err.status || 500;
  // send back an easily understandable error message to the caller
  res.status(status).send(err);
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR:`, err);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});