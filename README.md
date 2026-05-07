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
- Shared visitor count and like button powered by CounterAPI, with browser storage fallback
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

The visitor and like counts use CounterAPI public counters so totals can update across devices. `localStorage` and `sessionStorage` are still used to remember whether the current browser already counted this session/like and to provide a fallback if the counter API is unavailable.
