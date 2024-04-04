import express from "express";
import { addMovie, deleteMovieById, getAllMovies, getMovieById } from "../controllers/movie-controller.js";

const movieRouter = express.Router();

movieRouter.post("/", addMovie)
movieRouter.get("/", getAllMovies)
movieRouter.get("/:id", getMovieById)
movieRouter.delete("/:id", deleteMovieById)




export default movieRouter;