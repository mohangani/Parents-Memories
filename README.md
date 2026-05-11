# 💕 LifeTimeMemories

A beautiful static website to showcase cherished family memories — created as an anniversary gift.

---

## 📁 Folder Structure

```
LifeTimeMemories/
├── index.html        ← Main webpage (no edits needed)
├── style.css         ← All styling (no edits needed)
├── script.js         ← All functionality (no edits needed)
├── photos.js         ← ⭐ YOUR CONFIG FILE — edit this!
├── images/           ← ⭐ PUT YOUR PHOTOS HERE
│   ├── wedding-01.jpg
│   ├── family-01.jpg
│   └── ...
└── README.md         ← This file
```

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Add Your Photos
Drop all your image files into the `images/` folder.
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- Any size works — the gallery handles it automatically
- Name them however you like (e.g., `wedding-01.jpg`, `papa-birthday.png`)

### Step 2: Edit `photos.js`
Open `photos.js` in any text editor. It has two sections:

**A) PHOTOS array** — List every image:
```js
{
  file: "your-image-name.jpg",   // filename in images/ folder
  title: "Photo Title",          // shown on hover & lightbox
  caption: "Short description",  // shown below title
  category: "wedding"            // filter group
}
```

**B) SITE_CONFIG** — Personalize the website:
- Your parents' names
- Wedding date/year
- Milestone numbers (years, homes, children)
- Your dedication message

### Step 3: Open & Enjoy!
Just open `index.html` in a browser. That's it!

---

## 🌐 Hosting Options

This is a **100% static website** — no server needed! Host it free on:

| Service | How |
|---------|-----|
| **GitHub Pages** | Push to a repo → Settings → Pages → Deploy |
| **Netlify** | Drag & drop the folder at netlify.com/drop |
| **Vercel** | Import the folder at vercel.com |
| **Firebase** | `firebase deploy` |

---

## 📸 How Many Photos?

**As many as you want!** The gallery dynamically builds from your `photos.js` list.
- 10 photos? Works great.
- 50 photos? Looks beautiful.
- 200 photos? No problem — they lazy-load automatically.

Every photo you list in `photos.js` and place in `images/` will appear in the gallery in the exact order you listed them.

---

## ✨ Features

- 🎨 Warm Indian wedding aesthetic (burgundy, gold, cream)
- 📱 Fully responsive (mobile, tablet, desktop)
- 🖼️ Masonry photo gallery with category filters
- 🔍 Full-screen lightbox with keyboard & swipe navigation
- 📜 Beautiful timeline of your family's journey
- 💬 Rotating love quotes carousel
- 🔢 Animated milestone counters
- 💌 Personal dedication section
- ✨ Smooth scroll animations & floating petals
- ⚡ Lazy-loading images for fast performance

---

## ❤️ Categories

Default filter categories (customize in `photos.js`):
- `wedding` — Wedding & marriage ceremony
- `family` — Family portraits & daily life
- `celebrations` — Festivals, birthdays, anniversaries
- `travel` — Trips & vacations

You can use any category name — the filters auto-generate from your photos!

---

Made with love 💕
