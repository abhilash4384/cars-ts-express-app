import { Router } from 'express';
import {
  addCar,
  deleteCar,
  deleteCars,
  getCarsByUser,
  updateCar,
} from '../controllers/car-controller';
import validationHandler from '../middleware/validation';
import { requestAddUpdateCarSchema } from '../validation/car-validations';

const AuthRoutes = Router();

AuthRoutes.get('/user/cars', getCarsByUser);
AuthRoutes.post('/car', validationHandler(requestAddUpdateCarSchema), addCar); //addcarschema
AuthRoutes.patch(
  '/car/:carId',
  validationHandler(requestAddUpdateCarSchema),
  updateCar
); //updatecarschema
AuthRoutes.delete('/car/:carId', deleteCar);
AuthRoutes.delete('/cars', deleteCars);

export default AuthRoutes;
