import { Request, Response } from 'express';
import {
  addNewCar,
  deleteAllCarsByUserId,
  deleteCarById,
  deleteCarPicById,
  getAllCarsByUserId,
  updateCarDetails,
  uploadCarImages,
} from '../services/car-service';
import responseHandler from '../utils/response-handler';

export const getCarsByUser = async (req: Request, res: Response) => {
  // get all cars by user
  const cars = await getAllCarsByUserId(req.user?.user_id ?? '');
  res.status(200).json(responseHandler(cars));
};

export const addCar = async (req: Request, res: Response) => {
  const { _id } = await addNewCar({ ...req.body, added_by: req.user?.user_id });
  res.status(201).json(responseHandler(_id));
};

export const updateCar = async (req: Request, res: Response) => {
  const updatedCarDetails = await updateCarDetails(req.params.carId, req.body);
  res.status(200).json(responseHandler(updatedCarDetails));
};

export const deleteCar = async ({ params, user }: Request, res: Response) => {
  //delete single car
  await deleteCarById(params.carId, user?.user_id ?? '');
  res
    .status(200)
    .json(responseHandler('Car details has been successfully removed.'));
};

export const deleteCars = async ({ user }: Request, res: Response) => {
  // delete multiple car
  await deleteAllCarsByUserId(user?.user_id ?? '');
  res
    .status(200)
    .json(
      responseHandler('All the Car details has been successfully removed.')
    );
};

export const uplodaCarPics = async (req: Request, res: Response) => {
  const images = await uploadCarImages(req);
  res.status(200).json(responseHandler(images));
};

export const deleteCarPic = async (
  { params, user }: Request,
  res: Response
) => {
  //delete single car
  await deleteCarPicById(params.carId, params.picName, user?.user_id ?? '');
  res.status(200).json(responseHandler('Car Image deleted.'));
};
