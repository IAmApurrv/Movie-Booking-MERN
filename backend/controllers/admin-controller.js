import Admin from "../models/Admin.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import Movie from "../models/Movie.js";
import Booking from "../models/Booking.js"
import mongoose from "mongoose";
import User from "../models/User.js";

export const addAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && email.trim === "" && !password && password.trim === "") {
        return res.status(422).json({ message: "Enter a valid input." });
    }
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (error) {
        console.log(error);
    }
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists." })
    }
    let admin;
    const bcryptedPassword = bcrypt.hashSync(password);
    try {
        admin = new Admin({ email, password: bcryptedPassword });
        admin = await admin.save();
    } catch (error) {
        console.log(error);
    }
    if (!admin) {
        return res.status(500).json({ message: "Unable to store admin." })
    }
    return res.status(200).json({ admin })
}

export const adminLogin = async (req, res, nexr) => {
    const { email, password } = req.body;
    if (!email && email.trim === "" && !password && password.trim === "") {
        return res.status(422).json({ message: "Enter a valid input." });
    }
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (error) {
        console.log(error);
    }
    if (!existingAdmin) {
        return res.status(400).json({ message: "Admin not found." });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
    if (!isPasswordCorrect) {
        return res.status(500).json({ message: "Incorrect password." });
    }
    const token = jwt.sign({ id: existingAdmin._id }, process.env.secretKey, { expiresIn: "7d" });
    return res.status(200).json({ message: "Successfully logged in.", token, id: existingAdmin._id })
}
// {
//     "email": "iamapurrv@gmail.com",
//     "password": "apurrv"
// }
// {
//     "message": "Successfully logged in.",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDViZDI4OGM3NDA0NDczODY0ZDUxNCIsImlhdCI6MTcxMTY1MjE0OSwiZXhwIjoxNzEyMjU2OTQ5fQ.U55n4xDXRJzb1LjmmTzcvKC40AcYwiA4i41Q0L04yns",
//     "id": "6605bd288c7404473864d514"
// }

export const getAllAdmins = async (req, res, next) => {
    let admins;
    try {
        admins = await Admin.find();
    } catch (error) {
        console.log(error);
    }
    if (!admins) {
        return res.status(500).json({ message: "Incorrect password." });
    }
    return res.status(200).json({ admins });
}

export const getAdminById = async (req, res, next) => {
    const id = req.params.id;
    let admin;
    try {
        admin = await Admin.findById(id).populate("addedMovies");
    } catch (error) {
        return console.log(error);
    }
    if (!admin) {
        return console.log("Cannot find Admin.");
    }
    return res.status(200).json({ admin });
};

// export const deleteAdminById = async (req, res, next) => {
//     const adminId = req.params.id;

//     let session;
//     try {
//         session = await mongoose.startSession();
//         session.startTransaction();

//         // Delete movies associated with the admin
//         const deleteResult = await Movie.deleteMany({ admin: adminId }).session(session);

//         if (deleteResult.deletedCount === 0) {
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(500).json({ message: "Failed to delete movies added by admin." });
//         }

//         // Proceed with other deletion operations...

//         await session.commitTransaction();
//         session.endSession();

//         return res.status(200).json({ message: "Admin, associated movies, and bookings deleted successfully." });
//     } catch (error) {
//         console.log(error);
//         if (session) {
//             await session.abortTransaction();
//             session.endSession();
//         }
//         return res.status(500).json({ message: "Failed to delete admin, associated movies, and bookings." });
//     }
// };
export const deleteAdminById = async (req, res, next) => {
    const adminId = req.params.id;
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        // Find movies associated with the admin
        const moviesToDelete = await Movie.find({ admin: adminId }).session(session);

        // Iterate through each movie to delete its associated bookings and references
        for (const movie of moviesToDelete) {
            // Delete bookings associated with each movie
            await Booking.deleteMany({ movie: movie._id }).session(session);

            // Find users with bookings referencing this movie and remove the movie references
            const usersWithBookings = await User.find({ bookings: { $in: movie.bookings } }).session(session);
            for (const user of usersWithBookings) {
                user.bookings = user.bookings.filter(bookingId => !movie.bookings.includes(bookingId));
                await user.save({ session });
            }

            // Delete the movie itself
            await movie.deleteOne().session(session);
        }

        // Now delete the admin
        await Admin.findByIdAndDelete(adminId).session(session);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ message: "Admin, associated movies, bookings, and references deleted successfully." });
    } catch (error) {
        console.log(error);
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        return res.status(500).json({ message: "Failed to delete admin, associated movies, bookings, and references." });
    }
};



