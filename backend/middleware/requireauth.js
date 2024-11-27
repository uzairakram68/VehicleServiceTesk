const jwt = require("jsonwebtoken");
const userModal = require("../schema/loginSchema");
const { dto } = require("../utility/uility");

const requireAuth = async (req, res, next) => {
  //------- verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await userModal.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    response.json(dto(401, {}, "Request is not Authorized"));
  }
};

module.exports = requireAuth;
