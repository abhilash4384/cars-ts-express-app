import { Router } from 'express';
import {
  createUser,
  getCar,
  getCars,
  getUser,
} from '../controllers/public-controller';
import validationHandler from '../middleware/validation';
import {
  requestLoginSchema,
  requestRegistrationSchema,
} from '../validation/auth-validations';

const PublicRoutes = Router();

PublicRoutes.post(
  '/register',
  validationHandler(requestRegistrationSchema),
  createUser
);
PublicRoutes.post('/login', validationHandler(requestLoginSchema), getUser);
PublicRoutes.get('/cars', getCars);
PublicRoutes.get('/cars/:carId', getCar);

export default PublicRoutes;
