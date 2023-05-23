const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const {
    DB,
    PORT
} = require("./utils/config");
const fileUpload = require("express-fileupload")
const { gifRoute } = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './src/assets/tmp/'
}));

connectDB(app, PORT, DB);

app.use("/gifs", gifRoute);