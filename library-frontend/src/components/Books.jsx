import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
const Books = (props) => {
  if (!props.show) {
    return null
  }

  const ALL_BOOKS = gql`
  query {
    allBooks{
      title
      author
      published
    }
  }
`

  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000})

  if(books.loading){
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
