module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define('message',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            content: DataTypes.STRING
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );

    Message.associate = (models) => {
        Message.belongsTo(models.customer)
        Message.belongsTo(models.session)
    };

    return Message;

};