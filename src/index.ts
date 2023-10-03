// followed this blog https://blog.logrocket.com/how-to-set-up-node-typescript-express/
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
//this is a necessary comment as we want the env config to be setup first
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import path from 'path';
import getDb from './db/db';
import errorLogger from './middleware/error-logger';
import authRoutes from './routes/auth-routes';
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(
  '/pics/',
  express.static(path.join(__dirname, process.env.PICS_DIR ?? ''))
);
app.use('/auth', authRoutes);

app.get('/', async (req, res) => {
  const db = getDb();
  console.log(db);
  const collection = await db?.collection('test');
  console.log(collection);
  const result = await collection?.find({}).limit(20).toArray();
  console.log(result);
  res.status(200).json({
    isSuccess: true,
    data: result,
    message: 'Express - TypeScript Server healthcheck',
  });
});

app.use((_, res) => {
  res.status(404).json({
    isSuccess: false,
    data: null,
    message: 'Resource not found!',
  });
});

app.use(errorLogger);

const PORT = process.env.PORT ?? 4001;
app.listen(PORT, () => {
  console.log(`💻Server listening on http://localhost:${PORT}`);
});
