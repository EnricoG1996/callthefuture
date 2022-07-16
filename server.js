require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const router = require("./routes/route");
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));

app.use("/", router);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});