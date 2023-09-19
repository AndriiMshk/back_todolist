import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/router.js'
import { errorHandler } from './utils/errorHandler.js'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

dotenv.config()

const app = express()

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'Todo API Documentation',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 5000}` },
    ],
  },
  apis: ['./routes/router.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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

