module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    username: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.STRING
    }
  })
  return User
}