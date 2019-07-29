module.exports = (sequelize, DataTypes) => {

    const Ticket = sequelize.define('ticket', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: DataTypes.STRING,
            category: DataTypes.STRING,
            content: {
                type: DataTypes.TEXT,
                // allowNull: false
            },
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