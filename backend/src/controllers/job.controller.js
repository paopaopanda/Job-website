const { where } = require("sequelize");
const jobModel = require("../models/job.model.js");
const applyModel = require("../models/applyList.model.js");
const companyModel = require("../models/user.model.js");
// const companyModel = require("../models/company.model.js")
const { Op } = require("sequelize");

const createJobController = async (req, res) => {
  const job = req.body;

  if (!req.session.User) {
    console.log("session", req.session);
    res.send("log in first");
    return;
  }

  // console.log("search user:", existUser[0].dataValues);

  // 加上modify_employee
  job.modify_employee = req.session.User.id;
  job.belong_to = req.session.User.id;

  console.log("req job: ", job);
  // 檢查公司已存在的工作名稱是否與新相同
  try {
    const singleJob = await jobModel.findAll({
      where: {
        title: job.title,
        belong_to: job.belong_to,
      },
    });

    if (singleJob.length != 0) {
      return res.status("401").send("job exist");
    }
  } catch (error) {
    console.log("search-job error: ", error);
    res.send(`db wrong: ${error}`);
    return;
  }

  // 工作存進資料庫
  try {
    await jobModel.create(job);
    return res.send(JSON.stringify(job));
  } catch (error) {
    console.log("add-job error: ", error);
    res.send(JSON.stringify(`db wrong: ${error}`));
    return;
  }
};

const deleteJobController = async (req, res) => {
  const jobId = req.params.id;

  try {
    await jobModel.destroy({
      where: {
        id: jobId,
      },
    });

    res.send("delete successfully");
  } catch (error) {
    res.send(`delete db wrong ${error}`);
  }
};

const readJobController = async (req, res) => {
  const job = req.body;

  console.log("job: ", job);

  if (req.session.User && req.session.isCompany) {
    // 找尋公司所有工作
    const singleJob = await jobModel.findAll({
      where: {
        belong_to: req.session.User.id,
      },
    });

    return res.send(JSON.stringify(singleJob));
  }

  try {
    const singleJob = await jobModel.findAll();
    return res.send(JSON.stringify(singleJob));
  } catch (error) {
    console.log(JSON.stringify(`read job(user & log out) error ${error}`));
    return res.send(JSON.stringify(error));
  }
};

const readSingleJobController = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.body;

  // 找尋工作

  const singlejob = await jobModel.findOne({
    where: {
      id: jobId,
    },
  });
  const result = singlejob.toJSON();

  // 找尋公司
  const company = await companyModel.findOne({
    where: {
      id: singlejob.belong_to,
    },
  });

  if (req.session.User && !req.session.isCompany) {
    const status = await applyModel.findOne({
      where: {
        user_id: req.session.User.id,
        job_id: jobId,
      },
    });

    console.log("status", status);
    if (status) {
      result.status = status.dataValues.status;
    }
  }

  result.companyName = company.dataValues.displayName;

  console.log("res send company: ", result);

  res.send(result);
};

const updateJobController = async (req, res) => {
  const job = req.params.id;
  const updateJob = req.body;
  let modifyCol = req.body;

  modifyCol = new Map(Object.entries(modifyCol));

  const updates = {}; // 收集所有要更新的欄位

  modifyCol.forEach((val, key) => {
    updates[key] = val; // 將每個 key 和對應的 val 放入 updates
  });

  console.log("upadate ", updates);
  // 找尋要修改的公司
  const singleJob = await jobModel.findAll({
    where: {
      id: job,
    },
  });

  // 尋找公司所有工作的名字跟update的名字有沒有相同
  const jobName = await jobModel.findAll({
    attributes: ["title"],
    where: {
      belong_to: req.session.User.id,
      title: updateJob.title,
      id: {
        [Op.ne]: job,
      },
    },
  });

  // 如果更改公司名字已存在返回錯誤
  if (jobName.length != 0) {
    return res.status(500).send(JSON.stringify("Job name exsit!"));
  }

  try {
    await singleJob[0].update(updates); // 一次性執行更新
    return res.send(JSON.stringify("success!"));
  } catch (error) {
    console.log(error);
    return res.status(500).send(JSON.stringify(error));
  }
};

module.exports = {
  createJobController: createJobController,
  readJobController: readJobController,
  readSingleJobController: readSingleJobController,
  deleteJobController: deleteJobController,
  updateJobController: updateJobController,
};
