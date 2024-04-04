import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: [{
        type: String,
        required: true
    }],
    releaseDate: {
        type: Date,
        required: true
    },
    posterURL: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: "Booking",
    }],
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true
    }
})


export default mongoose.model("Movie", movieSchema)