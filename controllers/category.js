const Wheel = require('../models/wheel');
const wheelsPerPage = require('../app');

async function setIndex(companyKR, companyEN, page, res) {
  const allWheels = await Wheel.find({ category: companyKR });
  const wheels = [];
  if (page == undefined || page == 1) {
    for (let i = 0; i < wheelsPerPage; i++) {
      wheels.push(allWheels[i]);
    }
  } else if (page == 2) {
    for (let i = wheelsPerPage; i < wheelsPerPage * 2; i++) {
      wheels.push(allWheels[i]);
    }
  } else if (page == 3) {
    for (let i = wheelsPerPage * 2; i < allWheels.length; i++) {
      wheels.push(allWheels[i]);
    }
  }
  res.render('wheels/index', { wheels, companyKR, companyEN });
}

module.exports.hyundai = async (req, res) => {
  setIndex('현대', 'hyundai', req.query.page, res);
}

module.exports.kia = async (req, res) => {
  setIndex('기아', 'kia', req.query.page, res);;
}

module.exports.others = async (req, res) => {
  setIndex('기타 차량', 'others', req.query.page, res);
}

module.exports.bmw = async (req, res) => {
  setIndex('BMW', 'bmw', req.query.page, res);
}

module.exports.benz = async (req, res) => {
  setIndex('벤츠', 'benz', req.query.page, res);
}

module.exports.importedothers = async (req, res) => {
  setIndex('기타 수입 차량', 'importedothers', req.query.page, res);
}