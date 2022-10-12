const User = require('../models/user');
let redirectUrl;

module.exports.goToEditUser = async (req, res) => {
  res.render('users/edit');
}

module.exports.editUser = async (req, res, next) => {
  console.log('회원 정보 수정 함수 실행');
  res.redirect('/');
}

module.exports.goToMyReservations = async (req, res) => {
  let count = 1;
  const { user } = req;
  const { reservations } = await user.populate('reservations');
  res.render('users/reservations', { reservations, count });
}

module.exports.goToRegister = (req, res) => {
  res.render('users/register');
}

module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) { return next(err); }
      req.flash('success', "가입 완료!");
      res.redirect('/');
    })
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
}

module.exports.goToLogin = (req, res) => {
  redirectUrl = req.session.returnTo || '/';
  res.render('users/login');
}

module.exports.login = (req, res) => {
  res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
}