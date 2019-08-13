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
            timestamps:false,
            underscored: true
        }
    );

    // Hotel.associate = (models) => {};

    return Hotel;

};