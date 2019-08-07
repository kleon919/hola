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
            timestamps: false,
        }
    );

    Question.associate = (models) => {
        Question.belongsTo(models.category);
    };

    return Question;

};