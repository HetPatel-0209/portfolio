# Het Patel - Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Node.js. Features dynamic content management, downloadable resume, contact form with email integration, and beautiful tech stack showcase.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Content**: Add/edit experience and certifications through admin panel
- **Resume Download**: One-click resume download functionality
- **Contact Form**: Integrated contact form with email notifications using Nodemailer
- **Tech Stack Icons**: Beautiful icons showcasing technical skills
- **Admin Panel**: Secure admin interface for content management
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Modern UI**: Clean, professional design with Tailwind CSS

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request body parsing

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gmail account (for email functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```env
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password
     PORT=5000
     ADMIN_PASSWORD=your-admin-password
     ```

4. **Gmail Setup** (for contact form)
   - Enable 2-factor authentication on your Gmail account
   - Generate an app password for the portfolio app
   - Use the app password in the `EMAIL_PASS` variable

5. **Resume Setup**
   - Place your resume PDF file in the `public` folder
   - Name it `het-patel-resume.pdf` or update the path in `Hero.jsx`

### Running the Application

#### Development Mode
```bash
# Run both frontend and backend
npm start

# Or run separately
npm run dev      # Frontend only (port 3000)
npm run server   # Backend only (port 5000)
```

#### Production Build
```bash
npm run build
npm run server
```

### Admin Panel Access

1. Click the user icon in the navigation bar
2. Enter the admin password (default: `admin123`)
3. Manage experiences and certifications

## API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get single experience
- `POST /api/experiences` - Add new experience
- `PUT /api/experiences/:id` - Update experience
- `DELETE /api/experiences/:id` - Delete experience

### Certifications
- `GET /api/certifications` - Get all certifications
- `GET /api/certifications/:id` - Get single certification
- `POST /api/certifications` - Add new certification
- `PUT /api/certifications/:id` - Update certification
- `DELETE /api/certifications/:id` - Delete certification

### Contact
- `POST /api/contact` - Send contact form email

## Customization

### Personal Information
Update the following files with your information:
- `src/components/Hero.jsx` - Name, title, social links
- `src/components/About.jsx` - About section content
- `src/components/Contact.jsx` - Contact information
- `src/components/Footer.jsx` - Footer details

Built with ❤️ by Het Patel+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
