const Reservation = require('../models/reservation');
const Wheel = require('../models/wheel');
const User = require('../models/user');

module.exports.goToRegisterWheel = (req, res) => {
  res.render('wheels/register');
}

module.exports.registerWheel = async (req, res) => {
  const wheel = new Wheel(req.body.wheel);
  wheel.image = req.file.path;
  await wheel.save();
  res.redirect(`/wheels/${wheel._id}`);
}

module.exports.goToReservationList = async (req, res) => {
  req.session.returnTo = req.originalUrl;
  let count = 1;
  const reservations = await Reservation.find({});
  res.render('reservation/list', { reservations, count });
}

module.exports.deleteReservation = async (req, res) => {
  const { _id } = req.user;
  const { reservationId } = req.params;
  const { originalUrl } = req;
  console.log(originalUrl);
  const redirectUrl = originalUrl.replace(`/${reservationId}?_method=DELETE`, '');
  console.log(redirectUrl);
  await User.findByIdAndUpdate(_id, { $pull: { reservations: reservationId } });
  await Reservation.findByIdAndDelete(reservationId);
  res.redirect(redirectUrl);
}


