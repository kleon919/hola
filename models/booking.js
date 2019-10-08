module.exports = (sequelize, DataTypes) => {

    const Booking = sequelize.define('booking',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            date_from: DataTypes.DATE,
            date_to: DataTypes.DATE,
            type_of_trip: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            underscored: true
        }
    );

    Booking.associate = (models) => {
        Booking.belongsTo(models.customer)
        Booking.belongsTo(models.hotel)
    };

    return Booking;

};