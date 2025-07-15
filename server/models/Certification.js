import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  organization: {
    type: String,
    required: true,
    trim: true
  },
  verificationUrl: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Verification URL must be a valid URL'
    }
  },
  description: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Default sort by newest first
certificationSchema.index({ createdAt: -1 });

const Certification = mongoose.model('Certification', certificationSchema);

export default Certification;
