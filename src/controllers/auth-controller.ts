import { Request, Response } from 'express';
import { createNewUser, getUserDetailsByEmail } from '../services/auth-service';
import responseHandler from '../utils/response-handler';
import generateToken from '../utils/token-generator';

export const createUser = async (
  { body: { email, first_name, last_name, password } }: Request,
  res: Response
) => {
  const user = await createNewUser({ email, first_name, last_name, password });
  res.status(201).json(responseHandler(user._id));
};

export const getUser = async (
  { body: { email, password } }: Request,
  res: Response
) => {
  const userDetails: any = getUserDetailsByEmail(email);
  if (!userDetails) {
    return res
      .status(401)
      .json(responseHandler(null, false, 'Login Credentials are invalid.'));
  }
  const isPasswordCorrect = await userDetails.comparePassword(password);
  if (isPasswordCorrect) {
    return res
      .status(401)
      .json(responseHandler(null, false, 'Password is invalid.'));
  }

  delete userDetails.password;
  const token = generateToken(userDetails);
  res.status(200).json(responseHandler(token));
};
