module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define('category',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: DataTypes.STRING,
            subject: DataTypes.TEXT
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );

    // Category.associate = (models) => {};

    return Category;

};