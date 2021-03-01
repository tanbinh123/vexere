const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    email: String,
    phone: String,
    role: String,
    tokens: {
      type: [String],
      default: [],
    },
    avatar: { type: String, default: null },
  },
  { timestamps: true }
);

// methods chứ ko phải method
userScheme.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};

//middleware của mongoose pre() sẽ chạy trước khi sự kiện nào đó xảy ra (ở đây là trước khi save thì
//chạy hàm callback rồi sau đó mới save)
userScheme.pre("save", async function (next) {
  // nếu field password thay đổi thì hash password
  if (this.isModified("password")) {
    // hash password (8 là ổn định nhất, cao hơn vẫn được nhưng càng cao thì càng chậm)
    this.password = await bcrypt.hash(this.password, 8);
  }
  // nếu không có hàm next này thì sau khi nó hash password xong nó sẽ bị treo ngay đây luôn, không chạy tiếp
  next();
});

const User = mongoose.model("User", userScheme);

module.exports = User;
