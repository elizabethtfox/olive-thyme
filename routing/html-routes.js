//A set of routes for sending users to the various html pages

//Dependencies
var path = require("path");

//Routes
module.exports = function(app) {

//Routes for handling a specific HTML page that the user gets sent to
//index route loads create newrecipe.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/newrecipe.html"));
  });

//saved recipes route loads savedrecipes.html
  app.get("/savedrecipe", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/savedrecipe.html"));
  });

  //shopping list route loads shoppinglist.html
  app.get("/shoppinglist", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shoppinglist.html"));
  });

  //categories route loads categories.html
  app.get("/category", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/category.html"));
  });

};