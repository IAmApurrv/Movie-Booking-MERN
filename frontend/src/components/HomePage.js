import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import Carousel from "react-material-ui-carousel";
import { Button, Typography } from '@mui/material';
import MovieItem from './Movies/MovieItem';
import { Link } from 'react-router-dom';
import { getAllMovies } from '../api/api-helpers';

const HomePage = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        document.title = "ShowSpot - Book Movie";
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch((err) => console.log(err));
    }, []);
    console.log(movies);

    const carouselProps = {
        autoPlay: true, // Auto play the carousel
        duration: 500, // Duration of the transition animation in milliseconds
        interval: 3000, // Time interval between slides in milliseconds
        animation: "slide", // Type of animation for transitioning between slides
        indicators: true, // Whether to show slide indicators
        cycleNavigation: true, // Whether to allow navigation through cycling (looping)
        stopAutoPlayOnHover: true, // Stop auto play when hovering over the carousel
        swipe: true, // Allow swiping to navigate between slides
        navButtonsProps: { // Additional props for navigation buttons
            navButtonsAlwaysVisible: true, // Whether navigation buttons are always visible
        },
    };


    // const data = movies.map(movie => movie.posterURL)

    const data = [
        "https://stat5.bollywoodhungama.in/wp-content/uploads/2017/07/Karwaan-4.jpg",
        // "https://pbs.twimg.com/profile_banners/2414206130/1711973242/1500x500",
        "https://assets-in.bmscdn.com/discovery-catalog/events/et00344265-sjtavpswzr-landscape.jpg",
        "https://stat5.bollywoodhungama.in/wp-content/uploads/2020/08/Tiger-3-3.jpg",
        "https://stat4.bollywoodhungama.in/wp-content/uploads/2020/10/Bhediya-5.jpg",
        "https://media5.bollywoodhungama.in/wp-content/uploads/2016/03/Manmarziyaan-4.jpg"
    ];

    return (
        <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2} display="flex" flexDirection="column" alignItems="center">
            <Box width={"80%"} height={""} margin="auto" bgcolor="" padding={1} overflow="hidden">
                <Carousel className="carousel" {...carouselProps}>
                    {data.map((ele, i) => (
                        <Box key={i} style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
                            <img src={ele} alt="" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                        </Box>
                    ))}
                </Carousel>
            </Box>

            <Box textAlign="center" marginTop={4}>
                <Typography variant='h4' textAlign="center" sx={{ color: "#17a2b8", fontWeight: "bold", textTransform: "capitalize" }} >
                    Latest Release
                </Typography>
                <Box width={"100%"} margin={"auto"} display={"flex"} justifyContent={"center"} flexWrap={"wrap"}>
                    {movies && movies.slice().reverse().slice(0, 6).map((movie, index) => <MovieItem id={movie._id} title={movie.title} releaseDate={movie.releaseDate} posterURL={movie.posterURL} key={index} />)}
                </Box>
            </Box>
            <Box display={"flex"} padding={5} margin={"auto"}>
                <Button LinkComponent={Link} to="/movies" variant="outlined" sx={{ margin: "auto", color: "#17a2b8" }}>View All Movies</Button>
            </Box>
        </Box>
    )
}

export default HomePage
