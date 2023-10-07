import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import responseHandler from '../utils/response-handler';

const validationHandler = (validationSchema: z.ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = validationSchema.parse(req.body);
      next();
    } catch (e: any) {
      console.log('Validation Error = ', e);
      const errors = e.issues.map(
        (err: any) => `${err.path[0]} ${err.message}`
      );
      res
        .status(422)
        .json(responseHandler(null, false, 'Validation failed.', errors));
    }
  };
};

export default validationHandler;
