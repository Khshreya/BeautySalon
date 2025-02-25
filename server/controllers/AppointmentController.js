import { ObjectId } from "mongodb";
import { newAppointmentEmmiter } from "../EventMonitor/AppointmentEventMonitor.js";
import { client } from "../index.js";
import {
  fetchAppointmentList,
  ifDuplicateAppointment,
  insertAppointment,
  updateAppointmentById,
} from "../models/AppointmentModel.js";

export const scheduleAppointment = async (req, res) => {
  // console.log("scheduleAppointment requested", req.body);
  const { bookedBy, slot, beautician_email, date, beautician_name } = req.body;

  const data = {
    beautician_name: beautician_name,
    beautician_email: beautician_email,
    bookedBy: bookedBy,
    date: date,
    slot: slot,
    status: "open",
    createdOn: new Date(),
  };
  // console.log("appointment data", data);
  const checkdata = { beautician_email: beautician_email, date: date, slot: slot };

  const duplicate = await ifDuplicateAppointment(checkdata);

  if (duplicate && duplicate.length > 0) {
    return res.status(200).send({
      message: "Appointment for selected slot not available",
      success: false,
    });
  }
  const pipeline = [
    {
      $match: {
        operationType: "insert",
      },
    },
  ];
  newAppointmentEmmiter(client, 10000, pipeline);
  const result = await insertAppointment(data);
  if (!result) {
    return res.status(401).send({
      message: "Something went wrong..please try again later",
      success: false,
    });
  }

  res.status(200).send({
    message: "Appointment Booked Successfully",
    success: true,
  });
};

export const getAppointment = async (req, res) => {
  let data = {};
  const { userType, email } = req.body;
  if (userType != "admin") {
    data = { bookedBy: email };
  }

  const result = await fetchAppointmentList(data);

  if (!result) {
    return res.status(401).send({
      message: "Something went wrong..please try again later",
      success: false,
    });
  }

  res.status(200).send({
    message: "Appointments fetched successfully",
    success: true,
    list: result,
  });
};

export const updateAppointment = async (req, res) => {
  console.log("updateAppointment requested");

  const { _id, status } = req.body;

  const result = await updateAppointmentById({ _id: ObjectId(_id) }, status);

  res.status(200).send({
    message: "Appointments updated successfully",
    success: true,
    list: result,
  });
};
