# KINGSMEN LINE — Firebase Connection

Project: `kingofline-a2d40`

The cleaned application uses:
- Firebase Authentication for the single admin login.
- Firestore `siteContent/public` as the canonical public CMS document.
- Firestore `admins/{uid}` for the single administrator authorization record.
- Firebase Storage `media/public/...` for public images.

No customer checkout/order database is required in this version. Product and service inquiries go directly to WhatsApp.
