# Vencent Domingo - Portfolio Website 🌐

Welcome to my personal portfolio website! This project serves as a showcase of my skills, professional experience, and the projects I've built. I am a **Senior Frontend Web Developer** specializing in WordPress architecture, React, and Next.js.

## Tech Stack 🛠️

- **Next.js (App Router)**: A React framework for building fast, SEO-friendly web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development and custom responsive designs.
- **Framer Motion**: A powerful animation library that powers the smooth transitions and scroll animations throughout the site.
- **React Icons**: Scalable vector icons for clean UI elements.

## Features ✨

- **Modern App Router Architecture**: Built using the latest Next.js Directory Routing (`src/app`).
- **Fully Responsive**: Optimized for desktops, tablets, and mobile devices.
- **Dark/Light Mode**: Integrated theme switcher for comfortable viewing in any environment.
- **Interactive Animations**: Micro-interactions and scroll-based animations using Framer Motion.
- **SEO Optimized**: Static metadata integrated across all routes.
- **Static Export Ready**: Configured to be exported as static HTML/CSS/JS for deployment on GitHub Pages or similar static hosting platforms.

## Getting Started 🏁

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/My-Portfolio-Next-JS.git
```

2. **Install dependencies:**
```bash
cd My-Portfolio-Next-JS
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production 🚀

To generate a static export of the site (e.g. for GitHub Pages):

```bash
npm run build
```

This will create an `out/` folder containing the static HTML/CSS/JS files.

## Project Structure 🗂️

```
My-Portfolio-Next-JS/
├── public/
│   ├── images/
│   └── Vencent_Domingo_Resume.pdf
├── src/
│   ├── app/                 # Next.js App Router Pages
│   │   ├── about/
│   │   ├── blogs/
│   │   ├── contact/
│   │   ├── projects/
│   │   ├── services/
│   │   ├── layout.js        # Global layout & metadata
│   │   └── page.js          # Home page
│   ├── components/          # Reusable React components
│   │   ├── AnimatedText.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── NavBar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   └── styles/
│       └── globals.css      # Global Tailwind directives
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json
```

## Contact 📫

- **LinkedIn**: [linkedin.com/in/vencent-domingo](https://linkedin.com/in/vencent-domingo)
- **Email**: contact@vencentdomingo.com
