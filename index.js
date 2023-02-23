import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

import roomsRouter from "./routes/rooms.routes.js";
import customerRouter from "./routes/customer.routes.js";

//configure dotenv
dotenv.config();

//connecting mongodb
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();

console.log("connected to mongo db");

const PORT = process.env.PORT;

//configure express
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    checkRoomsWithBookedData: "/rooms/booked-room-data",
    checkCustomersWithBookedData: "/customer/customer-booked-data",
    createRoomSchema: {
      roomName: "string",
      roomId: "string",
      totalSeats: "number",
      amenities: "Array",
      price: "string",
    },
    toCreateRoom: "/rooms/create-room",
    createCustomerSchema: {
      customerName: "string",
      bookedDate: "ISODate/new Date",
      startTime: "number",
      endTime: "number",
      bookedRoomId: "same string as in roomID",
    },
    toBookRoom: "/customer/book-room",
  });
});

app.use("/rooms", roomsRouter);
app.use("/customer", customerRouter);

app.listen(PORT, () => console.log(`listening to the port ${PORT}`));

export { client };
