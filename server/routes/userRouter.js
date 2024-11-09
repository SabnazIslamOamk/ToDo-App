import { pool } from '../helpers/db.js'
import { Router } from 'express'
import { hash, compare } from 'bcrypt'
import { postRegistration, postLogin } from '../controllers/userController.js'

const userRouter = Router()

userRouter.post('/register', postRegistration)

userRouter.post('/login', postLogin)


export default userRouter