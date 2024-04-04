import { Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api/api-helpers';
import MovieItem from './MovieItem';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    document.title = "All Movies";
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err))
  }, [])
  // useEffect(() => {
  //   getAllMovies()
  //     .then((data) => setMovies(data.movies))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography variant='h4' textAlign="center" sx={{ color: "#17a2b8", fontWeight: "bold", textTransform: "capitalize" }} >
        All Movies
      </Typography>

      <Box margin={"auto"} display={"flex"} justifyContent={"center"} textAlign={"center"} flexWrap={"wrap"} >
        {movies &&
          movies.slice().reverse().map((movies, index) => (
            <MovieItem id={movies._id} title={movies.title} director={movies.director} releaseDate={movies.releaseDate} posterURL={movies.posterURL} key={index} />
          ))}
      </Box>

    </Box>
  )
}

export default Movies
