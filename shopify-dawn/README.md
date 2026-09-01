# We're Nuts About Mutts Inc — Dawn Theme Sections

Five ready-to-use sections for your Shopify **Dawn** theme. Once installed, you
(or anyone on your team) can edit every price, service, review, and color right
in Shopify's theme editor — **no code needed after setup**.

| Section | What it does |
| --- | --- |
| **NAM Awards** | A slim banner showing off your awards — 4× Southlands Best, Best on Chicago's South Side |
| **NAM Booking Steps** | "Booking is simple" — 3 clear steps so customers know exactly what to choose |
| **NAM Price List** | Customers tap their dog's size (Small / Medium / Large / XL) and every price updates instantly. Includes add-ons list |
| **NAM Pup Gallery** | (Optional — for later) Photo grid of your freshly-groomed pups, uploaded right in the theme editor |
| **NAM Reviews** | 5-star summary plus review cards — paste in your real Google/Facebook reviews |
| **NAM Book on Square** | "Ready for a fresh cut?" section sending customers to your Square booking site, where they pick a time and can message you |
| **NAM Appointment Form** | (Optional — not used with Square) On-site 4-step booking wizard that emails requests via Shopify's contact form |
| **NAM FAQ** | Tap-to-open frequently asked questions — cuts down the phone calls |
| **NAM Sticky Book Button** | A floating "🐾 Book Now" button that follows customers as they scroll |
| **NAM Follow Us** | Big Facebook / Instagram / TikTok / Amazon storefront buttons — great under the reviews |

## ⚡ Easiest install: upload the ready-made theme (recommended)

This folder includes **`nuts-about-mutts-dawn-theme.zip`** — the official
Shopify Dawn theme (v16.0.0) with every NAM section already inside and the
homepage already assembled in the right order, with your prices, reviews,
awards, FAQ, and social links pre-filled. Every Book button sends customers
to your **Square booking site**, where they pick a time and can message you.

1. In your Shopify admin, go to **Online Store → Themes**.
2. Scroll to **Theme library → Add theme → Upload zip file** and upload
   `nuts-about-mutts-dawn-theme.zip`. It appears as
   **"Dawn — Nuts About Mutts"** in your library (your live theme is untouched).
3. **Your Square booking link is already baked in** — every Book button
   points at `https://squareup.com/appointments/book/G2SZR8K8RV3M8`. Nothing
   to do here except tap a Book button in the preview to confirm it opens
   your booking site. (If the link ever changes, update it in **Customize**
   on: the Image banner button, NAM Booking Steps, NAM Price List, NAM Book
   on Square, and NAM Sticky Book Button.)
4. While in **Customize**: add your hero photo to the Image banner, and fix
   anything marked as placeholder (phone, address, hours, prices).
5. Add **Book an Appointment** to your menu: **Online Store → Navigation →
   Main menu → Add menu item**, pasting
   `https://squareup.com/appointments/book/G2SZR8K8RV3M8` as the URL.
6. When it looks right, click **Publish** on the new theme. Your old theme
   stays in the library as a backup you can switch back to anytime.

Note: uploading this theme starts fresh from Dawn's defaults — it does not
carry over colors, logo, or content from your current theme, so re-upload
your logo under **Customize → Header** and pick your colors in
**Theme settings**.

## Manual install into your existing theme (about 10 minutes)

1. In your Shopify admin go to **Online Store → Themes**.
2. **Make a backup first:** on your live theme click **⋯ → Duplicate**.
3. On your live theme click **⋯ → Edit code**.
4. In the left sidebar, under **Sections**, click **Add a new section**.
5. Name it `nam-price-list` (Shopify adds `.liquid` automatically), delete
   everything in the new file, and paste in the full contents of
   `sections/nam-price-list.liquid` from this folder. Click **Save**.
6. Repeat step 4–5 for each of the other files:
   - `nam-awards`
   - `nam-gallery`
   - `nam-reviews`
   - `nam-how-it-works`
   - `nam-book-cta`
   - `nam-faq`
   - `nam-sticky-book`
   - `nam-social`
   - `nam-booking` (optional — only if you ever want an on-site form
     instead of Square)
7. Close the code editor.

## Set up your pages (in the theme editor — no code)

1. In your Shopify admin, go to **Online Store → Pages → Add page** and create a
   page called **Book an Appointment** (leave the content empty). Save.
2. Go back to **Online Store → Themes → Customize**.
3. Use the page dropdown at the top to open your new **Book an Appointment**
   page, click **Add section**, and add **NAM Appointment Form**.
4. Open your **Home page** in the same dropdown and add, in order:
   - **NAM Awards** (right under your hero banner)
   - **NAM Booking Steps** (point its button at your Book an Appointment page)
   - **NAM Price List** (point its Book buttons at the same page)
   - **NAM Reviews**
   - **NAM FAQ** (edit the answers to match your salon's real policies —
     vaccination rules, payment, walk-ins)
   - **NAM Follow Us** (paste in your Facebook, Instagram, TikTok, and Amazon
     storefront links)
   - **NAM Sticky Book Button** (point it at the same page)
5. Add **Book Appointment** to your main menu: **Online Store → Navigation →
   Main menu → Add menu item**, linking to the Book an Appointment page.
6. Click **Save**. Done! 🐾

## Editing later

Everything is editable in **Customize** — click any section to change prices,
services, add-ons, reviews, colors, days, and time windows. The placeholder
prices and reviews match the mockup site in this repo; replace them with your
real ones.

## Where do bookings happen?

On your **Square booking site** — every Book button on the website opens it
in a new tab. Customers pick their service and time there, and can message
you through Square, so appointments, reminders, and messages all stay in the
Square app you already use. (The old on-site NAM Appointment Form section is
still included but unused; it's there if you ever want a website form again.)

## Tips for the rest of the modern look

- **Hero:** use Dawn's built-in **Image banner** section with a great photo of a
  freshly groomed pup, heading like "Fresh cuts. Happy mutts.", and a button
  labeled **Book an Appointment** linking to your booking page.
- **Photos win (when you're ready):** the **NAM Pup Gallery** section is
  installed but not on the page yet — once you've snapped some photos, add it
  to your homepage from **Add section** and upload them right in the editor.
  Phone photos work great — natural light, get on the dog's eye level, and
  shoot the "after" in front of a plain wall. Before-and-after pairs are
  marketing gold. Start collecting now: one quick photo of each pup at pickup
  and you'll have a full gallery within a couple of weeks.
- **Colors & fonts:** in **Customize → Theme settings**, set your accent colors
  (the sections default to teal `#1F7A70` and coral `#F4845F` — change them in
  each section's settings to match whatever you pick).
- **Announcement bar:** Dawn's announcement bar is a great spot for
  "📞 Call or book online — new clients welcome!"
- **Social icons in your header & footer:** Dawn shows social icons
  automatically once you paste your links into **Customize → Theme settings →
  Social media**. Fill those in too, so the icons appear in Dawn's own footer
  alongside the NAM Follow Us section.
