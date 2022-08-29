import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

const ALL_MOVIES = gql`
    query getMovies {
        allMovies {
          id
          title
        }
    }
`

const Movies = () => {
  const { data, loading, error } = useQuery(ALL_MOVIES)
  console.log(data);

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>Could not fetch...</h1>
  }

  return (
    <>
      <h1>Movie List</h1>
      <ul>
        {data.allMovies.map(movie =>
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>)}
      </ul>
    </>
  )
}

export default Movies