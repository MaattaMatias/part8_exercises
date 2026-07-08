import { gql } from '@apollo/client'
import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
const Books = (props) => {
  if (!props.show) {
    return null
  }

  const ALL_BOOKS = gql`
  query allBooks($author:String, $genre:String){
      allBooks(author: $author, genre: $genre){
        title
        author {
          name
          bookCount
          born
          id
        }
        published
        genres
        id
      }
  }
`
  const [genre, setGenre] = useState('allGenres')

  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000})

  if(books.loading){
    return <div>loading...</div>
  }
  const booksToShow = genre === 'allGenres' 
  ? books.data.allBooks 
  : books.data.allBooks.filter(b=> b.genres.includes(genre))
  console.log(booksToShow)

  return (
    <div>
      <h2>books</h2>
      <h3>filter by genre: {genre}</h3>
      <button onClick={() => setGenre('fantasy')}>fantasy</button>
      <button onClick={() => setGenre('horror')}>horror</button>
      <button onClick={() => setGenre('mystery')}>mystery</button>
      <button onClick={() => setGenre('allGenres')}>all genres</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
