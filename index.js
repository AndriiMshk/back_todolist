import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/router.js'
import { errorHandler } from './utils/errorHandler.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use('/', router)
app.use(errorHandler)

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server started on port', process.env.PORT || 5000)
    })
  } catch (err) {
    console.error('Failed to start the application:', err.message)
  }
}

main()
