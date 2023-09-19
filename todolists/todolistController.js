import TodolistService from './todolistService.js'

class TodolistController {
  async create(req, res, next) {
    try {
      const todolist = await TodolistService.create(req.body, req.userId)
      res.json(todolist)
    } catch (err) {
      next(err)
    }
  }

  async getAll(req, res, next) {
    try {
      const todolists = await TodolistService.getAll(req.userId)
      res.json(todolists)
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    try {
      const todolist = await TodolistService.delete(req.params.id)
      if (!todolist) {
        return res.status(404).json({ message: 'Todolist not found' })
      }
      return res.json(todolist)
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    try {
      const updatedTodolist = await TodolistService.update(req.params.id, req.body)
      return res.json(updatedTodolist)
    } catch (err) {
      next(err)
    }
  }

  async addTask(req, res, next) {
    try {
      const updatedTodolist = await TodolistService.createTask(req.params.todolistsId, req.body)
      return res.json(updatedTodolist)
    } catch (err) {
      next(err)
    }
  }

  async updateTask(req, res, next) {
    try {
      const updatedTodolist = await TodolistService.updateTask(req.params.todolistsId, req.params.id, req.body)
      return res.json(updatedTodolist)
    } catch (err) {
      next(err)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const updatedTodolist = await TodolistService.deleteTask(req.params.todolistsId, req.params.id)
      return res.json(updatedTodolist)
    } catch (err) {
      next(err)
    }
  }
}

export default new TodolistController()
