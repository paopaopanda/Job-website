const { DataTypes } = require("sequelize");
const db = require("../db_connect");

const Cv = db.define(
  "Cv",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Fk：
    owner: {
      type: DataTypes.INTEGER,

      references: {
        // 这是对另一个模型的参考
        model: "users",
        key: "id",
      },
    },
  },
  {
    // Other model options go here
    tableName: "cvs",
    timestamps: true,
  }
);
Cv.belongsTo(db.models.User, { foreignKey: "owner" });
console.log("Cvs: ", Cv === db.models.Cv); // true

module.exports = Cv;
