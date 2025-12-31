import Paste from "../models/Paste.js";
import crypto from "crypto";

/**
 * POST /api/pastes
 * body: { content, ttl_seconds, max_views }
 */
export const createPaste = async (req, res) => {
  try {
    const { content, ttl_seconds, max_views } = req.body;

    if (!content || typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({ error: "content is required" });
    }

    if (!Number.isInteger(ttl_seconds) || ttl_seconds < 1) {
      return res.status(400).json({ error: "ttl_seconds must be >= 1" });
    }

    if (max_views !== undefined) {
      if (!Number.isInteger(max_views) || max_views < 1) {
        return res.status(400).json({ error: "max_views must be >= 1" });
      }
    }

    const pasteId = crypto.randomBytes(6).toString("hex");

    const expiresAt = new Date(Date.now() + ttl_seconds * 1000);

    await Paste.create({
      pasteId,
      content,
      expiresAt,
      maxViews: max_views ?? null,
      views: 0,
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    res.status(201).json({
      id: pasteId,
      url: `${baseUrl}/p/${pasteId}`,
      expiresAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
};

/**
 * GET /api/pastes/:pasteId
 */
export const getPaste = async (req, res) => {
  try {
    const { pasteId } = req.params;

    const paste = await Paste.findOne({ pasteId });

    if (!paste) {
      return res.status(404).json({ error: "paste not found or expired" });
    }

    // --- Max views enforcement ---
    if (paste.maxViews !== null && paste.views >= paste.maxViews) {
      return res.status(404).json({ error: "paste expired" });
    }

    paste.views += 1;
    await paste.save();

    res.json({
      content: paste.content,
      views: paste.views,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "invalid paste id" });
  }
};
