import { Router } from 'express';
import {
  addCar,
  deleteCar,
  deleteCars,
  getCar,
  getCars,
  updateCar,
} from '../controllers/cars-controller';

const authRoutes = Router();

authRoutes.get('/cars', getCars);
authRoutes.get('/car/:carId', getCar);
authRoutes.post('/car/:carId', addCar);
authRoutes.patch('/car/:carId', updateCar);
authRoutes.delete('/car/:carId', deleteCar);
authRoutes.delete('/cars', deleteCars);

export default authRoutes;
