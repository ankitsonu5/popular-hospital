const mongoose = require('mongoose');
require('dotenv').config();

async function run() {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db;
    const res = await db.collection('doctors').updateMany(
        { slug: { $in: ['dr-a-k-kaushik', 'dr-sandesh-m-raykar', 'dr-abhishek-kumar', 'dr-deepankar-mishra'] } },
        { $set: { image_url: '' } }
    );
    console.log(res);
    process.exit(0);
}
run();
