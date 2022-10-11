if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const adminID = process.env.ADMIN_ID;

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', '로그인 후 이용 가능한 서비스입니다');
    return res.redirect('/login');
  }
  next();
}

module.exports.isAdmin = (req, res, next) => {
  if (!(req.user._id == adminID)) {
    req.flash('error', '관리자 권한이 필요한 서비스입니다');
    return res.redirect('/');
  }
  next();
}
