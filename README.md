# 🚌 School Transport Dispersal Management System

A full-stack web application for managing student dispersal data across school cycles, with dashboards, reports, and PDF downloads.

---

## 📋 Features

- **Login system** with Firebase Authentication
- **Cycle selector** — Kindergarten (KG1–2), Primary (G1–5), Middle (G6–8), Higher (G9–12)
- **Student management** — Add, Edit, Delete students
- **Excel import** — Bulk upload students from .xlsx file
- **Full CRUD** — all fields including new Sibling (Yes/No) column
- **Reports** — Grade-wise, Section-wise, Cycle-wise, Whole School
- **PDF download** — jsPDF with auto-table
- **CSV export** — all scopes

### Student Fields
| Field | Type | Notes |
|-------|------|-------|
| Student Name | Text | Required |
| Paradigm ID | Text | Optional |
| Grade | Dropdown | KG1–G12 |
| Section | Dropdown | A,B,C,D,E,F,AB,BB,CB,DB,AG,BG,CG,DG |
| Mode of Dispersal | Dropdown | School Bus / Own Transport / By Walk |
| Bus No/Route | Text | Optional |
| Pick-up Name | Dropdown | Parent / Car Lift / Driver / Guardian / Sibling / Other |
| Parent Contact | Text | Phone number |
| **Sibling** | **Dropdown** | **Yes / No** ← New column |
| Walk Undertaking (Consent) | Dropdown | Yes / No |
| Emergency Contact | Text | Phone number |

---

## 🔧 Setup Guide

### Step 1 — Create Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"** → name it (e.g. `school-transport`)
3. Disable Google Analytics (optional) → **Create project**

### Step 2 — Enable Authentication

1. In Firebase Console → **Build → Authentication**
2. Click **"Get started"**
3. Enable **Email/Password** provider
4. Go to **Users** tab → **Add user**
5. Enter admin email (e.g. `admin@yourschool.com`) and a strong password
6. Click **Add user**

### Step 3 — Create Firestore Database

1. In Firebase Console → **Build → Firestore Database**
2. Click **"Create database"**
3. Choose **Start in test mode** (you'll secure it later)
4. Select your region → **Done**

### Step 4 — Get Firebase Config

1. In Firebase Console → ⚙️ **Project Settings** (gear icon)
2. Scroll to **"Your apps"** → Click **Web** (`</>`)
3. Register app → copy the `firebaseConfig` object

### Step 5 — Update firebase-config.js

Open `js/firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",              // ← Your API key
  authDomain: "my-school.firebaseapp.com",
  projectId: "my-school",
  storageBucket: "my-school.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 6 — Secure Firestore Rules

In Firebase Console → **Firestore → Rules**, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Click **Publish**.

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create GitHub Repository

1. Go to [https://github.com](https://github.com) → **New repository**
2. Name it: `school-transport-system`
3. Set to **Public** (required for free GitHub Pages)
4. Click **Create repository**

### Step 2 — Push Files

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit: School Transport System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/school-transport-system.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In GitHub repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / Folder: `/ (root)`
4. Click **Save**
5. Your app will be live at: `https://YOUR_USERNAME.github.io/school-transport-system/`

### Step 4 — Add GitHub Pages URL to Firebase Auth

1. Firebase Console → **Authentication → Settings**
2. **Authorized domains** → **Add domain**
3. Enter: `YOUR_USERNAME.github.io`
4. Click **Add**

---

## 📁 Project Structure

```
school-transport/
├── login.html          ← Login page (entry point)
├── dashboard.html      ← Main dashboard with stats
├── students.html       ← Student CRUD management
├── reports.html        ← Analytics & PDF reports
├── css/
│   └── style.css       ← All styles
└── js/
    ├── firebase-config.js  ← Firebase setup & config
    └── utils.js            ← Shared utilities
```

---

## 📊 Excel Import Format

### Required Column Names (exact match, case-sensitive)

| Column Name | Example Value | Notes |
|-------------|---------------|-------|
| `studentName` | Ahmed Al Rashid | Full name |
| `paradigmId` | PAR-00001 | School ID |
| `grade` | G5 | Must be: KG1, KG2, G1–G12 |
| `section` | A | Must be valid section |
| `dispersalMode` | School Bus | Exactly: "School Bus", "Own Transport", "By Walk" |
| `busRoute` | Bus 3 / Route A | Optional |
| `pickupName` | Parent | Optional |
| `parentContact` | +971501234567 | Optional |
| `sibling` | Yes | Yes or No |
| `walkUndertaking` | No | Yes or No |
| `emergencyContact` | +971502345678 | Optional |

### Notes on Excel Import
- Download the template from the Import dialog in the app
- Row 1 must be headers (exact column names above)
- Data starts from Row 2
- The app will auto-detect `Sibling`, `Walk Undertaking (Yes/No)`, `Student Name` etc. as alternative column names
- Maximum recommended: 500 rows per import
- Students without Name or Grade will be skipped

### Sample Excel Data

| studentName | paradigmId | grade | section | dispersalMode | busRoute | pickupName | parentContact | sibling | walkUndertaking | emergencyContact |
|------------|-----------|-------|---------|---------------|----------|------------|--------------|---------|----------------|-----------------|
| Ahmed Al Rashid | PAR-001 | G5 | A | School Bus | Bus 3 | Parent | +971501111111 | Yes | No | +971502222222 |
| Fatima Hassan | PAR-002 | KG1 | B | Own Transport | | Car Lift | +971503333333 | No | No | +971504444444 |
| Sara Al Mansoori | PAR-003 | G8 | AB | By Walk | | | +971505555555 | Yes | Yes | +971506666666 |

---

## 📄 Reports Available

### Scope Options
- **Whole School** — all students
- **Kindergarten** — KG1, KG2
- **Primary** — G1–G5
- **Middle** — G6–G8
- **Higher** — G9–G12

### For Each Scope (Grade & Section filters available)

| Report | Details |
|--------|---------|
| Summary Stats | Total, Bus, Own Transport, Walk, Siblings, Consent |
| Dispersal Mode | Bar chart with percentages |
| Sibling Status | Has sibling vs No sibling |
| Walk Consent | Yes/No for By Walk students only |
| Students by Grade | Distribution across grades |
| Section Breakdown Table | Per section: total + all mode counts |
| Student Detail List | Full list with all columns |

### PDF Contents
- School header with scope and date
- Summary stat boxes
- Section breakdown table
- Full student detail table
- Page numbers

---

## 🛠 Troubleshooting

| Problem | Solution |
|---------|----------|
| Login fails | Check email/password in Firebase Auth Users |
| Firebase error | Verify `firebaseConfig` values in `firebase-config.js` |
| Data not saving | Check Firestore Rules allow authenticated writes |
| GitHub Pages 404 | Ensure `login.html` exists at root, not in subfolder |
| Import fails | Verify column names match exactly (download template) |
| PDF empty | Check jsPDF CDN loaded (requires internet) |

---

## 🔐 Security Checklist

- [ ] Change Firestore from "test mode" to authenticated-only rules
- [ ] Use strong admin password (12+ characters)
- [ ] Only add trusted domains in Firebase Auth settings
- [ ] Regularly review Firebase Usage dashboard

---

*Built with Firebase, vanilla JS, jsPDF, and SheetJS. No backend server required.*
