import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import SetBirthyear from './components/SetBirthyear'
import Recommendations from './components/Recommendations'
import { gql } from '@apollo/client'
import Login from './components/Login'
import { useApolloClient, useQuery } from '@apollo/client/react'

const App = () => {

  const [page, setPage] = useState('authors')
  const [user, setUser] = useState('')
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const ME = gql`
    query {
        me{
          User
        }
    }
  `
  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

      <Authors show={page === 'authors'}/>

      <Books show={page === 'books'}/>

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} setError={notify} setPage={setPage}/>
    </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={onLogout}>logout</button>
      </div>

      <Authors show={page === 'authors'} token={token}/>

      <Books show={page === 'books'}/>

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'}/>
    </div>
  )
}

export default App
