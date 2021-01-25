require("./db/connect");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const passport = require("passport");
const passportStrategy = require("passport-facebook-token");
const cors = require("cors");

// package để xây dựng đường dẫn
const path = require("path");

const tripRouter = require("./routers/trip");
const branchRouter = require("./routers/branch");
const carRouter = require("./routers/car");
const stationRouter = require("./routers/station");
const authRouter = require("./routers/auth");
const uploadRouter = require("./routers/upload");
const facebookRouter = require("./routers/facebook");

const { facebookAuth } = require("./Helpers/auth");

const app = express();
const port = process.env.PORT || config.get("port");

passport.use(
  "facebookToken",
  new passportStrategy(
    {
      clientID: "815777305642451",
      clientSecret: "959d28d48d2c2098d6008d32c05ef69f",
    },
    facebookAuth()
  )
);

// đi từ trên xuống dưới, nên nếu để func use ko có đường dẫn này ở đầu thì tất cả req đều phải đi qua middleware này
// app.use((req, res, next) => {
//   console.log("middleware chung");
//   // check authentication, role
//   // nếu chưa login

//   // nếu chưa login
//   //   if (true) {
//   //     res.send("Vui lòng đăng nhập");
//   //   } else {
//   //     next();
//   //   }
// });

/**
 * TODO
 *  .CRUD Branch
 *  .CRUD Car
 *  .CRUD Station
 *  .CRUD Trip
 *  .signup, signin, jwt, track tokens , authorization, logout ,log out all
 *  .Booking Ticket
 *  .Refactor - mvc, router,
 *  .Giới thiệu buffer - stream
 *  .Upload file - filter type,limit size, serve static file
 *  .Send email
 *  .facebook login
 *  .cors
 *  .git
 *  .deploy
 */

//closure

app.use(
  cors({
    origin: "http://localhost:5500",
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.json());

// biến thư mục images thành thư mục tĩnh (static) để có thể coi trên web
const imagesFolderPath = path.join(__dirname, "images");
app.use("/image", express.static(imagesFolderPath));

app.use(tripRouter);

app.use(branchRouter);

app.use(carRouter);

app.use(stationRouter);

app.use(authRouter);

app.use(uploadRouter);

app.use(facebookRouter);

app.listen(port, () => {
  console.log("listening...");
});
