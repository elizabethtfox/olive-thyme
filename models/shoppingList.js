module.exports = function(sequelize, DataTypes) {
    var List = sequelize.define("List", {
        text: DataTypes.STRING,
        complete: DataTypes.BOOLEAN
    });
    return List;
};
