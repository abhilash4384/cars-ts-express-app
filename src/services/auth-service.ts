import User from '../models/user.schema';

export const getUserDetailsByEmail = async (email: string) => {
  const userDetails = await User.findOne({ email });

  return userDetails;
};

export const createNewUser = async (user: any) => {
  const res = await User.create(user);
  return res;
};
