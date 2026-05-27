import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import resolvers from './resolvers.js'
import typeDefs from './schema.js'

const startServer = (port) => {
    const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
}

export default startServer