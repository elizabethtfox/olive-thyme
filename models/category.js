module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        // Giving the Category model a name of type STRING
        name: DataTypes.STRING
    });

    Category.associate = function(models) {
        // Associating Category with Recipes
        // When a Category is deleted, also delete any associated Recipes
        Category.hasMany(models.Recipe, {
            onDelete: "cascade"
        });
    };

    return Category;
};
