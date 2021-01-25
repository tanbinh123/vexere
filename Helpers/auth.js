const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");

const jwtSignature = config.get("jwtSignature");

// tạo hàm này thì sau này chỉ cần gửi token khi call API thôi, chứ không cần gửi username password
const auth = (roles) => async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await jwt.verify(token, jwtSignature);
    // Nếu có truyền roles thì lấy roles, còn ko truyền roles thì sẽ là tất cả role
    const allowRoles = roles || ["admin", "user"];

    const foundedUser = await User.findOne({
      _id: decoded._id,
      tokens: token,
      role: { $in: allowRoles },
    });

    if (!foundedUser)
      return res.status(401).send({ message: "You're not authorized" });

    // nếu đã Authorized xong thì tạo thêm thuộc tính mới để tiện cho sử lý dữ liệu ở hàm sau
    req.user = foundedUser;
    req.token = token;

    next();
  } catch (error) {
    // lỗi này sẽ có khi verify token người dùng trả về bị sai định dạng
    return res.status(401).send({ message: "You're not authorized" });
  }
};

const facebookAuth = () => async (accessToken, refreshToken, profile, done) => {
  try {
    const userEmail = profile.emails[0].value;
    const userAvatar = profile.photos[0].value;
    const foundedUser = await User.findOne({ email: userEmail });
    let user = foundedUser;
    if (!foundedUser) {
      const newUser = new User({
        email: userEmail,
        role: "user",
        avatar: userAvatar,
      });
      user = await newUser.save();
    }
    done(null, user);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { auth, facebookAuth };
