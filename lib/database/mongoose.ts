// import mongoose, { Mongoose } from 'mongoose';

// const MONGODB_URL = process.env.MONGODB_URL;

// interface MongooseConnection {
//   conn: Mongoose | null;
//   promise: Promise<Mongoose> | null;
// }

// let cached: MongooseConnection = (global as any).mongoose

// if (!cached) {
//   cached = (global as any).mongoose = {
//     conn: null,
//     promise: null,
//   }
// }

// export const connectToDatabase = async () => {
//   if (cached.conn) return cached.conn;

//    if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

//    cached.promise =
//       cached.promise ||
//    mongoose.connect(MONGODB_URL, {
//       dbName: 'prefix',
//       bufferCommands:false
//    })

//    cached.conn = await cached.promise;

//    return cached.conn;

// };

import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the NodeJS global type to include a custom mongoose property.
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection;
}

// Initialize the cached variable in the global scope.
const cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null,
};

global.mongoose = cached;

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'prefix',
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
