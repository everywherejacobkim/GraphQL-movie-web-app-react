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
            large_cover_image
            isLiked @client
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
  height: 100vh;
  background-image: linear-gradient(-45deg, #d4a373, #ccd5ae);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  img{
    width: 25%;
    height: 65%;
    background-color: transparent;
    background-size: cover;
    border-radius: 10px;
  }
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

const Movie = () => {
    const { id } = useParams();
    const { data, loading, client:{cache} } = useQuery(GET_MOVIE, {
        variables: {
            movieId: id
        }
    });
    console.log(data, loading);
    if (loading) {
        return <Loading>Fetching movie...</Loading>
    }

    const onClick = () => {
        cache.writeFragment({
            id: `Movie:${id}`,
            fragment: gql`
                fragment MovieFragment on Movie {
                    isLiked 
                }
            `
        })
    }

    return (
        <Container>
            <Column>
                <Title>{data?.movie?.title}</Title>
                <Subtitle>{data?.movie?.year}</Subtitle>
                <Subtitle>
                    {data?.movie?.rating}
                    <button>{data?.movie?.isLiked?"Unlike":"Like"}</button>
                </Subtitle>
                <Description>{data?.movie?.description_full}</Description>
            </Column>
            <img src={data?.movie?.large_cover_image} alt={`${data?.movie?.title}`}></img>
        </Container>

  )
}

export default Movie