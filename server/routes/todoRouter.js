import { pool } from '../helpers/db.js'
import { Router } from 'express'
//import { emptyRows } from '../helpers/util.js'
import { auth } from '../helpers/auth.js'
import { getTasks, postTask, deleteTask } from '../controllers/TaskController.js'

const router = Router()

router.get('/', getTasks)

router.post('/create',auth, postTask)

router.delete('/delete/:id',auth, deleteTask)

export { router as todoRouter }