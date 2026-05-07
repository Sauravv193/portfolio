# Saurav Kumar Singh - Portfolio

A modern, responsive portfolio website for Saurav Kumar Singh, built with HTML, CSS, and JavaScript. It showcases profile details, technical skills, featured projects, contact information, and small interactive touches for visitors.

## Current Status

- Light cream portfolio theme with glass-style cards and smooth animations
- Working preloader with visible loading percentage
- Hero section with profile image and floating technology cards
- About section with education, location, specialization, stats, and profile summary
- Skills section with animated progress bars
- Featured projects section with category filters
- Contact section with email, phone, location, GitHub, and LinkedIn links
- Interactive mini-game: "Catch the Signal"
- Local visitor count and like button using browser storage
- Simplified footer with 2026 copyright text
- Fully responsive layout for desktop, tablet, and mobile

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Font Awesome icons
- Google Fonts: Inter and Playfair Display

## Project Structure

```text
portfolio/
|-- index.html
|-- styles.css
|-- script.js
|-- photo.jpg
`-- README.md
```

## How to Run

Open `index.html` directly in a browser.

For a local server, you can also run:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Notes

The visitor and like counts are stored locally in the browser with `localStorage` and `sessionStorage`. A backend or database service would be needed for live global counts across all visitors.
