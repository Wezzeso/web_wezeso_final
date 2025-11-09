# Portfolio Hub - Team Showcase

A GitHub-inspired portfolio hub featuring individual portfolio websites for all team members. Clean, modern design with dark/light theme support.

## 🎯 Project Structure

```
Portfolio-Hub/
│
├── index.html          # Main hub page (GitHub repo style)
├── wezeso.html         # Wezeso's portfolio (UI/UX Designer)
├── sardor.html         # Sardor's portfolio (Full-Stack Developer)
├── alikhan.html        # Alikhan's portfolio (Backend Developer)
├── amirkhan.html       # Amirkhan's portfolio (Frontend Developer)
├── styles.css          # Shared styles for all pages
├── script.js           # JavaScript for portfolio pages
├── hub.js              # JavaScript for hub page
└── README.md           # This file
```

## ✨ Features

### Hub Page (index.html)
- 🏠 **GitHub Repository Style** - Clean, professional layout inspired by GitHub
- 👥 **Team Member Cards** - Showcase all 4 team members with their specialties
- 📖 **README Section** - Overview of the team and their skills
- 🔗 **Quick Navigation** - Easy access to individual portfolios
- 🌓 **Theme Toggle** - Dark/Light mode with persistent preference

### Individual Portfolios
- 🎨 **Personalized Content** - Each portfolio tailored to member's specialty
- 📱 **Fully Responsive** - Works on all devices
- 🖼️ **Project Showcases** - Display 6 featured projects per member
- 💼 **Experience Timeline** - Professional history and education
- 📧 **Contact Forms** - Easy way for visitors to get in touch
- 🔗 **Social Links** - Telegram, Instagram, GitHub integration
- ✨ **Smooth Animations** - Professional transitions and effects

## 👥 Team Members

### Wezeso - UI/UX & Branding Designer
- Specializes in user-centered design and brand identity
- Portfolio: `wezeso.html`

### Sardor - Full-Stack Developer
- Builds scalable web applications with modern technologies
- Portfolio: `sardor.html`

### Alikhan - Backend Developer
- Designs robust backend systems and APIs
- Portfolio: `alikhan.html`

### Amirkhan - Frontend Developer
- Creates beautiful, responsive user interfaces
- Portfolio: `amirkhan.html`

## 🚀 Getting Started

### View Locally

1. Open `index.html` in your web browser
2. Navigate through the hub to explore individual portfolios
3. No build process or server needed!

### Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Your site will be live at `https://yourusername.github.io/repository-name`

### Deploy to Netlify

1. Create account at https://www.netlify.com/
2. Drag and drop your folder
3. Your site is live instantly!

## 🎨 Customization Guide

### Update Team Member Information

#### 1. Hub Page (index.html)

Update the repo cards (around line 87-215):
- Change names, roles, and descriptions
- Update social media links
- Modify skill tags in `repo-topics`

#### 2. Individual Portfolios

Each portfolio file (wezeso.html, sardor.html, etc.):

**Personal Information:**
- Name and title in hero section
- About section content
- Statistics (projects, experience, etc.)

**Contact Details:**
- Email address
- Location
- Social media usernames and links

**Projects:**
- Update project titles and descriptions
- Replace placeholder icons with actual images
- Modify project data in script.js for case studies

**Skills:**
- Update skill categories and items
- Add/remove technologies based on expertise

**Experience:**
- Update timeline with actual work history
- Modify company names, dates, and descriptions

### Add Project Images

1. Create an `images` folder in the root directory
2. Add your project screenshots
3. Replace placeholder divs with:

```html
<div class="portfolio-image">
    <img src="images/project-name.jpg" alt="Project Name">
</div>
```

**Recommended image sizes:**
- Portfolio thumbnails: 800x500px (16:10 ratio)
- Format: JPG or PNG
- Keep file sizes under 500KB

### Customize Colors

In `styles.css`, modify the CSS variables (lines 2-52):

```css
:root {
    --accent-primary: #0969da;  /* Change main accent color */
    --accent-hover: #0550ae;    /* Change hover state */
}
```

### Contact Form Integration

The contact forms currently log to console. To make them functional:

**Option 1 - Use a form service:**
- [Formspree](https://formspree.io/)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- [Web3Forms](https://web3forms.com/)

**Option 2 - Add backend:**
- Connect to your own backend API
- Update form submission handler in `script.js`

## 🛠️ Technical Details

### Technologies Used
- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript (no frameworks)
- Font Awesome 6.4.0 (icons via CDN)

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Features
- CSS Grid & Flexbox for layouts
- CSS Variables for theming
- LocalStorage for theme persistence
- Intersection Observer for animations
- Responsive design with mobile-first approach

## 📝 Pages Overview

### Hub Page (index.html)
- **Navigation:** Simple header with theme toggle
- **Hero Section:** Project title, description, stats
- **README Section:** Team overview and information
- **Team Cards:** Grid of member cards with links
- **Footer:** Copyright and credits

### Portfolio Pages
- **Navigation:** Link back to hub, section links, theme toggle
- **Hero:** Name, title, description, CTAs, social links
- **About:** Bio, interests, statistics
- **Projects:** Grid showcase with modal details
- **Skills:** Technology and tool proficiencies
- **Experience:** Timeline of work/education history
- **Contact:** Info cards and contact form
- **Footer:** Copyright and social links

## 🎓 Use Cases

- **Student Projects:** Showcase your university portfolio projects
- **Team Presentations:** Present your team's collective work
- **Job Applications:** Professional portfolio for recruiters
- **Freelance Work:** Attract potential clients
- **Learning Portfolio:** Document your learning journey

## 📞 Support

Each team member can be contacted through their individual portfolio pages via:
- Email
- Telegram
- Instagram
- GitHub

## 📄 License

This project is free to use and modify for personal and educational purposes.

## 🙏 Credits

- Design inspiration: GitHub
- Icons: Font Awesome
- Fonts: System fonts for optimal performance

---

**Built with ❤️ by the team**

*Last updated: November 2024*
