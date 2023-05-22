const express = require("express");
const router = express.Router();
const { gifController } = require("../controllers");

const { getAll } = gifController;

const routerGif = router
    .get("/all", getAll);

module.exports = routerGif;