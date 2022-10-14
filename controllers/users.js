const { connect } = require('mongoose');
const User = require('../models/user');
let redirectUrl;

module.exports.goToEdit = (req, res) => {
  res.render('users/edit');
}

module.exports.edit = async (req, res) => {
  const { user } = req;
  const { oldPassword, newPassword } = req.body;
  user.changePassword(oldPassword, newPassword, (err) => {
    if (err) {
      req.flash('error', "수정 실패!");
      res.redirect('/edit');
    } else {
      req.flash('success', "수정 완료!");
      res.redirect('/')
    }
  });
};

module.exports.goToMyReservations = async (req, res) => {
  let count = 1;
  const { user } = req;
  const { reservations } = await user.populate('reservations');
  res.render('users/reservations', { reservations, count });
}

module.exports.goToRegister = (req, res) => {
  res.render('users/register');
}

module.exports.register = async (req, res, next) => {
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
  });
  redirectUrl = req.session.returnTo || '/';
  res.redirect(redirectUrl);
}