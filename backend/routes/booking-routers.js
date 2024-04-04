import express from "express";
import { newBooking, getAllBookings, getBookingById, deleteBooking } from "../controllers/booking-controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/", newBooking)
bookingRouter.get("/", getAllBookings)
bookingRouter.get("/:id", getBookingById)
bookingRouter.delete("/:id", deleteBooking)


export default bookingRouter;