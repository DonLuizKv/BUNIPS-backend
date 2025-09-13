import express from "express"
import GetPatient from "../controllers/patient.controller";

const router = express.Router();

router.get("/:id", GetPatient);
// router.post("/");
// router.put("/:id");
// router.delete("/:id");

export default router;