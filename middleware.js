if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const { wheelSchema, reservationSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', '로그인 후 이용 가능한 서비스입니다');
    return res.redirect('/login');
  }
  next();
}

const adminID = process.env.ADMIN_ID;

module.exports.isAdmin = (req, res, next) => {
  if (!(req.user && req.user._id == adminID)) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', '관리자 권한이 필요한 서비스입니다');
    return res.redirect('/login');
  }
  next();
}

module.exports.validateWheel = (req, res, next) => {
  const { error } = wheelSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}

module.exports.validateReservation = (req, res, next) => {
  const { error } = reservationSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}