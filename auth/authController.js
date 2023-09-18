import jwt from 'jsonwebtoken'
import UserModel from './userModel.js'

class AuthController {
  async register(req, res, next) {
    try {
      const user = new UserModel(req.body)
      await user.save()
      res.status(201).json({ message: 'User registered' })
    } catch (err) {
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body
      const user = await UserModel.findOne({ username })

      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })

      res.json({ token })
    } catch (err) {
      next(err)
    }
  }

  logout(req, res) {
    res.json({ message: 'Please delete your token. (Logout on the client-side)' })
  }
}

export default new AuthController()
