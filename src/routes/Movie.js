import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import styled from "styled-components";

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

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d4a373, #ccd5ae);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

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
        <Container>
            <Column>
                <Title>{data.movie.title}</Title>
                <img src={data.movie.medium_cover_image} alt="movie_image"></img>
                <Subtitle>{data.movie.year}</Subtitle>
                <Subtitle>{data.movie.rating}</Subtitle>
                <Description>{data.movie.description_full}</Description>
            </Column>
        </Container>

  )
}

export default Movie