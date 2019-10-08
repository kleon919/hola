module.exports = (sequelize, DataTypes) => {

    const Room_Assign = sequelize.define('room_assign',
        {
            nights: DataTypes.INTEGER
        },
        {
            freezeTableName: true,
            underscored: true,
        }
    );

    Room_Assign.associate = (models) => {
        models.customer.belongsToMany(models.room, {
            as: 'Visitor',
            through: 'room_assign',
            foreignKey: 'customer_id',
            otherKey: 'room_id'
        });

        models.room.belongsToMany(models.customer, {
            as: 'Place',
            through: 'room_assign',
            foreignKey: 'room_id',
            otherKey: 'customer_id'
        });

        Room_Assign.belongsTo(models.booking)

    };

    return Room_Assign;

};