import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

export const sendContactEmail = async (contactData) => {
  const { name, email, phone, date, timing, department, location, message, age, country, isInternational } = contactData;

  const transporter = createTransporter();

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'Not specified';

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f0f2f5; color: #1c1e21; -webkit-font-smoothing: antialiased; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.05); }
        .header { background: #0b1c43; padding: 40px 20px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 10px 0 0; font-size: 14px; opacity: 0.8; font-weight: 500; }
        .status-badge { display: inline-block; background: #ff6b00; color: white; padding: 6px 16px; border-radius: 50px; font-size: 12px; font-weight: 700; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 40px; }
        .section-label { font-size: 11px; font-weight: 800; color: #8d949e; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; display: block; }
        .info-card { background: #f7f8fa; border-radius: 16px; padding: 0; margin-bottom: 30px; border: 1px solid #edf0f2; overflow: hidden; }
        .info-row { padding: 16px 24px; border-bottom: 1px solid #edf0f2; display: flex; align-items: center; }
        .info-row:last-child { border-bottom: none; }
        .info-label { width: 130px; font-size: 11px; font-weight: 700; color: #8a94a6; text-transform: uppercase; letter-spacing: 0.5px; flex-shrink: 0; }
        .info-value { font-size: 14px; font-weight: 600; color: #1a1f36; word-break: break-all; }
        .message-section { margin-top: 30px; }
        .message-content { background: #ffffff; border-left: 4px solid #0b1c43; padding: 20px 24px; font-size: 15px; line-height: 1.7; color: #4a5568; font-style: italic; border-radius: 0 12px 12px 0; background: #f9fafb; }
        .footer { background: #fafbfc; padding: 30px; text-align: center; border-top: 1px solid #f0f2f5; }
        .footer p { margin: 0; font-size: 12px; color: #8a94a6; line-height: 1.5; }
        .footer a { color: #0b1c43; font-weight: 700; text-decoration: none; }
        @media only screen and (max-width: 600px) {
          .container { margin: 0; border-radius: 0; }
          .content { padding: 25px; }
          .info-row { flex-direction: column; align-items: flex-start; gap: 4px; }
          .info-label { width: 100%; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Popular Hospitals</h1>
          <p>Excellence in Healthcare</p>
          <div class="status-badge">${isInternational ? 'International Inquiry' : 'New Appointment Request'}</div>
        </div>
        
        <div class="content">
          <span class="section-label">Patient Information</span>
          <div class="info-card">
            <div class="info-row">
              <div class="info-label">Full Name</div>
              <div class="info-value">${name}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Contact Phone</div>
              <div class="info-value">${phone}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Email Address</div>
              <div class="info-value">${email}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Preferred Date</div>
              <div class="info-value">${formattedDate}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Timing Slot</div>
              <div class="info-value">${timing || 'Anytime'}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Department</div>
              <div class="info-value">${department || 'General'}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Branch</div>
              <div class="info-value">${location || 'Main Branch'}</div>
            </div>
            ${isInternational ? `
            <div class="info-row">
              <div class="info-label">Age</div>
              <div class="info-value">${age || 'N/A'}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Country</div>
              <div class="info-value">${country || 'N/A'}</div>
            </div>
            ` : ''}
          </div>
          
          <div class="message-section">
            <span class="section-label">Personal Message</span>
            <div class="message-content">
              ${message ? message : 'No specific requirements mentioned by the patient.'}
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>
            This is an automated notification from the <strong>Popular Hospitals Website</strong>.<br/>
            Please log in to the <a href="https://popularhospitals.in/admin-dashboard/contacts">Admin Panel</a> to manage this request.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${name} (via Popular Hospital)" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `${isInternational ? '🌍 ' : '📋 '}New ${isInternational ? 'International Inquiry' : 'Appointment Request'} from ${name} — Popular Hospitals`,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};
