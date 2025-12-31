import express from "express";
import { createPaste, getPaste } from "../controller/Paste.controller.js";

const router = express.Router();

router.post("/", createPaste);
router.get("/:pasteId", getPaste);

export default router;
