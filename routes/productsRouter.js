import express from 'express';
import { getProducts, getProductById, getProductByCategory, getProductByPriceRange } from '../controllers/productController.js';

const productsRouter = express.Router()
productsRouter.get('/', getProducts)
productsRouter.get('/:id', getProductById)
productsRouter.get('/category', getProductByCategory)
productsRouter.get('/priceRange', getProductByPriceRange)

export { productsRouter }
