/A set of routes for sending users to the various html pages

//Dependencies
var path = require("path");

//Routes
module.exports = function(app) {

//Routes for handling a specific HTML page that the user gets sent to
//index route loads create newrecipe.html
    app.get("/main", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/main.html"));
    });

    //Options
    app.get("/options", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/options.html"));
    });


    //Create new recipe
    app.get("/recipe", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/recipe.html"));
    });

//saved recipes route loads savedrecipes.html
    app.get("/savedRecipes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/savedRecipes.html"));
    });

//categories route loads categories.html
    app.get("/categories", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/category.html"));
    });

    //shopping list route loads shoppinglist.html
    app.get("/shoppingList", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/shoppingList.html"));
    });

};