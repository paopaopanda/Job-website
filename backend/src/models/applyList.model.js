const { DataTypes } = require("sequelize");
const db = require("../db_connect");

const ApplyList = db.define(
  "ApplyList",
  {
    // Model attributes are defined here
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Fk：
    user_id: {
      type: DataTypes.INTEGER,

      references: {
        // 这是对另一个模型的参考
        model: "users",
        key: "id",
      },
    },
    job_id: {
      type: DataTypes.INTEGER,

      references: {
        // 这是对另一个模型的参考
        model: "jobs",
        key: "id",
      },
    },
    cv_id: {
      type: DataTypes.INTEGER,

      references: {
        // 这是对另一个模型的参考
        model: "cvs",
        key: "id",
      },
    },
  },
  {
    // Other model options go here
    tableName: "ApplyLists",
    timestamps: true,
    createdAt: "apply_at",
    updatedAt: false,
  }
);
ApplyList.belongsTo(db.models.User, { foreignKey: "user_id" });
ApplyList.belongsTo(db.models.Job, { foreignKey: "job_id" });
ApplyList.belongsTo(db.models.Cv, { foreignKey: "cv_id" });
console.log("ApplyLists: ", ApplyList === db.models.ApplyList); // true

module.exports = ApplyList;
