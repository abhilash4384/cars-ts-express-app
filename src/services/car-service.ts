import Car from '../models/cars.schema';

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
