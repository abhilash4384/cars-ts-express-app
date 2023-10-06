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

export default mongoose.model('Car', CarSchema);
