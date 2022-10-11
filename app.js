const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const ExpressError = require('./utils/ExpressError');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/tireShop');
  console.log("Mongo connection open");
}

main().catch(err => console.log(err));

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

module.exports = wheelsPerPage = 1;

const homeRoutes = require('./routes/home');
const registerRoutes = require('./routes/register');
const userRoutes = require('./routes/users');
const reservationRoutes = require('./routes/reservation');
const categoryRoutes = require('./routes/category');
const hyundaiRoutes = require('./routes/hyundai');
const kiaRoutes = require('./routes/kia');
const othersRoutes = require('./routes/others');
const bmwRoutes = require('./routes/bmw');
const benzRoutes = require('./routes/benz');
const importedothersRoutes = require('./routes/importedothers');

app.use('/', homeRoutes);
app.use('/', registerRoutes);
app.use('/', userRoutes);
app.use('/reservations', reservationRoutes)
app.use('/:category', categoryRoutes);
app.use('/hyundai', hyundaiRoutes);
app.use('/kia', kiaRoutes);
app.use('/others', othersRoutes);
app.use('/bmw', bmwRoutes);
app.use('/benz', benzRoutes);
app.use('/importedothers', importedothersRoutes);

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found(404)', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;;
  res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})

