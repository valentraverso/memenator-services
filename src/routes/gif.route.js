const express = require("express");
const router = express.Router();
const { gifController } = require("../controllers");

const jwtCheck = require("../utils/authz")

const { getAll, postGif, postGifUrl, getByDescription, getMostUploadTags, getByTagName } = gifController;

const routerGif = router
    .get("/all", getAll)
    .get("/description/:description", getByDescription)
    .get("/tags/most-upload", getMostUploadTags)
    .get("/tags/name/:tag", getByTagName)
    .post("/post", jwtCheck, postGif)
    .post("/post/url", jwtCheck, postGifUrl);

module.exports = routerGif;