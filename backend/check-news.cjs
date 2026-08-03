const { MongoClient } = require('mongodb');

const uri = "mongodb://hospitalpopular856_db_user:ieHgApCt4FLxrVyy@ac-7x14ftp-shard-00-00.9cjj9cd.mongodb.net:27017,ac-7x14ftp-shard-00-01.9cjj9cd.mongodb.net:27017,ac-7x14ftp-shard-00-02.9cjj9cd.mongodb.net:27017/popular-hospital?ssl=true&replicaSet=atlas-pgdxih-shard-0&authSource=admin&retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('popular-hospital');
    const news = await db.collection('news').find({}).toArray();
    
    console.log(`Found ${news.length} news articles.`);
    news.forEach(article => {
      console.log(`Title: ${article.title}, Image: ${article.image ? article.image : 'NO IMAGE'}`);
    });
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
