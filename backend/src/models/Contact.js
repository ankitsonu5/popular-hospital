import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, maxlength: 200 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    date: { type: String, default: '' },
    timing: { type: String, default: '' },
    department: { type: String, default: '' },
    location: { type: String, default: '' },
    message: { type: String, default: '', maxlength: 2000 },
    agreedToTerms: { type: Boolean, default: false },
    age: { type: String, default: '' },
    country: { type: String, default: '' },
    isInternational: { type: Boolean, default: false },
    status: { type: String, enum: ['new', 'read'], default: 'new' },
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
