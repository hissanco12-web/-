# KINGSMEN LINE

Luxury bilingual React/Vite storefront (`ar` RTL & `en` LTR) with a comprehensive private Atelier Admin Command Center (`/admin`).

## Architecture & Features
- **Public Storefront**: React 19 + Vite + React Router (`/ar` & `/en`)
- **Admin Command Center (`/admin`)**:
  - Brand Identity & Direct WhatsApp Concierge settings
  - Full SEO & Meta Tags control (Title, Description, Keywords, OpenGraph Share Image)
  - Social Media & Google Maps links (`Instagram`, `Snapchat`, `TikTok`, `X`, `Facebook`, `YouTube`, `Google Maps`)
  - Live Royal Theme & Color Customizer (4 presets + custom hex pickers)
  - Direct Mobile/Desktop Image Replacement (`ImageReplacer`) across Hero, Craftsmanship Banner, Products, Collections, Services, Offers, Gallery, and Articles
  - Full JSON Backup Export & Restore
- **Firebase Connection**:
  - Project: `kingofline-a2d40`
  - Auth: Firebase Authentication (`/admins/{uid}`)
  - Firestore CMS: `siteContent/public`
  - Storage: `media/public/{category}/{fileName}` with automatic client-side image compression fallback
- **Deployment Ready**: Configured for both Vercel (`vercel.json`) and Netlify (`netlify.toml` & `public/_redirects`).
