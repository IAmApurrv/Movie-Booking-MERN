import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Movie from "../models/Movie.js";
import bcrypt from "bcryptjs"

// export const signup = async (req, res, next) => {
//     const { name, email, password } = req.body;
//     if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "") {
//         return res.status(422).json({ message: "Enter a valid input." });
//     }
//     const bcryptedPasword = bcrypt.hashSync(password);
//     let user;
//     try {
//         user = new User({ name, email, password: bcryptedPasword });
//         user = user.save();
//     } catch (error) {
//         return console.log(error);
//     }
//     if (!user) {
//         return res.status(500).json({ message: "Unexpected error occured." });
//     }
//     return res.status(201).json({ id: user._id });
//     // return res.status(201).json({ user });
//     // return res.status(201).json({ message: "Successfully added." });
// }
// {
//     "name": "apurrv",
//     "email": "iamapurrv@gmail.com",
//     "password": "apurrvapurrv"
// }

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ message: "Enter valid input." });
    }

    const bcryptedPasword = bcrypt.hashSync(password, 10); // Hashing password with bcrypt

    try {
        const newUser = new User({ name, email, password: bcryptedPasword });
        const savedUser = await newUser.save(); // Wait for the user to be saved

        if (!savedUser) {
            return res.status(500).json({ message: "Unexpected error occurred." });
        }

        return res.status(201).json({ id: savedUser._id }); // Send user ID in response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Unexpected error occurred." });
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "Enter a valid input." });
    }
    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    } catch (error) {
        console.log(error);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password." });
    }
    return res.status(200).json({ message: "Successfully logged in.", id: existingUser._id })
}
// {
//     "email": "apurrv@gmail.com",
//     "password": "apurrvapurrv"
// }

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return next(error);
    }
    if (!users) {
        return res.status(500).json({ message: "Unexpected error occured." });
    }
    return res.status(200).json({ users });
};

export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findById(id);
    } catch (error) {
        return next(error);
    }
    if (!user) {
        return res.status(500).json({ message: "Unexpected error occured." });
    }
    return res.status(200).json({ user });
};

export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "Enter a valid input." });
    }
    const bcryptedPasword = bcrypt.hashSync(password);
    let user;
    try {
        user = await User.findByIdAndUpdate(id, { name, email, password: bcryptedPasword });
    } catch (error) {
        return console.log(error);
    }
    if (!user) {
        return res.status(500).json({ message: "Something went wrong." })
    }
    return res.status(200).json({ message: "Successfully updated." })
}

// export const deleteUser = async (req, res, next) => {
//     const id = req.params.id;
//     let user;
//     try {
//         user = await User.findByIdAndDelete(id);
//     } catch (error) {
//         return console.log(error);
//     }
//     if (!user) {
//         return res.status(500).json({ message: "Something went wrong." })
//     }
//     return res.status(200).json({ message: "Successfully deleted." })
// }
export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Delete all bookings associated with the user
        await Booking.deleteMany({ user: id });
        
        // Remove bookings from movies collection
        await Movie.updateMany({ "bookings": { $in: user.bookings } }, { $pull: { "bookings": { $in: user.bookings } } });

        // Now delete the user
        await User.findByIdAndDelete(id);
        return res.status(200).json({ message: "User and associated bookings deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong." });
    }
}


export const getBookingsofUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Booking.find({ user: id });
    } catch (err) {
        return console.log(err);
    }
    if (!bookings) {
        return res.status(404).json({ message: 'Bookings not found' });
    }
    return res.status(200).json({ bookings });
};

