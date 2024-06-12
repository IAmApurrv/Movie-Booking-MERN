import React, { Fragment, useEffect, useState } from 'react'
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography, Card, CardMedia, CardContent, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { deleteMovie, getAdminById } from '../../api/api-helpers';
import DeleteForeverIcon from "@mui/icons-material/Delete";
import { Link } from 'react-router-dom';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

const AdminProfile = () => {

  const [admin, setAdmin] = useState();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  useEffect(() => {
    if (admin && admin.email) {
      document.title = `${admin.email} - Dashboard`;
    }
  }, [admin]);

  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    // const day = dateObject.toLocaleDateString(undefined, { weekday: 'long' });
    const dayOfMonth = dateObject.toLocaleDateString(undefined, { day: 'numeric' });
    const month = dateObject.toLocaleDateString(undefined, { month: 'long' });
    const year = dateObject.toLocaleDateString(undefined, { year: 'numeric' });

    return `${dayOfMonth} ${month} ${year}`;
  };

  // delete movie
  const handleDeleteMovie = (id) => {
    setMovieToDelete(id);
    setDeleteConfirmationOpen(true);
  }

  const handleConfirmDeleteMovie = () => {
    deleteMovie(movieToDelete)
      .then(() => {
        setAdmin((prevAdmin) => ({
          ...prevAdmin,
          addedMovies: prevAdmin.addedMovies.filter(movie => movie._id !== movieToDelete)
        }));
        setDeleteConfirmationOpen(false);
      })
      .catch((error) => console.log(error))
  }

  const handleCloseConfirmation = () => {
    setDeleteConfirmationOpen(false);
  }

  return (
    <Box width={"100%"} display={"flex"} marginTop={"-5"}>
      <Fragment>
        {admin && (
          <Card sx={{ width: '30%', height: 'fit-content', margin: 3, marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: 8, backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <AccountCircleIcon sx={{ fontSize: "10rem", marginBottom: '1rem' }} />
              <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                Email: {admin.email}
              </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        )}

        {admin && admin.addedMovies.length > 0 && (
          <Box width="70%" margin={3} padding={3} display="flex" flexDirection="column" borderRadius={8}>
            <Typography variant='h4' textAlign="center" marginBottom={"10px"} sx={{ color: "#17a2b8", fontWeight: "bold", textTransform: "capitalize" }}>
              Added Movies
            </Typography>
            <Box width="100%" display="flex" flexWrap="wrap" justifyContent="normal">
              {admin.addedMovies.slice().reverse().map((movie) => (
                <Card key={movie._id} sx={{ width: '30%', marginBottom: '1rem', marginX: 'auto', textAlign: 'center' }}>
                  <CardMedia component="img" image={movie.posterURL} alt={movie.title} />
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="div" sx={{ color: "#17a2b8", fontWeight: "bold", textTransform: "capitalize" }}>
                      {movie.title}
                    </Typography>
                    <Typography>
                      Director: {movie.director}
                    </Typography>
                    <Typography>
                      Release Date: {formatDate(movie.releaseDate)}
                    </Typography>
                    <CardActions style={{ marginTop: 'auto' }}>
                      <Button variant="contained" fullWidth color='info' component={Link} to={`/movie-details/${movie._id}`}><VisibilityRoundedIcon />View Details</Button>
                      <Button variant="contained" fullWidth color='error' onClick={() => handleDeleteMovie(movie._id)}><DeleteForeverIcon />Delete Movie</Button>
                    </CardActions>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Fragment>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCloseConfirmation}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this movie?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button onClick={handleConfirmDeleteMovie} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box >
  )
}

export default AdminProfile
