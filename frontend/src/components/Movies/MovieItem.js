import { Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const MovieItem = ({ title, releaseDate, posterURL, id }) => {

    const isAdminLoggedIn = useSelector((state) => state.admin.isLogegdIn);
    // const isUserLoggedIn = useSelector((state) => state.user.isLogegdIn);

    return (
        <Card sx={{ width: 250, bgcolor: "#f5f5f5", maxHeight: "", alignContent: "center", margin: 2, borderRadius: 5, ":hover": { boxShadow: "10px 10px 20px #ccc" } }} component={Link} to={`/movie-details/${id}`}>
            <img width={"100%"} height={"50%"} src={posterURL} alt={title} />
            <CardContent>
                <Typography variant="h5" component="div" sx={{ color: "#17a2b8", fontWeight: "bold", textTransform: "capitalize" }}>
                    {title}
                </Typography>

                <Typography variant="" color="text.secondary">
                    Release Date : {new Date(releaseDate).toDateString()}
                </Typography>
            </CardContent>
            {/* <CardActions> */}
            {!isAdminLoggedIn && (
                <Button
                    sx={{ margin: "auto", width: "80%", backgroundColor: "red", color: "white", textDecoration: 'none', ":hover": { bgcolor: "#121217" } }}
                    component={Link}
                    to={`/movie-details/${id}`}
                    variant="contained"
                >
                    Book
                </Button>
            )}
            {/* </CardActions> */}
        </Card>
    )
}

export default MovieItem
