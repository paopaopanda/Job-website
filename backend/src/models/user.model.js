const { DataTypes } = require("sequelize");
const db = require("../db_connect.js");

const User = db.define(
  "User",
  {
    // Model attributes are defined here
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_company: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: "users",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["account"], // 明確設定索引
      },
    ],
  }
);

module.exports = User;
