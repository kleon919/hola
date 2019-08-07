module.exports = (sequelize, DataTypes) => {

    const Hotel = sequelize.define('hotel',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            address: DataTypes.STRING,
        },
        {
            freezeTableName: true,
        }
    );

    // Hotel.associate = (models) => {};

    return Hotel;

};