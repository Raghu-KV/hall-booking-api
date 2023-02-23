import express from "express";
import { createRoom, getBookedRoomData } from "../services/room.service.js";
const router = express.Router();

router.post("/create-room", async (req, res) => {
  const data = req.body;
  const result = await createRoom(data);
  res.send(result);
});

//list all rooms with booked data
router.get("/booked-room-data", async (req, res) => {
  const data = await getBookedRoomData();
  res.send(data);
});

export default router;
