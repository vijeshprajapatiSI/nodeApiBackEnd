import express from 'express';
import { getProducts, getProductById, getProductByCategory } from '../controllers/productController.js';

const productsRouter = express.Router()
productsRouter.get('/', getProducts)
productsRouter.get('/:id', getProductById)
productsRouter.get('/category', getProductByCategory)

export { productsRouter }
