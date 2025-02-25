import {
  deleteBeauticianByEmail,
  fetchBeauticianList,
  getBeauticianByEmail,
  insertBeautician,
} from "../models/BeauticianModel.js";

export const registerBeautician = async (req, res) => {
  const {
    firstname,
    lastname,
    phone,
    email,
    education,
    experience,
    department,
    image,
  } = req.body;

  const data = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone: phone,
    education: education,
    experience: experience,
    department: department,
    image:image,
  };

  const beauticianByEmail = await getBeauticianByEmail({ email: email });

  if (beauticianByEmail) {
    return res.status(401).send({
      message: "Beautician already exists",
      success: false,
    });
  }
  const result = await insertBeautician(data);
  if (!result) {
    return res.status(401).send({
      message: "Something went wrong..please try again later",
      success: false,
    });
  }

  res.status(200).send({
    message: "User was registered successfully! Please Verify Your Email!",
    success: true,
  });
};

export const getBeauticianList = async (req, res) => {
  // console.log("getBeauticianList requested");

  const result = await fetchBeauticianList();

  if (!result) {
    return res.status(401).send({
      message: "Something went wrong..please try again later",
      success: false,
    });
  }

  res.status(200).send({
    message: "User was registered successfully! Please Verify Your Email!",
    success: true,
    beauticians: result,
  });
};

export const deleteBeautician = async (req, res) => {
  // console.log("getBeauticianList requested");
  const { email } = req.body;

  const result = await deleteBeauticianByEmail({ email: email });

  if (!result) {
    return res.status(401).send({
      message: "Something went wrong..please try again later",
      success: false,
    });
  }

  res.status(200).send({
    message: "User was registered successfully! Please Verify Your Email!",
    success: true,
  });
};
