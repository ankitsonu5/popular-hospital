import mongoose from "mongoose";
import Speciality from "./src/models/Speciality.js";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

async function run() {
  await mongoose.connect(uri);
  const specs = await Speciality.find(
    {
      $or: [
        { name: /surgery/i },
        { name: /surgeon/i },
        { name: /gyna/i },
        { name: /gyne/i },
        { name: /obstet/i },
        { name: /physician/i },
      ],
    },
    { name: 1, slug: 1 },
  );
  console.log(JSON.stringify(specs, null, 2));
  process.exit();
}
run().catch((err) => {
  console.error(err);
  process.exit(1);
});
