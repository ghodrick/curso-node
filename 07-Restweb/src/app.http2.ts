import fs from "fs";
import http2 from "http2";

const server = http2.createSecureServer(
	{
		key: fs.readFileSync("./ssl/server.key"),
		cert: fs.readFileSync("./ssl/server.crt"),
	},
	(req, res) => {
		console.log(req.url);

		if (req.url === "/") {
			const htmlFile = fs.readFileSync("./public/index.html", "utf-8");

			res.writeHead(200, { "Content-Type": "text/html" });
			res.end(htmlFile);
			return;
		}

		if (req.url?.endsWith(".js")) {
			res.writeHead(200, { "Content-Type": "application/javascript" });
		} else if (req.url?.endsWith(".css")) {
			res.writeHead(200, { "Content-Type": "text/css" });
		}

		try {
			const content = fs.readFileSync(`./public${req.url}`, "utf-8");
			res.end(content);
		} catch (error) {
			res.writeHead(404, { "Content-Type": "text/html" });
			res.end("404 Not Found");
		}
	},
);

server.listen(8080, () => {
	console.log("Server is running on port 8080");
});
