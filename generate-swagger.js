import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/router.js'],
}

const specs = swaggerJsdoc(options)
console.log(JSON.stringify(specs, null, 2))
