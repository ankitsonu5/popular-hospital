import SecondOpinion from "../models/SecondOpinion.js";
import { sendSecondOpinionEmail } from "../services/emailService.js";

// POST /api/second-opinions — public
export const createSecondOpinion = async (req, res) => {
  try {
    const { name, phone, department, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required." });
    }

    const phoneClean = phone.replace(/[\s\-\+]/g, "");
    if (!/^[0-9]{10,15}$/.test(phoneClean)) {
      return res.status(400).json({ error: "Invalid phone number format." });
    }

    const record = await SecondOpinion.create({
      name: String(name).trim().substring(0, 200),
      phone: String(phone).trim().substring(0, 20),
      department: department ? String(department).trim() : "",
      message: message ? String(message).trim().substring(0, 2000) : "",
    });

    sendSecondOpinionEmail(record).catch((err) => {
      console.error("[SECOND OPINION EMAIL]", err.message);
    });

    res.status(201).json({
      id: record._id,
      message: "Your second opinion request has been submitted successfully!",
    });
  } catch (error) {
    console.error("[SECOND_OPINION]", error.message);
    res.status(500).json({ error: "An error occurred while submitting your request." });
  }
};

// GET /api/second-opinions — admin only
export const getSecondOpinions = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && ["new", "read"].includes(status)) {
      filter.status = status;
    }
    const records = await SecondOpinion.find(filter).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    console.error("[SECOND_OPINION]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// PATCH /api/second-opinions/:id/status — admin only
export const updateSecondOpinionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["new", "read"].includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }
    const record = await SecondOpinion.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!record) return res.status(404).json({ error: "Record not found." });
    res.json(record);
  } catch (error) {
    console.error("[SECOND_OPINION]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// DELETE /api/second-opinions/:id — admin only
export const deleteSecondOpinion = async (req, res) => {
  try {
    const record = await SecondOpinion.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found." });
    res.json({ message: "Deleted successfully." });
  } catch (error) {
    console.error("[SECOND_OPINION]", error.message);
    res.status(500).json({ error: "An error occurred during deletion." });
  }
};

