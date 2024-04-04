import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

// export const newBooking = async (req, res, next) => {
//     const { movie, user, date, seatNumber } = req.body;
//     let existingMovie;
//     let existingUser;
//     try {
//         existingMovie = await Movie.findById(movie)
//         existingUser = await User.findById(user);
//     } catch (error) {
//         console.log(error);
//     }
//     if (!existingMovie) {
//         return res.status(404).json({ message: "Movie does not found with given id." })
//     }
//     if (!existingUser) {
//         return res.status(404).json({ message: "User does not found with given id." })
//     }

//     let booking;
//     try {
//         booking = new Booking({ movie, user, date: new Date(`${date}`), seatNumber });
//         const session = await mongoose.startSession();
//         session.startTransaction();
//         existingUser.bookings.push(booking);
//         existingMovie.bookings.push(booking);
//         await existingUser.save({ session })
//         await existingMovie.save({ session });
//         await booking.save({ session });
//         session.commitTransaction();
//     } catch (error) {
//         console.log(error);
//     }
//     if (!booking) {
//         return res.status(500).json({ message: "Request failed." })
//     }
//     return res.status(201).json({ booking });
// }
export const newBooking = async (req, res, next) => {
    const { movie, user, date, seatNumber } = req.body;

    // Check if required fields are provided
    if (!movie || !user || !date || !seatNumber) {
        return res.status(400).json({ message: "All fields are required." });
    }

    let existingMovie;
    let existingUser;
    let booking;

    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);

        if (!existingMovie) {
            return res.status(404).json({ message: "Movie not found with the given id." });
        }

        if (!existingUser) {
            return res.status(404).json({ message: "User not found with the given id." });
        }

        // Creating new booking
        booking = new Booking({ movie, user, date: new Date(`${date}`), seatNumber });

        const session = await mongoose.startSession();
        session.startTransaction();

        // Add booking reference to user and movie collections
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);

        // Save changes
        await existingUser.save({ session });
        await existingMovie.save({ session });
        await booking.save({ session });

        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Request failed." });
    }

    return res.status(201).json({ booking });
}

// {
//     "movie": "66064028f860c36c8a2c930a",
//     "user": "66063aa398d2f748e88c632b",
//     "date": "2024-08-8",
//     "seatNumber": 12
// }

export const getAllBookings = async (req, res, next) => {
    let bookings;
    try {
        bookings = await Booking.find();
    } catch (error) {
        console.log(error);
    }
    if (!bookings) {
        return res.status(500).json({ message: "Request failed." })
    }
    return res.status(200).json({ bookings });
}

export const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findById(id);
    } catch (error) {
        console.log(error);
    }
    if (!booking) {
        return res.status(500).json({ message: "Booking not found" })
    }
    return res.status(200).json({ booking });
}

export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findByIdAndDelete(id).populate("user movie");
        console.log(booking);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }
        const session = await mongoose.startSession();
        session.startTransaction();

        // Remove the booking reference from the user collection
        await User.updateOne({ bookings: id }, { $pull: { bookings: id } }).session(session);
        // Remove the booking reference from the movie collection
        await Movie.updateOne({ bookings: id }, { $pull: { bookings: id } }).session(session);
        await session.commitTransaction();
        // await booking.user.bookings.pull(booking);
        // await booking.movie.bookings.pull(booking);
        // await booking.movie.save({ session });
        // await booking.user.save({ session });
        // session.commitTransaction();
    } catch (error) {
        console.log(error);
    }
    if (!booking) {
        return res.status(500).json({ message: "Request failed." })
    }
    return res.status(200).json({ message: "Successfully deleted." });
}