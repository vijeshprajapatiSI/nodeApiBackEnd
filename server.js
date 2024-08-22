import express from 'express';
import homeRouter from './routes/homeRouter.js';
import { productsRouter } from './routes/productsRouter.js';
import { getErrorStatus } from './controllers/404ErrorController.js';

const app = express();
const port=5000;

app.use(express.json());

app.use('/', homeRouter);
app.use('/products', productsRouter);
app.get('*',getErrorStatus);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});