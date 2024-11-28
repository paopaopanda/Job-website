// const job = {
//   id: row.id,
//   title: row.title,
//   type: row.type,
//   description: row.description,
//   location: row.location,
//   salary: row.salary,
//   company: {
//     name: row.company_name,
//     description: row.company_description,
//     contactEmail: row.company_contactEmail,
//     contactPhone: row.company_contactPhone,
//   },
// };

const { DataTypes } = require("sequelize");
const db = require("../db_connect");

const Job = db.define(
  "Job",
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // Fk：
    belong_to: {
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
    tableName: "jobs",
    timestamps: true,
  }
);

Job.belongsTo(db.models.User, { foreignKey: "modify_employee" });

console.log("Jobs: ", Job === db.models.Job); // true

module.exports = Job;
