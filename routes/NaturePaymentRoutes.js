import express from "express";
import { getNaturePayments, getNaturePaymentById } from "../controllers/naturePaymentController.js";

const router = express.Router();

router.get("/", getNaturePayments);
router.get("/:sectionCode", getNaturePaymentById);

export default router;


