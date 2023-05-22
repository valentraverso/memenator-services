const express = require("express");
const router = express.Router();
const { gifController } = require("../controllers");

const { getAll, postGif } = gifController;

const routerGif = router
    .get("/all", getAll)
    .post("/post", postGif);

module.exports = routerGif;