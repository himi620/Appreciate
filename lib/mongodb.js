import mongoose from 'mongoose';
const MONGODB_URI = 'mongodb+srv://Himanshu:admin@cluster0.ys1qaxp.mongodb.net/project';
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function dbConnect() {
  try{
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  console.log("DB connection successfull");
  return cached.conn;
}catch(err){
  console.log(err);
}
}

export default dbConnect;