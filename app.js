var express = require("express"),
    mongoose = require("mongoose"),
    parser = require("body-parser"),
    swaggerUi = require("swagger-ui-express"),
    swaggerDocument = require("./swagger.json");

var db;
if (process.env.ENV == "test") {
    db = mongoose.connect("mongodb://localhost/book_api_test");
} else {
    db = mongoose.connect("mongodb://localhost/book_api");
}

var Book = require("./models/book");

var app = express();
var port = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

var bookRouter = require("./routes/book-router")(Book);

app.use("/api/books", bookRouter);

app.listen(port, function () {
    console.log("Gulp is running on port: " + port);
});

module.exports = app;