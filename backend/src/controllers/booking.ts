import express from "express";
import { Booking } from "../models/booking";

class BookingController {
  /**
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async create(req: express.Request, res: express.Response) {
    // check values are filled
    if (req.body.shelterId === null || req.body.userProfileId === null || req.body.startDate === null || req.body.endDate === null) {
      const result = {"status": "failure", "message": "Your booking is invalid."};
      return res.end(JSON.stringify(result));
    }
    // check for userID
    if (req.user.id !== req.body.userId) {
      const result = {"status": "failure", "message": "You are not authorized"};
      return res.end(JSON.stringify(result));
    }
    // finally create
    const data = {
      shelterId: req.body.shelterId,
      userId: req.body.userId,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    Booking.create(data).then((newBooking: Booking) => {
      if (!newBooking) {
        const result = {"status": "failure", "message": "Failed to create new booking"};
        return res.end(JSON.stringify(result));
      }
      if (newBooking) {
        const result = {"status": "success", "message": "You have successfully created a new booking"};
        return res.end(JSON.stringify(result));
      }
    });
  }
}

export default new BookingController();
