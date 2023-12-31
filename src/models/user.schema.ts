import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { EMAIL_VALIDATOR_ZOD_SCHEMA } from '../utils/contant';
const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Fist name is a required prop'],
      minlength: 3,
      maxlength: 15,
    },
    last_name: {
      type: String,
      required: [true, 'Second name is a required prop'],
      minlength: 3,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (emailValue: string) =>
          EMAIL_VALIDATOR_ZOD_SCHEMA.safeParse(emailValue).success,
        message: 'Please enter a valid email!',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User',
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 *  way 1 to add method on the schema
 */
UserSchema.methods.fullName = function fullName(): string {
  return `${this.first_name} ${this.last_name}`;
};

/**
 * way 2 to add the methods on the schema
 */

UserSchema.method('comparePassword', async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.password);
});

const User = mongoose.model('User', UserSchema);
export default User;
