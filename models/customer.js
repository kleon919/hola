module.exports = (sequelize, DataTypes) => {

    const Customer = sequelize.define('customer',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            surname: DataTypes.STRING,
            profile_pic: DataTypes.STRING,
            dob: DataTypes.DATE,
            genre: DataTypes.STRING,
            country: DataTypes.STRING
        },
        {
            freezeTableName: true,
            underscored: true
        }
    );


    Customer.associate = (models) => {
        Customer.belongsTo(models.account, {foreignKey: {unique: true}});
    };

    return Customer;

};