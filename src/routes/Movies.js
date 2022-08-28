import React, { useEffect, useState } from 'react'
import { useApolloClient, gql } from '@apollo/client'

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const client = useApolloClient();
  useEffect(() => {
    client.query({
      query: gql`
        {
          allMovies {
            id
            title
          }
        }
      `,
    }).then((results) => setMovies(results.data.allMovies))
  }, [client]);
  return (
    <>
      <div>This is a list of Movies</div>
      <div>{movies.map(movie =>
        <li key={movie.id}>{movie.title}</li>
        )}</div>
    </>
  )
}

export default Movies