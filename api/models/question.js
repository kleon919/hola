module.exports = (sequelize, DataTypes) => {

    const Question = sequelize.define('question',
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
        }
    );

    // Question.associate = (models) => {
    //     Question.belongsToMany(models.user, {
    //         as: 'Dialogs',
    //         through: 'client_dialog',
    //         foreignKey: 'questionId',
    //         otherKey: 'userId'
    //     });
    // };

    return Question;

};