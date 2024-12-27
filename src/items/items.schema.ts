import mongoose from 'mongoose';

export const ItemsSchema = new mongoose.Schema({
  name: String,
  description: String,
});