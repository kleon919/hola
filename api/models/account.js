const bcrypt = require('bcrypt')

const hashPassword = async (account, options) => {
    if (!account.changed('password')) return;
    return account.setDataValue('password', await bcrypt.hash(account.password, 10));
}


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
                required: true,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                required: true
            },
            salt: {
                type: DataTypes.STRING,
                required: true
            }
        },
        {
            freezeTableName: true,
            underscored: true,
            hooks: {
                beforeCreate: hashPassword,
                beforeUpdate: hashPassword
            }
        }
    );

    // Account.myFunc  -> Class method
    // Account.prototype.myFunc  -> Instance method

    Account.prototype.isValidPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    Account.associate = (models) => {
    };

    return Account;

};