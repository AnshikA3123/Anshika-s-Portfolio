# Anshika Tomar - Developer Portfolio

A modern, full-stack professional developer portfolio built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB.

## Features

- **Modern UI**: Smooth scroll animations, scroll progress indicator, dark/light mode toggle
- **Projects Section**: Filterable project cards (All/Web/ML/Backend/Desktop), modal popup, Live Demo & GitHub buttons
- **Skills Section**: Grouped by Frontend, Backend, Database, Tools with animated progress bars and icons
- **Contact Form**: Working form with backend storage, validation, and optional email notifications
- **Admin Panel**: Protected route to view contact messages
- **Production Ready**: SEO meta tags, Open Graph, favicon, 404 page, responsive design

## Project Structure

```
potfolio/
├── index.html          # Main portfolio page
├── 404.html            # Custom 404 page
├── admin.html          # Admin panel (view messages)
├── style.css            # Core styles (DO NOT modify structure)
├── enhancements.css    # Additional UI effects
├── config.js            # App config (projects, skills, API URL)
├── script.js            # Main JavaScript
├── backend/             # Node.js + Express API
│   ├── server.js        # Entry point
│   ├── package.json
│   ├── .env.example     # Copy to .env
│   ├── models/
│   │   └── Message.js   # MongoDB schema
│   ├── routes/
│   │   ├── contact.js   # POST /api/contact
│   │   └── admin.js    # GET/PATCH /api/admin/messages
│   ├── middleware/
│   │   └── auth.js      # Admin token auth
│   └── utils/
│       └── email.js     # Nodemailer
└── README.md
```

## Quick Start

### 1. Frontend Only (Static)

Open `index.html` in a browser or use any static server:

```bash
npx serve .
# or
python -m http.server 8000
```

Contact form will run in demo mode (shows success without backend).

### 2. Full Stack (Frontend + Backend)

**Prerequisites**: Node.js, MongoDB (local or Atlas)

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env: MONGODB_URI, ADMIN_SECRET, optional SMTP_* for email
npm install
npm start
```

Server runs at `http://localhost:5000`

- Portfolio: `http://localhost:5000`
- Admin: `http://localhost:5000/admin`

**Admin Login**: Use the value of `ADMIN_SECRET` from `.env` as the token.

### 3. Environment Variables

| Variable      | Description                         | Required |
|---------------|-------------------------------------|----------|
| PORT          | Server port (default 5000)          | No       |
| MONGODB_URI   | MongoDB connection string            | Yes      |
| ADMIN_SECRET  | Token for admin panel auth          | Yes      |
| ADMIN_EMAIL   | Email to receive contact notifications | No    |
| SMTP_HOST     | SMTP server (e.g. smtp.gmail.com)   | No       |
| SMTP_PORT     | SMTP port (587 or 465)              | No       |
| SMTP_USER     | SMTP username                       | No       |
| SMTP_PASS     | SMTP password (Gmail: App Password)| No       |

## API Endpoints

| Method | Endpoint              | Description                    | Auth   |
|--------|------------------------|--------------------------------|--------|
| POST   | /api/contact           | Submit contact form            | No     |
| GET    | /api/admin/messages   | List all messages             | Bearer |
| PATCH  | /api/admin/messages/:id | Update message (read/replied) | Bearer |

## Customization

- **Projects**: Edit `config.js` → `CONFIG.PROJECTS`
- **Skills**: Edit `config.js` → `CONFIG.SKILLS`
- **API URL**: Edit `config.js` → `CONFIG.API_BASE_URL` for production

## Deployment

- **Frontend**: Deploy `index.html`, `style.css`, `enhancements.css`, `config.js`, `script.js` to Vercel/Netlify.
- **Backend**: Deploy `backend/` to Render/Railway/Heroku with MongoDB (Atlas).
- Set `CONFIG.API_BASE_URL` to your backend URL in production.

## License

Private/Portfolio use.
