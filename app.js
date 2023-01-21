module.exports = wheelsPerPage = 1;

const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const ExpressError = require("./utils/ExpressError");
const mongoSanitize = require("express-mongo-sanitize");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const introduceRoutes = require("./routes/introduce");
const categoryRoutes = require("./routes/category");
const wheelRoutes = require("./routes/wheel");

const app = express();

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/tireShop");
  console.log("Mongo connection open");
}

main().catch((error) => console.log(error));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());

const sessionConfig = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", adminRoutes);
app.use("/", userRoutes);
app.use("/", introduceRoutes);
app.use("/", categoryRoutes);
app.use("/:company", wheelRoutes);

app.get("/", (req, res) => {
  req.session.returnTo = req.originalUrl;
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found(404)", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
