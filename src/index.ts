// followed this blog https://blog.logrocket.com/how-to-set-up-node-typescript-express/
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import authRoutes from './routes/auth-routes';

dotenv.config();
const app = express();
app.use(express.json());

console.log(path.join(__dirname, process.env.PICS_DIR ?? ''));
app.use(
  '/pics/',
  express.static(path.join(__dirname, process.env.PICS_DIR ?? ''))
);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Express - TypeScript Server healthcheck');
  res.end();
});

const PORT = process.env.PORT ?? 4001;
app.listen(PORT, () => {
  console.log(`💻Server listening on http://localhost:${PORT}`);
});
