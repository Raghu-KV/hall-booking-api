import express from "express";
import {
  getCustomerBookedData,
  bookRoom,
} from "../services/customer.service.js";

const router = express.Router();

router.get("/customer-booked-data", async (req, res) => {
  const data = await getCustomerBookedData();

  res.send(data);
});

router.post("/book-room", async (req, res) => {
  const data = req.body;
  const result = await bookRoom(data);
  res.send(result);
});

export default router;
