import mongoose, { startSession } from "mongoose";
import Movie from "../models/Movie.js"
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const addMovie = async (req, res, next) => {
    try {
        const extractedToken = req.headers.authorization.split(" ")[1]; // jwt token of particular Admin is added in Postman --> Authorization --> Bearer Token
        if (!extractedToken || extractedToken.trim() === "") {
            return res.status(404).json({ message: "Token not found." });
        }

        let adminId;

        // verify token
        jwt.verify(extractedToken, process.env.secretKey, async (err, decrypted) => {
            if (err) {
                return res.status(400).json({ message: `${err.message}` });
            } else {
                adminId = decrypted.id;

                const { title, director, actors, releaseDate, posterURL, description } = req.body;

                // Check if all required fields are provided
                if (!title || !director || !actors || !releaseDate || !posterURL) {
                    return res.status(422).json({ message: "Please provide all required fields." });
                }

                // Check if releaseDate is a valid date
                if (isNaN(Date.parse(releaseDate))) {
                    return res.status(422).json({ message: "Invalid release date format. Please provide a valid date." });
                }

                // Check if actors is an array of strings
                if (!Array.isArray(actors) || actors.some(actor => typeof actor !== 'string')) {
                    return res.status(422).json({ message: "Actors must be provided as an array of strings." });
                }

                // Find admin by ID - you might need to adjust this logic based on your authentication mechanism
                const admin = await Admin.findById(adminId);
                if (!admin) {
                    return res.status(404).json({ message: "Admin not found." });
                }

                // Create new movie
                const movie = new Movie({
                    title,
                    director,
                    actors,
                    releaseDate: new Date(releaseDate),
                    posterURL,
                    description,
                    admin: admin._id
                });

                // Save movie to database
                await movie.save();

                // Add movie to admin's addedMovies array
                admin.addedMovies.push(movie._id);
                await admin.save();

                return res.status(201).json({ movie });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const addMovie2 = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];   // jwt token of perticular Admin is added in postman --> Authorization --> Bearer Token
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token not found." })
    }
    console.log(extractedToken);

    let adminId;

    // verify token
    jwt.verify(extractedToken, process.env.secretKey, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        } else {
            adminId = decrypted.id;
            return;
        }

    })
    // add a new movie
    const { title, director, actors, releaseDate, posterURL, description } = req.body
    if (!title && title.trim() === "" && !director && director.trim() === "" && !actors && actors.trim() === "" && !posterURL && posterURL.trim() === "" && !description && description.trim() === "") {
        return res.status(422).json({ message: "Enter valid inputs." })
    }
    if (isNaN(Date.parse(releaseDate))) {
        return res.status(422).json({ message: "Invalid release date format. Please provide a valid date." });
    }
    // const admin = await Admin.findById(req.adminId);
    // if (!admin) {
    //     return res.status(404).json({ message: "Admin not found." });
    // }
    let movie;
    try {
        movie = new Movie({
            title,
            director,
            actors,
            releaseDate: new Date(`${releaseDate}`),
            posterURL,
            description,
            admin: adminId
        })
        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        await movie.save({ session });
        adminUser.addedMovies.push(movie);
        await adminUser.save({ session });
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
    }
    if (!movie) {
        return res.status(500).json({ messagin: "request failed" });
    }
    return res.status(201).json({ movie });
}

// {
//     "title": "Omkara",
//     "director": "Vishal Bhardwaj",
//     "actors": ["Saif", "Kareena", "Ajay", "Naseeruddin"],
//     "releaseDate": "2006-07-28",
//     "posterURL": "https://upload.wikimedia.org/wikipedia/en/9/9d/Omkarapromoposter.jpg?20080919073033",
//     "description": "Langda dreams of becoming Omkara's successor after the latter wins the election. But when Omkara appoints Kesu as his lieutenant, Langda feels betrayed and plots revenge."
// }

export const getAllMovies = async (req, res, next) => {
    let movies;
    try {
        movies = await Movie.find();
    } catch (error) {
        console.log(error);
    }
    if (!movies) {
        return res.status(500).json({ message: "Request failed." })
    }
    return res.status(200).json({ movies });
}

export const getMovieById = async (req, res, next) => {
    // const id = req.params.id;
    // let movie;
    // try {
    //     movie = await Movie.findById(id);
    // } catch (error) {
    //     console.log(error);
    // }
    // if (!movie) {
    //     return res.status(500).json({ message: "Request failed." })
    // }
    // return res.status(200).json({ movie });
    const movieId = req.params.id;
    let getMovieById;
    try {
        getMovieById = await Movie.findById(movieId);
        if (!getMovieById) {
            return res.status(404).json({ message: "Movie Not found" });
        }
        return res.status(200).json(getMovieById);
    } catch (err) {
        console.log(err);
    }

}

export const deleteMovieById = async (req, res, next) => {
    const movieId = req.params.id;
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const movie = await Movie.findById(movieId).session(session);
        if (!movie) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Movie not found." });
        }

        // Get all bookings associated with the movie
        const bookingsToDelete = await Booking.find({ movie: movieId }).session(session);

        // Remove the movie reference from the users' bookings array
        for (const booking of bookingsToDelete) {
            // Remove booking reference from the user collection
            await User.updateOne({ _id: booking.user }, { $pull: { bookings: booking._id } }).session(session);
        }

        // Delete all bookings associated with the movie
        await Booking.deleteMany({ movie: movieId }).session(session);

        // Remove the movie reference from the admin collection
        await Admin.updateMany({}, { $pull: { addedMovies: movieId } }).session(session);

        // Now delete the movie
        await movie.deleteOne({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ message: "Movie and associated bookings deleted successfully." });
    } catch (error) {
        console.log(error);
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        return res.status(500).json({ message: "Server error." });
    }
}
