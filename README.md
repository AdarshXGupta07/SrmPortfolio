# Modern Portfolio Website

A beautiful, modern portfolio website built with React, Vite, and Tailwind CSS featuring smooth animations and interactive elements.

## Features

- 🎨 **Modern Design** - Clean, professional layout with gradient backgrounds
- 🌙 **Dark/Light Mode** - Toggle between themes
- 🎭 **Smooth Animations** - Train entrance animation and scroll-triggered animations
- 📱 **Responsive Design** - Works perfectly on all devices
- 🚀 **GitHub Integration** - Automatically fetches and displays your GitHub repositories
- 📜 **Certificate Management** - Upload and display your professional certificates
- 📧 **Contact Section** - Easy way for visitors to get in touch

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **GitHub API** - Dynamic project fetching
- **LeetCode API** - Coding statistics

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Customization

### Personal Information
Edit the following in `src/App.jsx`:
- Name and title in the hero section
- GitHub username in the API calls
- LeetCode username
- Email address
- Social media links
- Featured projects array

### Styling
- Colors and themes can be customized in `tailwind.config.js`
- Additional styles in `src/index.css`

### Content
- Update the About section with your personal story
- Modify the skills array with your technologies
- Add your own featured projects

## Project Structure

```
portfolio/
├── public/
├── src/
│   ├── App.jsx          # Main portfolio component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── vite.config.js       # Vite configuration
```

## Features Breakdown

### Train Animation
- Unique entrance animation showing multiple portfolio cards
- Smooth transition to main content

### GitHub Integration
- Fetches repositories automatically
- Shows stars, forks, and last updated dates
- Filters out forked repositories
- Displays programming languages and topics

### LeetCode Integration
- Shows coding challenge statistics
- Displays problem-solving progress
- Links to your LeetCode profile

### Interactive Elements
- Custom cursor that responds to hover states
- Smooth scroll navigation
- Modal windows for project details
- Responsive design for all screen sizes

## Deployment

This project can be deployed to any static hosting service:

- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Import project and deploy with zero configuration
- **GitHub Pages**: Use GitHub Actions for automated deployment

## License

MIT License - feel free to use this template for your own portfolio!

## Support

If you encounter any issues or have questions, please check the GitHub repository or create an issue.
