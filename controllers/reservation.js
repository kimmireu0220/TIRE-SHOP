const Reservation = require('../models/reservation');

module.exports.index = async (req, res) => {
  let count = 1;
  const reservations = await Reservation.find({});
  res.render('reservation/list', { reservations, count });
}

module.exports.wheel = async (req, res, next) => {
  const { user } = req;
  const reservation = new Reservation(req.body.reservation);
  user.reservations.push(reservation);
  await reservation.save();
  await user.save();
  req.flash('success', '예약 완료!');
  res.redirect('/');
}

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Reservation.findByIdAndDelete(id);
  res.redirect('/reservations');
}