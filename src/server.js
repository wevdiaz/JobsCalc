const { urlencoded } = require("express");
const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

server.set("view engine", "ejs");

// Mudar localização da pasta views
server.set("views", path.join(__dirname, "views"));


server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(routes);


server.listen(3000, function() {
    console.log("Server is working!")
});