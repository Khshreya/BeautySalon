import { io, activeUsers } from "../index.js";
import { closeChangeStream } from "./EventMonitor.js";

export async function newAppointmentEmmiter(
  client,
  timeInMs = 10000,
  pipeline = []
) {
  const collection = client.db("beauty-saloon").collection("appointments");
  const changeStream = collection.watch(pipeline);

  changeStream.on("change", async (next) => {
    activeUsers.forEach((user) => {
      if (user.user.userType === "admin") {
        io.to(user.socketId).emit("new appointment", next);
      }
    });
  });
  await closeChangeStream(timeInMs, changeStream);
}
