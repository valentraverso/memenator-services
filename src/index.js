const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const {
    DB,
    PORT
} = require("./utils/config");
const jwtCheck = require("./utils/authz");
const { gifRoute } = require("./routes");

const app = express();

app.use(jwtCheck);
app.use(express.json());
app.use(cors());

connectDB(app, PORT, DB);

app.use("/gifs", gifRoute);