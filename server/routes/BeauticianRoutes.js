import express from "express";
import {
  deleteBeautician,
  getBeauticianList,
  registerBeautician,
} from "../controllers/BeauticianController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("beautician route working");
});

router.post("/add", registerBeautician);
router.get("/all", getBeauticianList);
router.delete("/delete", deleteBeautician);

export const beauticianRouter = router;
