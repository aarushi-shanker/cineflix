import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "bd9045ce";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  position:fixed;
  top:0;

  @media (max-width: 767px) {
    justify-content: center;
    width: fit-content;
  }
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;

  @media (max-width: 767px) {
    width:25%;
    padding: 5px 5px;
  }
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;

  @media (max-width: 767px) {
    width: 22px;
    height: 22px;
  }

`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;

  @media (max-width: 767px) {
    width:20px;
    height:20px;
    margin: 10px;
  }
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;

  @media (max-width: 767px) {
    width:58%;
    margin-left:5px;
    font-size: 9px;
    padding: 0;
  }

`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 150px;
  height:150px;
  margin-top:20%;
  opacity: 50%;
  
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();



  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header style={{width:"100%"}}>
        <AppName style={{
          fontSize:"30px",
          fontFamily: "sans-serif",
          justifyItems:"center",
        }}>
          <MovieImage src="/react-movie-app/movie-logo.png" />
          Cineflix
        </AppName>
        <SearchBox style={{marginRight:"20px",}}>
          <SearchIcon src="/react-movie-app/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/react-movie-app/movie-logo.png" />
        )}
      </MovieListContainer>
      <footer
          style={{
            backgroundColor: "#000000",
            padding: "20px",
            height: "60px",
            textAlign: "center",
            position: "fixed",
            bottom: "0",
            color:"white",
            width: "100%",
          }}
        >
          <p>&copy; 2024 Cineflix. All rights reserved.</p>
          <p>Contact Us:+91-1234-567-892</p>
        </footer>
    </Container>
  );
}

export default App;
