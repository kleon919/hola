module.exports = (sequelize, DataTypes) => {

    const Dialog = sequelize.define('dialog',
        {
            answer: DataTypes.STRING
        },
        {
            freezeTableName: true,
        }
    );

    Dialog.associate = (models) => {
        models.question.belongsToMany(models.ticket, {
            as: 'Quest',
            through: 'dialog',
            foreignKey: 'questionId',
            otherKey: 'ticketId'
        })

        models.ticket.belongsToMany(models.question, {
            as: 'Task',
            through: 'dialog',
            foreignKey: 'ticketId',
            otherKey: 'questionId'
        })
    };

    return Dialog;

};