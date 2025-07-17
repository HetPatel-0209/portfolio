import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Project, Experience, Certification } from './models/index.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB error:', error);
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('Email transporter verification failed:', error);
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Het Patel Portfolio API is running!' });
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: 1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { category, title, description, technologies, githubUrl, projectUrl } = req.body;
    
    if (!category || !title || !description || !technologies || !Array.isArray(technologies)) {
      return res.status(400).json({ 
        message: 'Missing required fields: category, title, description, and technologies (array)' 
      });
    }

    const newProject = new Project({
      category: category.trim(),
      title: title.trim(),
      description: description.trim(),
      technologies: technologies.map(tech => tech.trim()),
      githubUrl: githubUrl?.trim() || '',
      projectUrl: projectUrl?.trim() || ''
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        error: error.message 
      });
    }
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { category, title, description, technologies, githubUrl, projectUrl } = req.body;
    
    const updateData = {};
    if (category) updateData.category = category.trim();
    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (technologies && Array.isArray(technologies)) {
      updateData.technologies = technologies.map(tech => tech.trim());
    }
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl.trim();
    if (projectUrl !== undefined) updateData.projectUrl = projectUrl.trim();

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        error: error.message 
      });
    }
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ 
      message: 'Project deleted successfully', 
      deletedProject: deletedProject 
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ message: 'Error fetching experiences', error: error.message });
  }
});

app.post('/api/experiences', async (req, res) => {
  try {
    const { title, company, location, startDate, endDate, description, technologies, achievements } = req.body;
    
    if (!title || !company || !location || !startDate || !description) {
      return res.status(400).json({ 
        message: 'Missing required fields: title, company, location, startDate, and description' 
      });
    }

    const newExperience = new Experience({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      startDate: startDate.trim(),
      endDate: endDate?.trim() || '',
      description: description.trim(),
      technologies: Array.isArray(technologies) ? technologies.map(tech => tech.trim()) : [],
      achievements: Array.isArray(achievements) ? achievements.map(ach => ach.trim()) : []
    });

    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    console.error('Error creating experience:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        error: error.message 
      });
    }
    res.status(500).json({ message: 'Error creating experience', error: error.message });
  }
});

app.put('/api/experiences/:id', async (req, res) => {
  try {
    const { title, company, location, startDate, endDate, description, technologies, achievements } = req.body;
    
    const updateData = {};
    if (title) updateData.title = title.trim();
    if (company) updateData.company = company.trim();
    if (location) updateData.location = location.trim();
    if (startDate) updateData.startDate = startDate.trim();
    if (endDate !== undefined) updateData.endDate = endDate.trim();
    if (description) updateData.description = description.trim();
    if (technologies && Array.isArray(technologies)) {
      updateData.technologies = technologies.map(tech => tech.trim());
    }
    if (achievements && Array.isArray(achievements)) {
      updateData.achievements = achievements.map(ach => ach.trim());
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json(updatedExperience);
  } catch (error) {
    console.error('Error updating experience:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid experience ID format' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        error: error.message 
      });
    }
    res.status(500).json({ message: 'Error updating experience', error: error.message });
  }
});

app.delete('/api/experiences/:id', async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    
    if (!deletedExperience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json({ 
      message: 'Experience deleted successfully', 
      deletedExperience: deletedExperience 
    });
  } catch (error) {
    console.error('Error deleting experience:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid experience ID format' });
    }
    res.status(500).json({ message: 'Error deleting experience', error: error.message });
  }
});

app.get('/api/certifications', async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    res.json(certifications);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ message: 'Error fetching certifications', error: error.message });
  }
});

app.post('/api/certifications', async (req, res) => {
  try {
    const { name, organization, verificationUrl, description, skills } = req.body;
    
    // Validation
    if (!name || !organization || !description) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, organization, and description' 
      });
    }

    const newCertification = new Certification({
      name: name.trim(),
      organization: organization.trim(),
      verificationUrl: verificationUrl?.trim() || '',
      description: description.trim(),
      skills: Array.isArray(skills) ? skills.map(skill => skill.trim()) : []
    });

    const savedCertification = await newCertification.save();
    res.status(201).json(savedCertification);
  } catch (error) {
    console.error('Error creating certification:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        error: error.message 
      });
    }
    res.status(500).json({ message: 'Error creating certification', error: error.message });
  }
});

app.put('/api/certifications/:id', async (req, res) => {
  try {
    const { name, organization, verificationUrl, description, skills } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name.trim();
    if (organization) updateData.organization = organization.trim();
    if (verificationUrl !== undefined) updateData.verificationUrl = verificationUrl.trim();
    if (description) updateData.description = description.trim();
    if (skills && Array.isArray(skills)) {
      updateData.skills = skills.map(skill => skill.trim());
    }

    const updatedCertification = await Certification.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCertification) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    res.json(updatedCertification);
  } catch (error) {
    console.error('Error updating certification:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid certification ID format' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        error: error.message 
      });
    }
    res.status(500).json({ message: 'Error updating certification', error: error.message });
  }
});

app.delete('/api/certifications/:id', async (req, res) => {
  try {
    const deletedCertification = await Certification.findByIdAndDelete(req.params.id);
    
    if (!deletedCertification) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    res.json({ 
      message: 'Certification deleted successfully', 
      deletedCertification: deletedCertification 
    });
  } catch (error) {
    console.error('Error deleting certification:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid certification ID format' });
    }
    res.status(500).json({ message: 'Error deleting certification', error: error.message });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER || 'hetptl09104@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    
    if (error.code === 'EAUTH') {
      res.status(500).json({ 
        message: 'Email authentication failed. Please check your email configuration.',
        error: 'Authentication Error'
      });
    } else if (error.code === 'ENOTFOUND') {
      res.status(500).json({ 
        message: 'Email server not found. Please check your internet connection.',
        error: 'Network Error'
      });
    } else {
      res.status(500).json({ 
        message: 'Error sending message. Please try again later.',
        error: 'Email Error'
      });
    }
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const startServer = async () => {
  try {
    await mongoose.connection.asPromise();
    
    app.listen(PORT, () => {
      console.log(`Server is running`);
      console.log(`MongoDB connection status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
