import { gql } from '@apollo/client'
import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
const Recommendations = (props) => {
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
  const ME = gql`
  query{
      me{
        favoriteGenre
      }
  }
`
  const genre = useQuery(ME, {
    pollInterval: 2000})

  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000})

  if (!props.show) {
    return null
  }
  if(books.loading || genre.loading){
    return <div>loading...</div>
  }
  
  const booksToShow = books.data.allBooks.filter(b=> b.genres.includes(genre.data.me.favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <h3>Books in your favorite genre <b>{genre.data.me.favoriteGenre}</b></h3>
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

export default Recommendations
