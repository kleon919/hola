module.exports = (sequelize, DataTypes) => {

    const Session = sequelize.define('session',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            freezeTableName: true,
            underscored: true,
        }
    );


    Session.associate = (models) => {
        Session.belongsTo(models.customer)
    };

    return Session;

};