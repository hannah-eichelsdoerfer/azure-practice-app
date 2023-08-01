import mongoose from 'mongoose';

const connectMongoDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('No MONGODB_URI provided');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB successfully connected 🎉');
  } catch (error) {
    throw new Error('MongoDB connection failed');
  }
};

export default connectMongoDB;

// const URI = process.env.MONGODB_URI;
// const options = {};

// if (!URI) {
//   throw new Error('Please add your Mongo URI to .env.local');
// }
// let client = new MongoClient(URI, options);
// let clientPromise;

// if (process.env.NODE_ENV !== 'production') {
//   if (!global._mongoClientPromise) {
//     global._mongoClientPromise = client.connect();
//   }

//   clientPromise = global._mongoClientPromise;
// } else {
//   clientPromise = client.connect();
// }

// export { clientPromise };

// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from 'mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
// export default clientPromise;
export { clientPromise };
