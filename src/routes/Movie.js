import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

const GET_MOVIE = gql`
    query getMovie($movieId: String!) {
        movie(id: $movieId) {
            id
            title
            year
            rating
            description_full
            medium_cover_image
        }
    }
`

const Movie = () => {
    const { id } = useParams();
    const { data, loading } = useQuery(GET_MOVIE, {
        variables: {
            movieId: id
        }
    });
    console.log(data, loading);
    if (loading) {
        return <h1>Fetching movie...</h1>
    }
    return (
        <>
            <h1>{data.movie.title}</h1>
            <img src={data.movie.medium_cover_image} alt="movie_image"></img>
            <div>{data.movie.year}</div>
            <div>{data.movie.rating}</div>
            <div>{data.movie.description_full}</div>
        </>

  )
}

export default Movie