var db = require("../models");

module.exports = function(app) {
    app.get("/api/Recipe", function(req, res) {
        //Add an "include" property to our options in our findAll query
        //Sets the value to an array of the models included in a left outer join
        // db.Post
        db.Recipe.findAll({
            include: [db.Post]
        }).then(function(dbRecipe) {
            res.json(dbRecipe);
        });

    });

    app.get("/api/Recipe/:id", function(req, res) {
        ///Add an "include" property to our options in our findOne query
        //Sets the value to an array of the models included in a left outer join
        // db.Post
        db.Recipe.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Post]
        }).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

    app.post("/api/Recipe", function(req, res) {
        db.Recipe.create(req.body).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

    app.delete("/api/Recipe/:id", function(req, res) {
        db.Recipe.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });
};