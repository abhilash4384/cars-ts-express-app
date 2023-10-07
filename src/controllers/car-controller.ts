import { Request, Response } from 'express';
import {
  addNewCar,
  deleteAllCarsByUserId,
  deleteCarById,
  getAllCarsByUserId,
  updateCarDetails,
} from '../services/car-service';
import responseHandler from '../utils/response-handler';

export const getCarsByUser = async (req: Request, res: Response) => {
  // get all cars by user
  const cars = await getAllCarsByUserId(req.user?.user_id ?? '');
  res.status(200).json(responseHandler(cars));
};

export const addCar = async (req: Request, res: Response) => {
  console.log('entered into add cars = ', req.body);
  console.log('entered into add cars user details = ', req.user);
  const { _id } = await addNewCar({ ...req.body, added_by: req.user?.user_id });
  console.log('added car id = ', _id);
  res.status(201).json(responseHandler(_id));
};

export const updateCar = async (req: Request, res: Response) => {
  const updatedCarDetails = await updateCarDetails(req.params.carId, req.body);
  res.status(200).json(responseHandler(updatedCarDetails));
};

export const deleteCar = async ({ params, user }: Request, res: Response) => {
  //delete single car
  await deleteCarById(params.carId, user?.user_id ?? '');
  // 204 is for no content
  res
    .status(204)
    .json(responseHandler('Car details has been successfully removed.'));
};

export const deleteCars = async ({ user }: Request, res: Response) => {
  // delete multiple car
  await deleteAllCarsByUserId(user?.user_id ?? '');
  res
    .status(204)
    .json(
      responseHandler('All the Car details has been successfully removed.')
    );
};
