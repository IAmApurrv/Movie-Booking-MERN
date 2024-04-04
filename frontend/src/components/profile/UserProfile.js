import React, { Fragment, useEffect, useState } from 'react';
import { deleteAccount, deleteBooking, getUserBooking, getUserDetails } from '../../api/api-helpers';
import { Box, Typography, Button, Card, CardContent, CardActions, CardMedia, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/Delete";
import { userActions } from '../../store';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteBookingConfirmationOpen, setDeleteBookingConfirmationOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.name) {
      document.title = `${user.name} - Dashboard`;
    }
  }, [user]);

  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((error) => console.log(error));
    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((error) => console.log(error));
  }, []);

  // delete account
  const handleDeleteAccount = () => {
    deleteAccount(deleteId)
      .then((res) => {
        console.log(res);
        logout();
      })
      .catch((error) => console.log(error))
    setConfirmationOpen(false);
  }
  const handleOpenConfirmation = (id) => {
    setDeleteId(id);
    setConfirmationOpen(true);
  }
  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  }

  // delete booking
  const handleDeleteBooking = (id) => {
    setBookingToDelete(id);
    setDeleteBookingConfirmationOpen(true);
  }
  const handleConfirmDeleteBooking = () => {
    deleteBooking(bookingToDelete)
      .then((res) => {
        console.log(res);
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingToDelete));
        setDeleteBookingConfirmationOpen(false);
      })
      .catch((error) => console.log(error));
  }
  const handleCloseDeleteBookingConfirmation = () => {
    setDeleteBookingConfirmationOpen(false);
  }

  const logout = () => {
    dispatch(userActions.logout());
    navigate("/");
  };

  return (
    <Box width="100%" display="flex" marginTop="">

      <Fragment>
        {user && (
          <Card sx={{ width: '30%', height: 'fit-content', margin: 3, marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: 8, backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <AccountCircleIcon sx={{ fontSize: "10rem", marginBottom: '1rem' }} />
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                Email: {user.email}
              </Typography>
            </CardContent>
            <CardActions sx={{ paddingBottom: "40px" }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleOpenConfirmation(user._id)}
              // onClick={() => handleDeleteAccount(user._id)}
              >
                Delete Account
              </Button>
            </CardActions>
          </Card>
        )}

        {bookings && bookings.length > 0 && (
          <Box width="70%" margin={3} padding={3} display="flex" flexDirection="column" borderRadius={8}>
            <Typography variant='h4' textAlign="center" marginBottom={"10px"} sx={{ color: "#17a2b8", fontWeight: "bold", textTransform: "capitalize" }}>
              Bookings
            </Typography>
            <Box width="100%" display="flex" flexWrap="wrap" justifyContent="normal">
              {bookings.slice().reverse().map((booking) => (
                <Card key={booking._id} sx={{ width: '30%', marginBottom: '1rem', marginX: 'auto', textAlign: 'center' }}>
                  <CardMedia component="img" image={booking.movie.posterURL} alt={booking.movie.title} />
                  {/* <img width={"100%"} height={"50%"} src={booking.movie.posterURL} alt={booking.movie.title} /> */}
                  <CardContent >
                    <Typography variant="h5" component="div" sx={{ color: "#17a2b8", fontWeight: "bold", textTransform: "capitalize" }}>
                      {booking.movie.title}
                    </Typography>
                    <Typography>
                      Seat Number: {booking.seatNumber}
                    </Typography>
                    <Typography>
                      Date: {new Date(booking.date).toDateString()}
                    </Typography>
                    <CardActions>
                      <Button variant="contained" fullWidth color='info' component={Link} to={`/movie-details/${booking.movie._id}`}><VisibilityRoundedIcon />View Details</Button>
                      <Button variant="contained" fullWidth color='error' onClick={() => handleDeleteBooking(booking._id)}><DeleteForeverIcon />Cancel Booking</Button>
                    </CardActions>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Fragment >

      <Dialog
        open={confirmationOpen}
        onClose={handleCloseConfirmation}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteBookingConfirmationOpen}
        onClose={handleCloseDeleteBookingConfirmation}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteBookingConfirmation}>Cancel</Button>
          <Button onClick={handleConfirmDeleteBooking} color="error">Cancel Booking</Button>
        </DialogActions>
      </Dialog>
    </Box >
  )
}

export default UserProfile;
