import mongoose from 'mongoose';

const connectToDb = () => {
  try {
    if (!process.env.DB_CONNECTION_STRING)
      throw new Error('Connection string could not be found!');
    return mongoose.connect(process.env.DB_CONNECTION_STRING);
  } catch (e) {
    console.log('Connect DB Error = ', e);
    process.exit(1);
  }
};

export default connectToDb;
