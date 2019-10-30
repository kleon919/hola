module.exports = (sequelize, DataTypes) => {

    const Task = sequelize.define('task',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: DataTypes.STRING,
            body: DataTypes.TEXT,
            close_date: DataTypes.DATE,
            status: DataTypes.STRING
        },

        {
            freezeTableName: true,
            underscored: true
        }
    );

    Task.associate = (models) => {
        Task.belongsTo(models.session);
        Task.belongsTo(models.staff)
        Task.belongsTo(models.hotel)
    };

    return Task;

};