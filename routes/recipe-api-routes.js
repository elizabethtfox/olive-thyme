//A set of routes for displaying and saving data to the db

// Dependencies

// Requiring our models
var db = require("../models");

// Routes
module.exports = function(app) {

// GET route for getting all of the posts
    app.get("/api/recipes", function(req, res) {
        var query = {};
        if (req.query.category_id) {
            query.CategoryId = req.query.category_id;
        }
        //Add an "include" property to our options in our findOne query
        //Sets the value to an array of the models included in a left outer join
        // db.Post
        db.Recipe.findAll({
            where: query,
            include: [db.Category]
        }).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

//GET route for retrieving a single post
    app.get("/api/recipes/:id", function(req, res) {
        db.Recipe.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Category]
        }).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

//POST route for saving a new post
    app.post("/api/recipes", function(req, res) {
        db.Recipe.create(req.body).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

// DELETE route for deleting posts
    app.delete("/api/recipes/:id", function(req, res) {
        db.Recipe.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

    // PUT route for updating posts
    app.put("/api/recipes", function(req, res) {
        db.Recipe.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });
};