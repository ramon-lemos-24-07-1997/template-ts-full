var express = require("express");
var router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "views", "status.html"));
});



module.exports = router;
