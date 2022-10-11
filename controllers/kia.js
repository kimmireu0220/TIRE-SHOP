const Wheel = require('../models/wheel');
const wheelsPerPage = require('../app');

module.exports.index = async (req, res, next) => {
  const category = 'kia';
  const allWheels = await Wheel.find({ category: '기아' });
  const wheels = [];
  if (req.query.page == undefined || req.query.page == 1) {
    for (let i = 0; i < wheelsPerPage; i++) {
      wheels.push(allWheels[i]);
    }
  } else if (req.query.page == 2) {
    for (let i = wheelsPerPage; i < wheelsPerPage * 2; i++) {
      wheels.push(allWheels[i]);
    }
  } else if (req.query.page == 3) {
    for (let i = wheelsPerPage * 2; i < allWheels.length; i++) {
      wheels.push(allWheels[i]);
    }
  }
  res.render('wheels/kia', { wheels, category });
}