module.exports = (sequelize, DataTypes) => {

    const Ticket = sequelize.define('ticket',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: DataTypes.STRING,
            category: DataTypes.STRING,
            content: DataTypes.TEXT
        },
        {
            freezeTableName: true,
        }
    );

    Ticket.associate = (models) => {
        Ticket.belongsTo(models.user);
    };

    return Ticket;

};