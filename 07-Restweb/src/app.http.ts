import fs from "fs";
import http from "http";

const server = http.createServer((req, res) => {
	console.log(req.url);

	if (req.url === "/") {
		const htmlFile = fs.readFileSync("./public/index.html", "utf-8");

		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(htmlFile);
        return;
	} 
    
    if (req.url?.endsWith(".js")) {
		res.writeHead(200, { "Content-Type": "application/javascript" });
	}
    else if (req.url?.endsWith(".css")) {
        res.writeHead(200, { "Content-Type": "text/css" });
    }
    
    const content = fs.readFileSync(`./public${req.url}`, "utf-8");
    res.end(content);

});

server.listen(8080, () => {
	console.log("Server is running on port 8080");
});
