var db = require("../models");

module.exports = function(app) {
    app.get("/api/categories", function(req, res) {
        //Add an "include" property to our options in our findAll query
        //Sets the value to an array of the models included in a left outer join
        // db.Post
        db.Category.findAll({
            include: [db.Recipe]
        }).then(function(dbCategory) {
            res.json(dbCategory);
        });

    });

    app.get("/api/categories/:id", function(req, res) {
        ///Add an "include" property to our options in our findOne query
        //Sets the value to an array of the models included in a left outer join
        // db.Post
        db.Category.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Recipe]
        }).then(function(dbCategory) {
            res.json(dbCategory);
        });
    });

    app.post("/api/categories", function(req, res) {
        db.Category.create(req.body).then(function(dbCategory) {
            res.json(dbCategory);
        });
    });

    app.delete("/api/categories/:id", function(req, res) {
        db.Category.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbCategory) {
            res.json(dbCategory);
        });
    });
};