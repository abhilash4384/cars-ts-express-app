import Car, { ICar } from '../models/cars.schema';

export const getAllCars = async () => {
  return await Car.find();
};

export const getAllCarsByUserId = async (user_id: string) => {
  return await Car.find({
    added_by: user_id,
  });
};

export const getCarAndUserDetailsByCarId = async (car_id: string) => {
  return await Car.findById(car_id).populate('User');
};

export const addNewCar = async (payload: ICar) => {
  return await Car.create(payload);
};

export const updateCarDetails = async (car_id: string, payload: ICar) => {
  return await Car.findByIdAndUpdate(car_id, payload);
};

export const deleteCarById = async (car_id: string, user_id: string) => {
  return await Car.findOneAndRemove({
    added_by: user_id,
    _id: car_id,
  });
};

export const deleteAllCarsByUserId = async (user_id: string) => {
  return await Car.deleteMany({
    added_by: user_id,
  });
};
