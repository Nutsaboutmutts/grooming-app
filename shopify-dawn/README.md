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
| **NAM Appointment Form** | Modern 4-step booking wizard (size → service → extras → contact info) with a live price estimate. Requests are emailed to you through Shopify's built-in contact form — no extra apps |
| **NAM FAQ** | Tap-to-open frequently asked questions — cuts down the phone calls |
| **NAM Sticky Book Button** | A floating "🐾 Book Now" button that follows customers as they scroll |
| **NAM Follow Us** | Big Facebook / Instagram / TikTok / Amazon storefront buttons — great under the reviews |

## Install (one time, about 10 minutes)

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
   - `nam-booking`
   - `nam-faq`
   - `nam-sticky-book`
   - `nam-social`
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

## Where do booking requests go?

The appointment form uses Shopify's built-in contact form, so each request is
emailed to your store's **sender email** (check it under **Settings →
Notifications** in your Shopify admin). The email includes dog size, service,
add-ons, estimated total, preferred day/time, and the customer's contact info.

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
