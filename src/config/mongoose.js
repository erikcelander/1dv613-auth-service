/**
 * Moongose config.
 *
 * @author Erik Kroon Celander <ek223ur@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

/**
 * Establishes a connection to a database.
 *
 * @returns {Promise} Resolves to this if connection succeeded.
 */
export const connectDB = async () => {
  const { connection } = mongoose

  // Bind connection to events (to get notifications).
  connection.on('connected', () => console.log('Mongoose is connected'))
  connection.on('error', (err) => console.error(`Mongoose connection error occurred: ${err}`))
  connection.on('disconnected', () => console.log('Mongoose is disconnected'))

  // If the Node.js process ends, close the connection.
  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('Mongoose disconnected due to application termination')
      process.exit(0)
    })
  })

  // Connect to the server.
  return mongoose.connect(process.env.DB_CONNECTION_STRING)
}
