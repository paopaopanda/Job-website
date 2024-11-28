const logoutController = async (req, res) => {
  const data = {
    isLogin: false,
    isCompany: false,
  };
  // console.log("hiiii ", req.session);
  if (!req.session.isLogin) {
    return res.send(JSON.stringify(data));
  }
  data.isLogin = true;

  if (req.session.isCompany == true) {
    data.isCompany = true;
  }

  // console.log(req.session.User);
  res.send(JSON.stringify(data));
  // res.send(req.session);
};

module.exports = logoutController;
