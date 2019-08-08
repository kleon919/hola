module.exports = (sequelize, DataTypes) => {

    const Account = sequelize.define('account',
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
        },
        {
            freezeTableName: true,
            underscored: true
        }
    );


    Account.associate = (models) => {};

    return Account;

};