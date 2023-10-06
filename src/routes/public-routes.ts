import { Router } from 'express';
import { createUser, getUser } from '../controllers/auth-controller';
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

export default PublicRoutes;
