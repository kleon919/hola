module.exports = (sequelize, DataTypes) => {

    const Ticket = sequelize.define('ticket',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            content: DataTypes.TEXT
        },
        {
            freezeTableName: true,
            underscored: true,
        }
    );

    Ticket.associate = (models) => {
        Ticket.belongsTo(models.task);
    };

    return Ticket;

};