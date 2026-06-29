# Saurav Kumar Singh - Portfolio

A modern, responsive portfolio website, built with HTML, CSS, and JavaScript. It showcases profile details, technical skills, featured projects, contact information, and small interactive touches for visitors.


## Tech Stack

- HTML5
- CSS3
- JavaScript
- Font Awesome icons
- Google Fonts: Inter and Playfair Display

## Project Structure

```text
portfolio/
|-- assets/
|   `-- projects/
|       |-- saurav.jpg
|       `-- project thumbnails
|-- index.html
|-- styles.css
|-- script.js
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

The visitor and like counts use public CountAPI counters so totals can update across devices. `localStorage` is still used to remember whether the current browser already liked the portfolio and to provide a fallback if the counter API is unavailable.
