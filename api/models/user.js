module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            password: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING

        },
        {
            freezeTableName: true,
        }
    );



    User.associate = (models) => {
        User.hasMany(models.ticket);
        // User.belongsToMany(models.question, {
        //     as: 'Clients',
        //     through: 'client_dialog',
        //     foreignKey: 'userId',
        //     otherKey: 'questionId'
        // });
    };

    return User;

};