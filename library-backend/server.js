import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import jwt from 'jsonwebtoken'

import resolvers from './resolvers.js'
import typeDefs from './schema.js'
import User from './models/user.js'

const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith('Bearer ')) {
    return null
  }
 
  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
  return User.findById(decodedToken.id)
}

const startServer = (port) => {
    const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
  listen: { port },
  context: async ({ req }) => {
    const auth = req.headers.authorization
    const currentUser = await getUserFromAuthHeader(auth)
    return { currentUser }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
}

export default startServer