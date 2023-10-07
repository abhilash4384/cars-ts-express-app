import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  min_price: {
    type: Number,
    required: true,
    min: 300000,
  },
  max_price: {
    type: Number,
    required: true,
    min: 300000,
  },
  fuel_type: [
    {
      type: String,
      enum: ['Petrol', 'Disel', 'CNG', 'Electric'],
      required: true,
    },
  ],
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic', 'Both'],
    required: true,
  },
  body_type: {
    type: String,
    enum: ['SUV', 'Hatchback', 'Sedan'],
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  added_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Car = mongoose.model('Car', CarSchema);
export default Car;
