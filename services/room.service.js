import { client } from "../index.js";

export async function createRoom(data) {
  return await client.db("hallbooking").collection("rooms").insertMany(data);
}
export async function getBookedRoomData() {
  return await client
    .db("hallbooking")
    .collection("rooms")
    .aggregate([
      {
        $lookup: {
          from: "customer",
          localField: "roomId",
          foreignField: "bookedRoomId",
          as: "bookedStatus",
          pipeline: [
            {
              $project: {
                bookedDate: 1,
                customerName: 1,
                startTime: 1,
                endTime: 1,
                _id: 0,
              },
            },
          ],
        },
      },
    ])
    .toArray();
}
