import { Router } from 'express'
import todolistController from '../todolists/controller.js'

const router = new Router()

router.get('/todolists', todolistController.getAll)
router.post('/todolists', todolistController.create)
router.put('/todolists/:id', todolistController.update)
router.delete('/todolists/:id', todolistController.delete)

router.post('/:todolistsId/tasks', todolistController.addTask)
router.put('/:todolistsId/tasks/:id', todolistController.updateTask)
router.delete('/:todolistsId/tasks/:id', todolistController.deleteTask)

export default router
