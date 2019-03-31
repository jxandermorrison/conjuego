var express = require("express");
const router = express.Router();

// controller here
var verbs = require("../controllers/verbs.controller");

router.get("/test", verbs.test);

router.get("/fetch", verbs.fetchVerb);

module.exports = router;
