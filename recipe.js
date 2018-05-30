module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Recipe.associate = function(models) {
        // We're saying that a Recipe should belong to a Category
        // A Recipe can't be created without an Category due to the foreign key constraint
        Recipe.belongsTo(models.Category, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Recipe;
};
