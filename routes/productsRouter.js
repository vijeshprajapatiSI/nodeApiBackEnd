import express from 'express';
import { getProducts, getProductById, getProductByCategory, getProductsByPriceRange, createNewProduct, updateProductStarRating, deleteProductById } from '../controllers/productController.js';

const productsRouter = express.Router()
productsRouter.get('/', getProducts)
productsRouter.get('/id/:id', getProductById)
productsRouter.get('/category', getProductByCategory)
productsRouter.get('/priceRange', getProductsByPriceRange)
productsRouter.post('/', createNewProduct)
productsRouter.put('/:id', updateProductStarRating)
productsRouter.delete('/:id',deleteProductById);

export { productsRouter }
