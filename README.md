# Portfolio

Things I did, things I'm doing, things I would like to do

A simple, modern portfolio webpage with a nostalgic theme inspired by early 2000s web design.

## Features

- ✨ Glitch effect on hover for the main title
- 📱 Responsive design that works on all devices
- 🔧 Easy to customize through JSON configuration
- 🚀 No build process required - just open `index.html`

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Open the portfolio**
   - Simply open `index.html` in your web browser
   - Or use a local server: `python -m http.server 8000`

## Customization Guide

### Adding/Editing Projects

Edit the `projects.json` file to add or modify your projects:

```json
{
  "projects": [
    {
      "title": "Your Project Name",
      "description": "Description of your project",
      "tags": ["Tag1", "Tag2", "Tag3"],
      "link": "https://github.com/yourusername/project"
    }
  ]
}
```

### Customizing Personal Information

Edit `index.html` to update:
- Your name/title in the `<h1>` tag
- The subtitle/tagline
- About section content
- Contact links (email, GitHub, LinkedIn)

### Changing Colors

Edit `style.css` and modify the CSS variables in the `:root` section:

```css
:root {
    --primary-bg: #1a1a2e;        /* Main background color */
    --secondary-bg: #16213e;      /* Secondary background */
    --accent-color: #0f3460;      /* Accent elements */
    --highlight: #e94560;         /* Highlight/accent color */
    --text-primary: #f1f1f1;      /* Main text color */
    --text-secondary: #a6a6a6;    /* Secondary text color */
    --border-color: #533483;      /* Border colors */
}
```

## File Structure

```
portfolio/
├── index.html       # Main HTML file
├── style.css        # All styling and theme
├── script.js        # Dynamic project loading
├── projects.json    # Project configuration
└── README.md        # This file
```

## Technologies Used

- Pure HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- JSON for data configuration

## License

Feel free to use this template for your own portfolio!
