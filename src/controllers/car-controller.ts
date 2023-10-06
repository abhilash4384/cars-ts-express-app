import { Request, Response } from 'express';
import responseHandler from '../utils/response-handler';

export const getCars = (req: Request, res: Response) => {
  // get multiple car

  res.json(responseHandler('all cars data'));
};

export const getCar = (req: Request, res: Response) => {
  // get a single car
  res.json(responseHandler('get specific car data'));
};

export const addCar = (req: Request, res: Response) => {};

export const updateCar = (req: Request, res: Response) => {};

export const deleteCar = (req: Request, res: Response) => {
  //delete single car
};

export const deleteCars = (req: Request, res: Response) => {
  // delete multiple car
};
