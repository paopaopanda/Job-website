const userModel = require("../models/user.model.js");
const applyModel = require("../models/applyList.model.js");
const jobModel = require("../models/job.model.js");
const { Router } = require("express");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const router = new Router();

// for user
const readMyApplyController = async (req, res) => {
  try {
    const result = await applyModel.findAll({
      attributes: [["job_id", "id"], "status"],
      where: {
        user_id: req.session.User.id,
      },
      include: [
        {
          model: jobModel, // 關聯的 User 模型
          attributes: [
            "title",
            "type",
            "salary",
            "description",
            "available",
            "belong_to",
          ],
        },
      ],
      raw: true,
    });

    console.log("result, ", result);

    if (result.length > 0) {
      // 清理每個結果的 "Job." 前綴
      const cleanedResults = result.map((result) =>
        Object.keys(result).reduce((acc, key) => {
          if (key.startsWith("Job.")) {
            // 移除 "Job." 並將屬性展平
            acc[key.replace("Job.", "")] = result[key];
          } else {
            acc[key] = result[key];
          }
          return acc;
        }, {})
      );

      return res.send(cleanedResults);
    }

    return res.send();
  } catch (error) {
    console.log("result error: ", error);
    return res.send(JSON.stringify("db wrong"));
  }
};

// for company
const readApplyController = async (req, res) => {
  console.log("company applier");
  const id = req.params.id;

  try {
    const result = await applyModel.findAll({
      attributes: ["job_id", "status"],
      where: {
        job_id: id,
      },
      include: [
        {
          model: userModel, // 關聯的 User 模型
          attributes: { exclude: ["password"] },
          as: "User",
        },
      ],
      raw: true,
      nest: true,
    });

    console.log("result, ", result);
    res.send(result);
  } catch (error) {
    console.log("result error: ", error);
    return res.send(JSON.stringify("db wrong"));
  }
};

const createApplyController = async (req, res) => {
  const newApply = req.body;
  console.log("new apply: ", newApply);
  newApply.user_id = req.session.User.id;
  console.log("new Apply: ", newApply);

  try {
    await applyModel.create(newApply);
    return res.send(JSON.stringify("apply successfully"));
  } catch (error) {
    return res.status("401").send(JSON.stringify("db wrong"));
  }
};

const statusApplyController = async (req, res) => {
  const readApply = req.body;
  console.log("change status: ", readApply);

  try {
    const record = await applyModel.update(
      {
        status: "READ",
      },
      {
        where: {
          job_id: readApply.job_id,
          user_id: readApply.user_id,
        },
      }
    );
    console.log("change status: ", JSON.stringify(record));
    return res.send(record);
  } catch (error) {
    console.log("change status error: ", error);
    return res.status("401").send(JSON.stringify(error));
  }
};

module.exports = {
  createApplyController: createApplyController,
  readApplyController: readApplyController,
  readMyApplyController: readMyApplyController,
  statusApplyController: statusApplyController,
};
