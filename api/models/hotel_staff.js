module.exports = (sequelize, DataTypes) => {

    const Hotel_Staff = sequelize.define('hotel_staff',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            profile_pic: DataTypes.TEXT,
            role: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            underscored: true
        }
    );

    Hotel_Staff.associate = (models) => {
        Hotel_Staff.belongsTo(models.hotel);
        Hotel_Staff.belongsTo(models.account);
    };

    return Hotel_Staff;

};