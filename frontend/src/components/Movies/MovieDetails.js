import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getMovieDetails, newBooking } from '../../api/api-helpers';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import ChairIcon from '@mui/icons-material/Chair';

const MovieDetails = () => {

    // const isUserLoggedIn = useSelector((state) => state.user.isLogegdIn);
    const isAdminLoggedIn = useSelector((state) => state.admin.isLogegdIn);

    const [movie, setMovie] = useState();
    const [inputs, setInputs] = useState({ seatNumber: "", date: "" });

    const id = useParams().id;
    // console.log(id);

    useEffect(() => {
        if (movie && movie.title) {
            const releaseYear = new Date(movie.releaseDate).getFullYear();
            document.title = `${movie.title} - (${releaseYear})`;
        }
    }, [movie]);

    useEffect(() => {
        getMovieDetails(id)
            .then((res) => setMovie(res))
            .catch((err) => console.log(err));
    }, [id]);
    // console.log(movie);
    // console.log(movie.title);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        // const day = dateObject.toLocaleDateString(undefined, { weekday: 'long' });
        const dayOfMonth = dateObject.toLocaleDateString(undefined, { day: 'numeric' });
        const month = dateObject.toLocaleDateString(undefined, { month: 'long' });
        const year = dateObject.toLocaleDateString(undefined, { year: 'numeric' });

        return `${dayOfMonth} ${month} ${year}`;
    };

    const handleSeatSelect = (row, col) => {
        const seatNumber = row * 10 + col + 1;
        setInputs((prevState) => ({
            ...prevState,
            seatNumber: seatNumber.toString(),
        }));
    };
    const renderSeats = () => {
        const seats = [];
        const rows = 10;
        const cols = 10;
        const totalWidth = 100;
        const seatWidth = totalWidth / cols - 2;
        for (let row = 0; row < rows; row++) {
            const rowSeats = [];
            for (let col = 0; col < cols; col++) {
                const seatNumber = row * cols + col + 1;
                rowSeats.push(
                    <Box key={seatNumber} onClick={() => handleSeatSelect(row, col)} style={{ width: `${seatWidth}%`, height: "30px", border: "1px solid #1ea83c", borderRadius: 6, margin: "2px", display: "inline-block", cursor: "pointer", backgroundColor: inputs.seatNumber === seatNumber.toString() ? "#1ea83c" : "white" }}>
                        <Box sx={{ width: "100%", textAlign: "center" }}><ChairIcon style={{ color: inputs.seatNumber === seatNumber.toString() ? "#ffffff" : "#1ea83c" }} /></Box>
                        {/* <Box sx={{ width: "100%", textAlign: "center" }}>{seatNumber}</Box> */}
                    </Box>
                );
            }
            seats.push(<div key={`row-${row}`}>{rowSeats}</div>);
            if ((row + 1) % 2 === 0 && row !== rows - 1) {
                seats.push(<br key={`br-${row}`} />);
            }
        }
        return seats;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        newBooking({ ...inputs, movie: movie._id })
            .then((res) => {
                console.log(res);
                setInputs({ seatNumber: "", date: "" });
            })
            .catch((error) => console.log(error))
    };

    return (
        <div>
            {movie &&
                <Fragment>

                    <Box display={"flex"} justifyContent="flex-end" alignItems="flex-start">

                        <Box width={"30%"} padding={3} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                            <Card sx={{ borderRadius: 8, backgroundColor: "#f5f5f5" }}>
                                <CardContent>
                                    <Typography variant='h4' textAlign="center" margin={"10px"} sx={{ color: "#17a2b8", fontWeight: "bold", textTransform: "capitalize" }} >
                                        {movie.title}
                                    </Typography>

                                    <img width={"100%"} height={"500px"} src={movie.posterURL} alt={movie.title} />

                                    <Box width="80%" marginTop={1} padding={2}>
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center', marginBottom: 2 }}>
                                            {movie.director}
                                        </Typography>
                                        <Typography variant="body1" component="div" marginTop={1} sx={{ color: 'text.secondary', textAlign: 'center', marginBottom: 1 }}>
                                            <span style={{ fontWeight: 'bold', color: 'primary.main' }}>Starrer: </span>
                                            {movie.actors.map((actor, index) => (
                                                <React.Fragment key={index}>
                                                    {index > 0 && ", "}
                                                    {actor}
                                                </React.Fragment>
                                            ))}
                                        </Typography>
                                        <Typography variant="subtitle1" component="div" sx={{ color: 'text.secondary', textAlign: 'center', marginBottom: 1 }}>
                                            <span style={{ fontWeight: 'bold', color: 'primary.main' }}>Release Date: </span>
                                            {formatDate(movie.releaseDate)}
                                        </Typography>
                                    </Box>

                                </CardContent>
                            </Card>
                        </Box>


                        <Box width={"70%"} padding={3} marginLeft={"auto"}>

                            <Card sx={{ height: "auto", marginBottom: 3, borderRadius: 8, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" sx={{ marginBottom: 2, color: 'primary.main' }}>
                                        Movie Description
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        {movie.description}
                                    </Typography>
                                </CardContent>
                            </Card>

                            {!isAdminLoggedIn && (
                                <Box width="100%" display={"flex"} alignItems="stretch">

                                    <Box display={"inline-block"} width={"50%"} sx={{ marginRight: 3 }} justifyContent="center" alignItems="center" marginTop={2}>
                                        <Card sx={{ borderRadius: 8 }}>
                                            <CardContent sx={{ textAlign: "center" }}>
                                                {renderSeats()}
                                            </CardContent>
                                        </Card>
                                    </Box>

                                    <Box display={"inline-block"} width={"50%"} sx={{ marginLeft: 3 }} justifyContent="center" alignItems="center" marginTop={2}>
                                        <Card sx={{ height: "100%", borderRadius: 8 }}>
                                            <CardContent>
                                                <form onSubmit={handleSubmit}>
                                                    <Box margin={"auto"} padding={5} display={"flex"} flexDirection={"column"} >

                                                        {/* <FormLabel>Seat Number</FormLabel> */}
                                                        <TextField label="Seat Number" value={inputs.seatNumber} onChange={handleChange} type='number' name="seatNumber" margin="normal" variant="outlined" />

                                                        {/* <FormLabel>Booking Date</FormLabel> */}
                                                        <TextField
                                                            type='date'
                                                            label="Booking Date"
                                                            value={inputs.date}
                                                            onChange={handleChange}
                                                            name="date"
                                                            margin="normal"
                                                            variant="outlined"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />

                                                        <Button type="submit" variant="contained"
                                                            sx={{ margin: "auto", mt: 3, width: "80%", backgroundColor: "red", color: "white", textDecoration: 'none', paddingY: "15px", fontSize: "", ":hover": { bgcolor: "#121217" } }}
                                                        >
                                                            Book Now
                                                        </Button>
                                                    </Box>
                                                </form>
                                            </CardContent>
                                        </Card>
                                    </Box>

                                </Box>
                            )}
                        </Box>
                        {/* <Box width={"30%"}></Box> */}
                    </Box>
                </Fragment>
            }
        </div >
    )
}

export default MovieDetails
