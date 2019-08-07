module.exports = (sequelize, DataTypes) => {

    const Ticket = sequelize.define('ticket',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: DataTypes.STRING,
            content: DataTypes.TEXT
        },
        {
            freezeTableName: true,
        }
    );

    Ticket.associate = (models) => {
        Ticket.belongsTo(models.user);
        Ticket.belongsTo(models.category);
    };

    return Ticket;

};