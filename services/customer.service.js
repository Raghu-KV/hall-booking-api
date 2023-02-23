import { client } from "../index.js";

export async function bookRoom(data) {
  return await client.db("hallbooking").collection("customer").insertMany(data);
}
export async function getCustomerBookedData() {
  return await client
    .db("hallbooking")
    .collection("customer")
    .aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "bookedRoomId",
          foreignField: "roomId",
          as: "bookedRoom",
          pipeline: [
            {
              $project: {
                roomName: 1,
                _id: 0,
              },
            },
          ],
        },
      },
      {
        $project: {
          bookedDate: 1,
          bookedRoom: 1,
          customerName: 1,
          endTime: 1,
          startTime: 1,
          _id: 0,
        },
      },
    ])
    .toArray();
}
