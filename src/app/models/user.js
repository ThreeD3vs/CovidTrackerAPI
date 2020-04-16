module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        confirmed: DataTypes.BOOLEAN,
        password: DataTypes.STRING
    });

    return User;
}