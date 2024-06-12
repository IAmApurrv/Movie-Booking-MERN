import axios from 'axios';

export const getAllMovies = async () => {
  const res = await axios
    .get("/movie")
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Error Occured");
  }

  const data = await res.data;
  return data;
};

export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((error) => console.log(error))

  if (res.status !== 200 && res.status !== 201) {
    console.log("Error Occured");
  }

  const resData = await res.data;
  return resData;

};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Error Occured");
  }

  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`/movie/${id}`).catch((error) => console.log(error));
  if (res.status !== 200) {
    return console.log("Error Occured");
  }
  const resData = await res.data;
  return resData;
};

export const newBooking = async (data) => {
  const res = await axios.post("/booking", {
    movie: data.movie,
    seatNumber: data.seatNumber,
    date: data.date,
    user: localStorage.getItem("userId")
  })
    .catch((error) => console.log(error));

  if (res.status !== 201) {
    return console.log("Error Occured... Booking Unsuccessful");
  }
  const resData = await res.data;
  return resData;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/bookings/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Error Occured");
  }

  const resData = await res.data;

  const populatedBookings = await Promise.all(resData.bookings.map(async (booking) => {
    const movieDetails = await getMovieDetails(booking.movie);
    return { ...booking, movie: movieDetails };
  }));

  return { ...resData, bookings: populatedBookings };
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Error Occured");
  }

  const resData = await res.data;
  return resData;
};

export const deleteAccount = async (id) => {
  const res = await axios
    .delete(`/user/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Error Occured");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Error Occured");
  }

  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        director: data.director,
        releaseDate: data.releaseDate,
        posterURL: data.posterURL,
        description: data.description,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => console.log(error));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const deleteMovie = async (id) => {
  const res = await axios
    .delete(`/movie/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Error Occured");
  }

  const resData = await res.data;
  return resData;
};






