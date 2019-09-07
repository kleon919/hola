module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define('message',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            actor: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );

    Message.associate = (models) => {
        Message.belongsTo(models.session)
    };

    return Message;

};