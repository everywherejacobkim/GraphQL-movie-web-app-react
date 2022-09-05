import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { AiFillStar } from 'react-icons/ai';

const ALL_MOVIES = gql`
    query getMovies {
        allMovies {
          id
          title_english
          medium_cover_image
          genres
          year
          rating
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
  background-image: linear-gradient(to bottom, #270d67, #3e1b82, #562a9e, #6e39ba, #8849d7, #8d4adf, #934be8, #984cf0, #893de6, #792edc, #681dd2, #5605c8);  
`; 

const Header = styled.header`
  height: 40vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;

`;

const TitleHighlight = styled.h1`
  background-color: #f5bd1f;
  border-radius: 12px;
  margin-right: 3%;
  padding: 7px 10px;
  color: #372b2b;
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
  margin-bottom: 20%;
  position: relative;
`;

const PosterBg = styled.div`
  background-image: url(${(props) => props.background});
  height: 100%;
  width: 100%;
  background-size: cover;
  border-radius: 10px;
`;

const MovieTitle = styled.div`
  color: #f8f9fa;
  font-size: 16px;
  margin-top: 5%;
  margin-left: 1%;
`;

const MovieGenre = styled.div`
  color: #ece4db;
  font-size: 12px;
  margin-top: 3%;
  margin-left: 2%;
`;

const MovieRating = styled.div`
  color: #14213d;
  font-size: 11px;
  background: #f5bd1f;
  width: 15%;
  border-radius: 5px;
  padding: 2% 1.2%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 1.2%;
  left: 80%;
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
        <Title>
          <TitleHighlight>Popular</TitleHighlight>
          <h1>Movies</h1>
        </Title>
      </Header>
      <MoviesGrid>
        {data.allMovies.map(movie =>
          <PosterContainer key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
                <PosterBg background={movie.medium_cover_image} alt={movie.title}></PosterBg> 
            </Link>
            <MovieTitle>{movie.title_english}</MovieTitle>
            <MovieGenre>{movie.genres[0]}, {movie.year}</MovieGenre>
            <MovieRating><AiFillStar />{movie.rating}</MovieRating>
          </PosterContainer>
        )}
        </MoviesGrid>
    </Container>
  )
}

export default Movies