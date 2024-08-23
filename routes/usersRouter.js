import express from 'express'
import { registerUser, loginUser } from '../controllers/usersController.js'
import authenticateToken from '../middlewares/authMiddleware.js'

const usersRouter = express.Router()

usersRouter.post('/register', registerUser)
usersRouter.post('/login', loginUser)
usersRouter.get("/protected", authenticateToken )


export { usersRouter };