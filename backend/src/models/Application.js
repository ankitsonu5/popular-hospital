import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    nationality: { type: String, required: true },
    identificationType: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    location: { type: String },
    resumeUrl: { type: String, required: true },
    photoUrl: { type: String },
    status: { 
      type: String, 
      enum: ['Applied', 'Shortlisted', 'Interviewing', 'Selected', 'Rejected'],
      default: 'Applied' 
    },
    appliedFor: { type: mongoose.Schema.Types.ObjectId, ref: 'Career' }, // Link to job posting if available
    isRead: { type: Boolean, default: false },
    isStarred: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);
export default Application;
