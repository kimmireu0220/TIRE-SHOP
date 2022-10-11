const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/tireShop');
  console.log("Mongo connection open");
}

main().catch(err => console.log(err));




