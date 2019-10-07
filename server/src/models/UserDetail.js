module.exports = (Sequelize, DataTypes) => {
  const UserDetail = Sequelize.define('UserDetail', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    username: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.STRING
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING, allowNull: true
    },
    address: {
      type: DataTypes.STRING, allowNull: true
    },
    gender: {
      type: DataTypes.STRING, allowNull: true
    }
  })
  return UserDetail
}