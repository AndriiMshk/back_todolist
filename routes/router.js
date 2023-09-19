import { Router } from 'express'
import todolistController from '../todolists/todolistController.js'
import authController from '../auth/authController.js'
import { authenticate } from '../utils/authMiddleware.js'


const router = new Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Todolist:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *         tasks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               isDone:
 *                 type: boolean
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 *       400:
 *         description: Registration failed
 */
router.post('/register', authController.register)
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Login failed
 */
router.post('/login', authController.login)
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post('/logout', authController.logout)

router.use(authenticate)

/**
 * @swagger
 * /todolists:
 *   get:
 *     summary: Get all todolists for the authenticated user
 *     responses:
 *       200:
 *         description: List of todolists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todolist'
 */
router.get('/todolists', todolistController.getAll)
/**
 * @swagger
 * /todolists:
 *   post:
 *     summary: Create a new todolist
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todolist'
 *     responses:
 *       201:
 *         description: Todolist created
 *       400:
 *         description: Creation failed
 */
router.post('/todolists', todolistController.create)
/**
 * @swagger
 * /todolists/{id}:
 *   put:
 *     summary: Update an existing todolist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todolist to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todolist'
 *     responses:
 *       200:
 *         description: Todolist updated
 *       400:
 *         description: Update failed
 */
router.put('/todolists/:id', todolistController.update)
/**
 * @swagger
 * /todolists/{id}:
 *   delete:
 *     summary: Delete a todolist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todolist to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todolist deleted
 *       400:
 *         description: Deletion failed
 */
router.delete('/todolists/:id', todolistController.delete)

/**
 * @swagger
 * /{todolistsId}/tasks:
 *   post:
 *     summary: Add a task to a specific todolist
 *     parameters:
 *       - in: path
 *         name: todolistsId
 *         required: true
 *         description: ID of the todolist to add a task to
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               isDone:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Task added
 *       400:
 *         description: Adding task failed
 */
router.post('/:todolistsId/tasks', todolistController.addTask)
/**
 * @swagger
 * /{todolistsId}/tasks/{id}:
 *   put:
 *     summary: Update a specific task in a specific todolist
 *     parameters:
 *       - in: path
 *         name: todolistsId
 *         required: true
 *         description: ID of the todolist
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               isDone:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated
 *       400:
 *         description: Update failed
 */
router.put('/:todolistsId/tasks/:id', todolistController.updateTask)
/**
 * @swagger
 * /{todolistsId}/tasks/{id}:
 *   delete:
 *     summary: Delete a specific task from a specific todolist
 *     parameters:
 *       - in: path
 *         name: todolistsId
 *         required: true
 *         description: ID of the todolist
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 *       400:
 *         description: Deletion failed
 */
router.delete('/:todolistsId/tasks/:id', todolistController.deleteTask)

export default router
