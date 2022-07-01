

const express = require("express");
const app = express();
const port = 3000;

let visitors = 0;

// Network interfaces
let networkInterfaces = require("os").networkInterfaces();

let getIpAdresses = () => {

	let nets = networkInterfaces;
	const results = Object.create(null); // Or just '{}', an empty object

	for (const name of Object.keys(nets)) {
		for (const net of nets[name]) {
			// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
			// 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
			const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
			if (net.family === familyV4Value && !net.internal) {
				if (!results[name]) {
					results[name] = [];
				}
				results[name].push(net.address);
			}
		}
	}

	return results;

}

app.get("*", (req,res) => {

	// Tilføj til visitors
	visitors++;

	let ipAdresses = getIpAdresses();

	// Send
	res.send(`Hello world, you are visitor no. ${visitors} on IP: ${Object.entries(ipAdresses).map(([key, value]) => {

		return `<span style="margin: 0px 10px; background: #f1f1f1; padding: 10px; border-radius: 5px;">${key}: ${value.map(e => e).join("-")}</span>`

	})}`);

})

app.use("*", (req, res) => {

	res.status(404).send("Page not found");

})

app.listen(port, () => {

	console.log("App listening on port:", port);

})