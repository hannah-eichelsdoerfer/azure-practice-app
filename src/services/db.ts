import mongoose from "mongoose";

const connect = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("No MONGODB_URI provided");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB successfully connected 🎉");
  } catch (error) {
    throw new Error("MongoDB connection failed");
  }
};

export default connect;
