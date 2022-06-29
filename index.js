

const express = require("express");
const app = express();
const port = 3000;

let visitors = 0;

app.get("/", (req,res) => {

	// Tilføj til visitors
	visitors++;

	// Send
	res.send(`Hello world, you are visitor no. ${visitors} on server: ${process?.env?.SERVER_NAME}`);

})

app.use("*", (req, res) => {

	res.status(404).send("Page not found");

})

app.listen(port, () => {

	console.log("App listening on port:", port);

})