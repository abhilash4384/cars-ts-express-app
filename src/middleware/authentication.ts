import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IJWT } from '../types/common.types';
import responseHandler from '../utils/response-handler';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;
  console.log('came in auth middleware = ', bearerToken);
  if (!bearerToken || !bearerToken.startsWith('Bearer')) {
    throw new Error('Auth token is missing.');
  }

  const token = bearerToken.split(' ')[1];
  try {
    console.log(
      'the verify token is  = ',
      jwt.verify(token, process.env.JWT_SECRET ?? '')
    );
    req.user = jwt.verify(token, process.env.JWT_SECRET ?? '') as IJWT;
    console.log('came after jwt verify');
    next();
  } catch (e) {
    console.log(e);
    res
      .status(401)
      .json(responseHandler(null, false, 'Authentication failed.'));
  }
};

export default AuthMiddleware;
