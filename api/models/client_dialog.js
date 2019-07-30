module.exports = (sequelize, DataTypes) => {

    const ClientDialog = sequelize.define('client_dialog',
        {
            answer: DataTypes.STRING
        },
        {
            freezeTableName: true,
        }
    );

    ClientDialog.associate = (models) => {
        models.question.belongsToMany(models.user, {
            as: 'Dialogs',
            through: 'client_dialog',
            foreignKey: 'questionId',
            otherKey: 'userId'
        });

        models.user.belongsToMany(models.question, {
            as: 'Clients',
            through: 'client_dialog',
            foreignKey: 'userId',
            otherKey: 'questionId'
        });
    };

    return ClientDialog;

};