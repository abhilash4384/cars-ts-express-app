// followed this blog https://blog.logrocket.com/how-to-set-up-node-typescript-express/
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
//this is a necessary comment as we want the env config to be setup first
import express, { Request, Response } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import path from 'path';
import connectToDb from './db/db';
import AuthMiddleware from './middleware/authentication';
import errorLogger from './middleware/error-logger';
import AuthRoutes from './routes/auth-routes';
import PublicRoutes from './routes/public-routes';
import { IJWT } from './types/common.types';
import responseHandler from './utils/response-handler';

declare global {
  namespace Express {
    interface Request {
      user: IJWT | undefined;
    }
  }
}
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(
  '/pics/',
  express.static(path.join(__dirname, process.env.PICS_DIR ?? ''))
);
app.use('/api/v1', PublicRoutes);
app.use('/api/v1/auth', AuthMiddleware, AuthRoutes);

app.get('/', async (req: Request, res: Response) => {
  res
    .status(200)
    .json(
      responseHandler(null, true, 'Express - TypeScript Server healthcheck')
    );
});

app.use((_: Request, res: Response) => {
  res.status(404).json(responseHandler(null, false, 'Resource not found!'));
});

app.use(errorLogger);

const start = async () => {
  try {
    console.log('Connecting to DB...');
    await connectToDb();
    console.log('DB Connection Established...');

    const PORT = process.env.PORT ?? 4001;
    app.listen(PORT, () => {
      console.log(`💻Server listening on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log('Error while starting the app = ', e);
  }
};
start();
