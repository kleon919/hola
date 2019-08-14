module.exports = (sequelize, DataTypes) => {

    const Staff = sequelize.define('staff',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            surname: DataTypes.STRING,
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

    Staff.associate = (models) => {
        Staff.belongsTo(models.hotel);
        Staff.belongsTo(models.account);
    };

    return Staff;

};