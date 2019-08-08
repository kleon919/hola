module.exports = (sequelize, DataTypes) => {

    const Room = sequelize.define('room',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            room_number: DataTypes.INTEGER,
            type: DataTypes.STRING
        },
        {
            freezeTableName: true,
            underscored: true,
            timestamps:false
        }
    );

    Room.associate = (models) => {
        Room.belongsTo(models.hotel)
    };

    return Room;

};