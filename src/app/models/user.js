module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        email: DataTypes.STRING,
        confirmed: DataTypes.BOOLEAN,
        password: DataTypes.STRING
    });

    return User
}