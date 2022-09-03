import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const ALL_MOVIES = gql`
    query getMovies {
        allMovies {
          id
          title
          medium_cover_image
        }
    }
`

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fefae0;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #52796f, #ccd5ae);
  height: 40vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

const PosterContainer = styled.div`
  height: 400px;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.36), 0 3px 6px rgba(0, 0, 0, 0.32);
  background-color: transparent;
`;

const PosterBg = styled.div`
  background-image: url(${(props) => props.background});
  height: 100%;
  width: 100%;
  background-size: cover;
  border-radius: 10px;
`;


const Movies = () => {
  const { data, loading, error } = useQuery(ALL_MOVIES)
  console.log(data);

  if (loading) {
    return <Loading>Loading...</Loading>
  }
  if (error) {
    return <Loading>Could not fetch...</Loading>
  }

  return (
    <Container>
      <Header>
        <Title>Movie List</Title>
      </Header>
      <MoviesGrid>
        {data.allMovies.map(movie =>
          <PosterContainer key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
                <PosterBg background={movie.medium_cover_image} alt={movie.title}></PosterBg> 
            </Link>
          </PosterContainer>)}
        </MoviesGrid>
    </Container>
  )
}

export default Movies