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
  const [genre, setGenre] = useState('all')
  let booksToShow
  let parameter
  if(genre == 'all'){
    parameter = ''
  } else {
    parameter = genre
  }
  const books = useQuery(ALL_BOOKS, {
    variables: {
      genre: parameter
    },
    pollInterval: 2000})

  if(books.loading){
    return <div>loading...</div>
  }
  booksToShow = books.data.allBooks
  
  const genres = booksToShow.reduce((accum, book) => {
    book.genres.forEach(genre => {
      if(!accum.includes(genre)){
        accum.push(genre)
      }
    })
    return accum
  }, [])
  

  return (
    <div>
      <h2>books</h2>
      <h3>in genre {genre}</h3>
      {genres.map((g) => (
        <button onClick={() => setGenre(g) && books.refetch()}>{g}</button>
      ))}
      <button onClick={() => setGenre('all')}>all genres</button>
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
