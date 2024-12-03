import mongoose from "mongoose";

// create mongoDB connection

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connection established`.bgMagenta.black);
  } catch (error) {
    console.log(error.message);
  }
};

// export mongoDB connection

export default mongoDBConnection;
