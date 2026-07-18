import { useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'

const LOGIN = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(username: $username, password: $password) {
      value
    }
  }
`


const Login = ({show, setToken, setPage}) => {

    if (!show) {
    return null
  }
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [ login ] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      setPage('authors')
      console.log('login completed...')
    },
    onError: () => {
      setError('login failed')
    }
  })


  const submit = async (event) => {
    event.preventDefault()

    console.log('login...')
    login({ variables: { username: username, password: password } })
    setUsername('')
    setPassword('')
  }
  if(error != ''){
    return(
      <div>
        {error}
      </div>
    )
  }
  return (
    <div>
      <div>
      </div>
      <form onSubmit={submit}>
        <div>
          <label>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
