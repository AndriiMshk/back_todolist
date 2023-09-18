import { Router } from 'express'
import todolistController from '../todolists/todolistController.js'
import authController from '../auth/authController.js'
import { authenticate } from '../utils/authMiddleware.js'


const router = new Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.use(authenticate)

router.get('/todolists', todolistController.getAll)
router.post('/todolists', todolistController.create)
router.put('/todolists/:id', todolistController.update)
router.delete('/todolists/:id', todolistController.delete)

router.post('/:todolistsId/tasks', todolistController.addTask)
router.put('/:todolistsId/tasks/:id', todolistController.updateTask)
router.delete('/:todolistsId/tasks/:id', todolistController.deleteTask)

export default router
