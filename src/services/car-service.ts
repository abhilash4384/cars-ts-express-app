import { Request } from 'express';
import fs from 'fs';
import Car from '../models/cars.schema';
import { CARS_IMG_DIR } from '../utils/contant';
export const getAllCars = async () => {
  return await Car.find();
};

export const getAllCarsByUserId = async (user_id: string) => {
  return await Car.find({
    added_by: user_id,
  });
};

export const getCarAndUserDetailsByCarId = async (car_id: string) => {
  const car = await Car.findById(car_id).populate(
    'added_by',
    'first_name last_name'
  );
  console.log('and the car is = ', JSON.stringify(car));
  return car;
};

export const addNewCar = async (payload: any) => {
  return await Car.create(payload);
};

export const updateCarDetails = async (car_id: string, payload: any) => {
  return await Car.findByIdAndUpdate(car_id, payload, {
    runValidators: true,
    new: true,
  });
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

export const uploadCarImages = async (req: Request) => {
  const images =
    Array.isArray(req.files) &&
    req.files?.reduce(
      (imgStrArray: string[], img: any) => [...imgStrArray, img.filename],
      []
    );
  if (images) {
    const carDetailsToUpdate = await Car.findOne({
      _id: req.params.carId,
      added_by: req.user?.user_id,
    });

    carDetailsToUpdate?.images &&
      (carDetailsToUpdate.images = [...carDetailsToUpdate.images, ...images]);
    const response = await carDetailsToUpdate?.save();
    return response?.images;
  }
  throw new Error('Failed to save images.');
};

export const deleteCarPicById = async (
  carId: string,
  picName: string,
  userId: string
) => {
  const carDetailsToUpdate = await Car.findOne({
    _id: carId,
    added_by: userId,
  });
  if (!carDetailsToUpdate) throw new Error('Car details not found!');
  const { images } = carDetailsToUpdate;
  if (images) {
    carDetailsToUpdate.images = images.filter((pic) => pic !== picName);
    await carDetailsToUpdate?.save();
  }
  const filePath = `${CARS_IMG_DIR}/${picName}`;
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  return 'Success';
};
