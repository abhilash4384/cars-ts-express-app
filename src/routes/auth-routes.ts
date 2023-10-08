import { Router } from 'express';
import {
  addCar,
  deleteCar,
  deleteCarPic,
  deleteCars,
  getCarsByUser,
  updateCar,
  uplodaCarPics,
} from '../controllers/car-controller';
import multerImageStorageMiddleware from '../middleware/image-upload';
import validationHandler from '../middleware/validation';
import { requestAddUpdateCarSchema } from '../validation/car-validations';

const AuthRoutes = Router();

AuthRoutes.get('/user/cars', getCarsByUser);
AuthRoutes.post('/car', validationHandler(requestAddUpdateCarSchema), addCar); //addcarschema
AuthRoutes.put(
  '/car/:carId',
  validationHandler(requestAddUpdateCarSchema),
  updateCar
); //updatecarschema
AuthRoutes.delete('/car/:carId', deleteCar);
AuthRoutes.delete('/cars', deleteCars);
AuthRoutes.patch(
  '/car/:carId',
  multerImageStorageMiddleware.array('car_pics'),
  uplodaCarPics
);

AuthRoutes.delete('/car/pic/:carId/:picName', deleteCarPic);

export default AuthRoutes;
