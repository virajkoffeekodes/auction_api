const getJwtToken = require("../JWT/getjwtToken");

const cookieToken = (user, resp) => {
  const token = getJwtToken(user.id);
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  user.password = undefined;

  // resp.cookie("token", token, options).status(200).json({
  resp.json({
    st: true,
    token,
    user,
    msg: "user got logged in",
  });
};
module.exports = cookieToken;
