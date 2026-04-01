const mongoose = require("mongoose");
require("./src/models/Designation.js");
const Doctor = require("./src/models/Doctor.js").default;

const uri =
  "mongodb+srv://hospitalpopular856_db_user:ieHgApCt4FLxrVyy@cluster0.9cjj9cd.mongodb.net/popular-hospital";

async function check() {
  await mongoose.connect(uri);
  const docs = await Doctor.find({}).limit(5).populate("designation");
  console.log(JSON.stringify(docs, null, 2));
  process.exit();
}
check();
