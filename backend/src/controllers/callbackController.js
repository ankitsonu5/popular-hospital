import CallbackRequest from "../models/CallbackRequest.js";

// POST /api/callback-requests — public
export const createCallbackRequest = async (req, res) => {
  try {
    const { name, phone, department } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required." });
    }

    const phoneClean = phone.replace(/[\s\-\+]/g, "");
    if (!/^[0-9]{10,15}$/.test(phoneClean)) {
      return res.status(400).json({ error: "Invalid phone number format." });
    }

    const request = await CallbackRequest.create({
      name: String(name).trim().substring(0, 200),
      phone: String(phone).trim().substring(0, 20),
      department: department ? String(department).trim() : "",
    });

    res.status(201).json({
      id: request._id,
      message: "Your call back request has been submitted successfully!",
    });
  } catch (error) {
    console.error("[CALLBACK]", error.message);
    res.status(500).json({ error: "An error occurred while submitting your request." });
  }
};

// GET /api/callback-requests — admin only
export const getCallbackRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && ["new", "read"].includes(status)) {
      filter.status = status;
    }
    const requests = await CallbackRequest.find(filter).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("[CALLBACK]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// PATCH /api/callback-requests/:id/status — admin only
export const updateCallbackStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["new", "read"].includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }
    const request = await CallbackRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!request) return res.status(404).json({ error: "Request not found." });
    res.json(request);
  } catch (error) {
    console.error("[CALLBACK]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// DELETE /api/callback-requests/:id — admin only
export const deleteCallbackRequest = async (req, res) => {
  try {
    const request = await CallbackRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ error: "Request not found." });
    res.json({ message: "Deleted successfully." });
  } catch (error) {
    console.error("[CALLBACK]", error.message);
    res.status(500).json({ error: "An error occurred during deletion." });
  }
};
