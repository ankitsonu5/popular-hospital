import Contact from "../models/Contact.js";
import { sendContactEmail } from "../services/emailService.js";

// POST /api/contacts — public
export const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      date,
      timing,
      department,
      location,
      message,
      agreedToTerms,
      age,
      country,
      isInternational,
    } = req.body;

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ error: "Name, email, and phone are required." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    const phoneClean = phone.replace(/[\s\-\+]/g, "");
    if (!/^[0-9]{10,15}$/.test(phoneClean)) {
      return res.status(400).json({ error: "Invalid phone number format." });
    }

    const contact = await Contact.create({
      name: String(name).trim().substring(0, 200),
      email: String(email).trim().substring(0, 200),
      phone: String(phone).trim().substring(0, 20),
      date: date || "",
      timing: timing || "",
      department: department || "",
      location: location || "",
      message: message ? String(message).trim().substring(0, 2000) : "",
      agreedToTerms: Boolean(agreedToTerms),
      age: age || "",
      country: country || "",
      isInternational: Boolean(isInternational),
    });

    // Send email notification (non-blocking — don't fail request if email fails)
    sendContactEmail(contact).catch((err) => {
      console.error("[EMAIL] Failed to send contact email:", err.message);
    });

    res.status(201).json({
      id: contact._id,
      message: "Your appointment request has been submitted successfully!",
    });
  } catch (error) {
    console.error("[CONTACT]", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while submitting your request." });
  }
};

// GET /api/contacts — admin only
export const getContacts = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && ["new", "read"].includes(status)) {
      filter.status = status;
    }

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("[CONTACT]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// GET /api/contacts/:id — admin only
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found." });
    res.json(contact);
  } catch (error) {
    console.error("[CONTACT]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// PATCH /api/contacts/:id/status — admin only
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["new", "read"].includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!contact) return res.status(404).json({ error: "Contact not found." });
    res.json(contact);
  } catch (error) {
    console.error("[CONTACT]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// DELETE /api/contacts/:id — admin only
export const deleteContact = async (req, res) => {
  try {
    console.log("[DELETE] Attempting to delete contact:", req.params.id);
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      console.log("[DELETE] Contact not found:", req.params.id);
      return res.status(404).json({ error: "Contact not found." });
    }
    console.log("[DELETE] Successfully deleted contact:", req.params.id);
    res.json({ message: "Contact deleted successfully." });
  } catch (error) {
    console.error("[DELETE] Error during deletion:", error.message);
    res.status(500).json({ error: "An error occurred during deletion." });
  }
};
