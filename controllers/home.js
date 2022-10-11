const Wheel = require('../models/wheel');

module.exports.index = async (req, res) => {
  const hyundaiWheels = await Wheel.find({ category: '현대' });
  const kiaWheels = await Wheel.find({ category: '기아' });
  const othersWheels = await Wheel.find({ category: '기타 차량' });
  const bmwWheels = await Wheel.find({ category: 'BMW' });
  const benzWheels = await Wheel.find({ category: '벤츠' });
  const importedothersWheels = await Wheel.find({ category: '기타 수입 차량' });
  res.render('home', { hyundaiWheels, kiaWheels, othersWheels, bmwWheels, benzWheels, importedothersWheels });
}

module.exports.greeting = (req, res) => {
  res.render('introduce/greeting');
}

module.exports.show = (req, res) => {
  res.render('introduce/show');
}

module.exports.direction = (req, res) => {
  res.render('introduce/direction');
}


