module.exports = (sequelize, DataTypes) => {

    const Question = sequelize.define('question',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            phrase: {
                type: DataTypes.TEXT
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            timestamps:false
        }
    );

    return Question;

};