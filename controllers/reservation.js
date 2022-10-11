const Reservation = require('../models/reservation');

module.exports.list = async (req, res) => {
  let count = 1;
  const reservations = await Reservation.find({});
  res.render('reservation/list', { reservations, count });
}

module.exports.wheel = async (req, res, next) => {
  const reservation = new Reservation(req.body.reservation);
  await reservation.save();
  req.flash('success', '예약 완료!');
  res.redirect('/');
}

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Reservation.findByIdAndDelete(id);
  res.redirect('/reservations');
}