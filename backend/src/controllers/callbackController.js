import CallbackRequest from "../models/CallbackRequest.js";
import {
  sendCallbackEmail,
  sendCustomNotificationEmail,
} from "../services/emailService.js";

// POST /api/callback-requests — public
export const createCallbackRequest = async (req, res) => {
  try {
    const { name, phone, email, department, source } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required." });
    }

    const phoneClean = String(phone).replace(/[\s\-\+]/g, "");
    if (!/^[0-9]{10,15}$/.test(phoneClean)) {
      return res.status(400).json({ error: "Invalid phone number format." });
    }

    let cleanEmail = "";
    if (email && typeof email === "string" && email.trim()) {
      cleanEmail = email.trim().toLowerCase().substring(0, 200);
    }

    const request = await CallbackRequest.create({
      name: String(name).trim().substring(0, 200),
      phone: String(phone).trim().substring(0, 20),
      email: cleanEmail,
      department: department ? String(department).trim() : "",
      source: source ? String(source).trim() : "callback_form",
    });

    sendCallbackEmail(request).catch((err) => {
      console.error("[CALLBACK EMAIL]", err.message);
    });

    res.status(201).json({
      id: request._id,
      message: "Your request has been submitted successfully! We will contact you soon.",
      data: request,
    });
  } catch (error) {
    console.error("[CALLBACK]", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while submitting your request." });
  }
};

// GET /api/callback-requests — admin only
export const getCallbackRequests = async (req, res) => {
  try {
    const { status, hasEmail } = req.query;
    const filter = {};
    if (status && ["new", "read"].includes(status)) {
      filter.status = status;
    }
    if (hasEmail === "true") {
      filter.email = { $exists: true, $ne: "" };
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

// POST /api/callback-requests/send-email — admin only
export const sendEmailToSubscribers = async (req, res) => {
  try {
    let { recipients, subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: "Subject and message are required." });
    }

    let emailList = [];

    // Support sending to "all" subscribers
    if (
      recipients === "all" ||
      (Array.isArray(recipients) && recipients.includes("all"))
    ) {
      const allDocs = await CallbackRequest.find({
        email: { $exists: true, $ne: "" },
      }).select("email");

      emailList = Array.from(
        new Set(
          allDocs
            .map((d) => d.email?.trim().toLowerCase())
            .filter((e) => e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)),
        ),
      );
    } else {
      emailList = (Array.isArray(recipients) ? recipients : [recipients])
        .map((e) => String(e).trim().toLowerCase())
        .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
      emailList = Array.from(new Set(emailList));
    }

    if (emailList.length === 0) {
      return res
        .status(400)
        .json({ error: "No valid recipient email address found." });
    }

    await sendCustomNotificationEmail({
      recipients: emailList,
      subject,
      message,
    });

    res.json({
      success: true,
      message: `Email successfully sent to ${emailList.length} subscriber(s).`,
      count: emailList.length,
    });
  } catch (error) {
    console.error("[CALLBACK SEND EMAIL]", error.message);
    let userMsg = error.message || "Failed to send email.";
    if (
      error.message.includes("535") ||
      error.message.includes("BadCredentials") ||
      error.message.includes("Username and Password not accepted")
    ) {
      userMsg =
        "Gmail SMTP Authentication Failed: The Google App Password in backend/.env is invalid or expired. Please generate a new App Password at https://myaccount.google.com/apppasswords or use the 'Open in Gmail' button to broadcast directly.";
    }
    res.status(500).json({ error: userMsg, rawError: error.message });
  }
};
