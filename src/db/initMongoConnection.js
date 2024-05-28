import mongoose from 'mongoose';
import { env } from '../utils/env.js';
import { ENV_VARS } from '../constants/constants.js';

export const initMongoConnection = async () => {
  const connectionLink = mongodb+srv://korolevavea:<password>@students.jxprxzq.mongodb.net/?retryWrites=true&w=majority&appName=Students};
  try {
    await mongoose.connect(connectionLink);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};