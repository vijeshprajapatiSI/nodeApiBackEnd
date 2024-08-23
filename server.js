import express from 'express';
import cors from 'cors'
import homeRouter from './routes/homeRouter.js';
import { productsRouter } from './routes/productsRouter.js';
import { usersRouter } from './routes/usersRouter.js';
import { getErrorStatus } from './controllers/404ErrorController.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port=5000;

const options = {
  origin:['http://localhost:3000','http://localhost:8080'],
  method : "GET, HEAD,PUT,PATCH,POST,DELETE"
}

app.use(express.json());
app.use(cors(options));

app.use('/', homeRouter);
app.use('/products', productsRouter);
app.use('/user', usersRouter);
app.get('*',getErrorStatus);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});