const express = require("express");
const db = require("./db_connect.js");
const user = require("./models/user.model.js");

const job = require("./models/job.model.js");
const cv = require("./models/cv.model.js");
const al = require("./models/applyList.model.js");

const userRoute = require("./routes/userRoute.js");
const session = require("express-session");
const authRoute = require("./routes/authRoute.js");
const jobRoute = require("./routes/jobRouter.js");
const applyRoute = require("./routes/applyJobRoute.js");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    name: "session",
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60,
      sameSite: true,
    },
  })
);
app.use("/", userRoute);
app.use("/", authRoute);
app.use("/company", jobRoute);
app.use("/applyJob", applyRoute);

(async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");

    al.belongsTo(user, { foreignKey: "user_id" });
    al.belongsTo(job, { foreignKey: "job_id" });
    user.hasMany(al, { foreignKey: "user_id" });
    job.hasMany(al, { foreignKey: "job_id" });

    await db.sync({ alter: true });
    console.log("sync su");
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`server listen on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
