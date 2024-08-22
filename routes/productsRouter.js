import express from 'express';
import { getProducts, getProductById, getProductByCategory, getProductByPriceRange, createNewProduct } from '../controllers/productController.js';

const productsRouter = express.Router()
productsRouter.get('/', getProducts)
productsRouter.get('/:id', getProductById)
productsRouter.get('/category', getProductByCategory)
productsRouter.get('/priceRange', getProductByPriceRange)
productsRouter.post('/', createNewProduct)

export { productsRouter }
