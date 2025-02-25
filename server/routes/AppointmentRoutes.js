import express from "express";
import {
  getAppointment,
  scheduleAppointment,
  updateAppointment,
} from "../controllers/AppointmentController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("beautician route working");
});

router.post("/add", scheduleAppointment);
router.post("/get", getAppointment);
router.put("/update", updateAppointment);

export const appointmentRouter = router;
