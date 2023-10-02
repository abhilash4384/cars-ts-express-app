import { Request, Response } from 'express';

export const getCars = (req: Request, res: Response) => {
  // get multiple car
  res.json({
    success: true,
    data: 'you will receive the cars data here',
  });
};

export const getCar = (req: Request, res: Response) => {
  // get a single car
  res.json({
    success: true,
    data: 'you will receive the cars data here',
  });
};

export const addCar = (req: Request, res: Response) => {};

export const updateCar = (req: Request, res: Response) => {};

export const deleteCar = (req: Request, res: Response) => {
  //delete single car
};

export const deleteCars = (req: Request, res: Response) => {
  // delete multiple car
};
