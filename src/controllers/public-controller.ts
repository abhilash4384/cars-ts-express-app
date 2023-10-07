import { Request, Response } from 'express';
import { createNewUser, getUserDetailsByEmail } from '../services/auth-service';
import {
  getAllCars,
  getCarAndUserDetailsByCarId,
} from '../services/car-service';
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
  const userDetails: any = await getUserDetailsByEmail(email);
  if (!userDetails) {
    return res
      .status(401)
      .json(responseHandler(null, false, 'Login Credentials are invalid.'));
  }
  const isPasswordCorrect = await userDetails.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json(responseHandler(null, false, 'Password is invalid.'));
  }

  const userObj = {
    user_id: userDetails._id,
    first_name: userDetails.first_name,
    last_name: userDetails.last_name,
    email: userDetails.email,
    role: userDetails.role,
    full_name: userDetails.fullName(),
  };
  const token = await generateToken(userObj);
  res.status(200).json(responseHandler(token));
};

export const getCars = async (_: Request, res: Response) => {
  // get all cars
  const cars = await getAllCars();
  res.status(200).json(responseHandler(cars));
};

export const getCar = async ({ params }: Request, res: Response) => {
  // get a single car
  const carDetails = await getCarAndUserDetailsByCarId(params.carId);
  res.status(200).json(responseHandler(carDetails));
};
