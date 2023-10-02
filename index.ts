// followed this blog https://blog.logrocket.com/how-to-set-up-node-typescript-express/
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server healthcheck');
  res.end();
});

const PORT = process.env.PORT ?? 4001;
app.listen(PORT, () => {
  console.log(`💻Server listening on http://localhost:${PORT}`);
});
