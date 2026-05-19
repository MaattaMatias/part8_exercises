import { useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'

const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!
    $setBornTo: Int
  ) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
    }
  }
`

const SetBirthyear = (props) => {
  const [born, setBornTo] = useState('')
  const [selectedName, setSelectedName] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)
  const authors = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  
  if(authors.loading){
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('edit author...')
    editAuthor({ variables: { name: selectedName, setBornTo: parseInt(born, 10) } })
    console.log('Selected name: ',selectedName)
    setBornTo('')
    setSelectedName('')
  }

  return (
    <div>
      <div>
        <h2>Set Birthyear</h2>
      </div>
      <form onSubmit={submit}>
        <div>
          <label>
            name
            <select
              value={selectedName}
              onChange={n => setSelectedName(n.target.value)}>
            <option value="">Choose author</option>
            {authors.data.allAuthors.map((a) => (<option key={a.name} value={a.name}>
              {a.name}
            </option>))}
            </select>
          </label>
        </div>
        <div>
          <label>
          born
          <input
            value={born}
            onChange={({ target }) => setBornTo(target.value)}
          />
          </label>
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear
