require("dotenv");
const router = require("express").Router();
const controller = require("../controllers/controller");

router.post("/uploadPdf", controller.uploadPdf);

router.get("*", (req, res) => {
	res.render("index");
})

module.exports = router;