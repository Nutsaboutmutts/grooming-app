import { useEffect, useState } from "react";
import StaffApp from "./StaffApp";

/* ════════════════════════════════════════════════════════════════════════
   EDIT ME! — All salon info, prices, and reviews live right here.
   Change any text, price, or review below and the whole site updates.
   ════════════════════════════════════════════════════════════════════════ */

const SALON = {
  name: "We're Nuts About Mutts Inc",
  bookingUrl: "https://squareup.com/appointments/book/G2SZR8K8RV3M8",
  tagline: "Where every pup leaves looking pawsitively fabulous",
  phone: "(708) 620-8888",
  email: "hello@nutsaboutmutts.com",
  address: "123 Main Street, Your Town, USA",
  hours: [
    ["Monday – Friday", "8:00 AM – 5:00 PM"],
    ["Saturday", "9:00 AM – 3:00 PM"],
    ["Sunday", "Closed"],
  ],
  // Put your real social media links here:
  socials: [
    { name: "Facebook",  url: "https://www.facebook.com/werenutsaboutmutts" },
    { name: "Instagram", url: "https://www.instagram.com/werenutsaboutmutts" },
    { name: "TikTok",    url: "https://www.tiktok.com/@werenutsaboutmutts" },
    { name: "Amazon",    url: "https://www.amazon.com/shop/werenutsaboutmutts" },
  ],
};

// Dog sizes — step 1 of booking. Prices below are per size.
const SIZES = [
  { id: "small",  label: "XSmall/Small", range: "Under 20 lbs",  icon: "🐕‍🦺", examples: "Yorkie, Chihuahua, Shih Tzu" },
  { id: "medium", label: "Medium",       range: "20 – 39 lbs",   icon: "🐕",  examples: "Beagle, Cocker Spaniel, Corgi" },
  { id: "large",  label: "Large",        range: "40 – 79 lbs",   icon: "🦮",  examples: "Lab, Golden Retriever, Boxer" },
  { id: "xl",     label: "Extra Large",  range: "80+ lbs",       icon: "🐩",  examples: "Great Dane, Newfoundland, Mastiff" },
];

// Main services — step 2 of booking. price is per size id above.
const SERVICES = [
  {
    id: "fullcut",
    name: "Full Body Cut",
    short: "Full Body Cut",
    icon: "✂️",
    popular: true,
    from: true,
    desc: "The Full Mutt Makeover! Bath, blow-dry, full haircut & style, nail trim, and ear cleaning. Short cuts start at the price shown — long cuts and doodles & poodles run a little more.",
    includes: ["Warm bath & massage", "Blow-dry & brush-out", "Full haircut & styling", "Nail trim", "Ear cleaning", "Bow or bandana"],
    price: { small: 85, medium: 100, large: 135, xl: 170 },
    time: "2¼ – 3¼ hours",
  },
  {
    id: "trimup",
    name: "Trim-Up",
    short: "Trim-Up",
    icon: "🐾",
    popular: false,
    desc: "Bath plus a tidy trim — face, feet, and sanitary — without the full haircut. Perfect between full grooms.",
    includes: ["Warm bath & massage", "Blow-dry & brush-out", "Face, feet & sanitary trim", "Nail trim", "Ear cleaning"],
    price: { small: 70, medium: 85, large: 115, xl: 145 },
    time: "2 – 3 hours",
  },
  {
    id: "bathonly",
    name: "Bath Only — No Cut",
    short: "Bath Only",
    icon: "🛁",
    popular: false,
    from: true,
    desc: "A squeaky-clean bath, blow-dry, and full brush-out — no haircut. Short-haired pups start at the price shown; long or double coats and de-shedding baths run a little more.",
    includes: ["Warm bath & massage", "Blow-dry & brush-out", "Cologne spritz", "Bandana"],
    price: { small: 40, medium: 55, large: 75, xl: 95 },
    time: "1¼ – 2¾ hours",
  },
  {
    id: "puppy",
    name: "Puppy Trim",
    short: "Puppy Trim",
    icon: "🐶",
    popular: false,
    desc: "A gentle, patient first trim for puppies 5 months & under — short, sweet, and full of treats. Small breeds $40, large breeds $50.",
    includes: ["Gentle intro bath", "Light trim", "Nail trim", "Lots of treats & praise"],
    price: { small: 40, medium: 40, large: 50, xl: 50 },
    time: "2 hours",
  },
];

// Add-ons — step 3 of booking (optional extras, flat price).
const ADDONS = [
  { id: "nailgrind",  name: "Nail Grinding",                 icon: "💅", price: 15 },
  { id: "teeth",      name: "Tooth Brushing",                icon: "🦷", price: 10 },
  { id: "facial",     name: "Blueberry Facial",              icon: "🫐", price: 8 },
  { id: "conditioner",name: "Conditioner",                   icon: "💧", price: 8 },
  { id: "specialty",  name: "Specialty Shampoo",             icon: "🧴", price: 8 },
  { id: "dematting",  name: "Dematting / Extra Brushing",    icon: "🪮", price: 20 },
  { id: "xmatting",   name: "Excessive Matting",             icon: "⚠️", price: 25 },
  { id: "ozone",      name: "Ozone Spa Tub Soak — NEW! (small–medium dogs)", icon: "🫧", price: 25, smOnly: true },
  { id: "spa",        name: "Spa Package",                   icon: "✨", price: 20 },
  { id: "spaplus",    name: "Spa Package + Nail Grinding",   icon: "✨", price: 25 },
  { id: "deshedsm",   name: "De-Shedding (XSmall–Medium)",   icon: "💨", price: 15 },
  { id: "deshedlg",   name: "De-Shedding (Large/X-Large)",   icon: "💨", price: 25 },
  { id: "glands",     name: "Anal Gland Expression",         icon: "🧼", price: 15 },
  { id: "express",    name: "Express Service (book ahead)",  icon: "⚡", price: 20 },
];

// Cat services — cats are booked by phone, so these show as a simple list.
const CAT_SERVICES = [
  { name: "Cat Bath — Short-haired", price: "$65", time: "2 hrs" },
  { name: "Cat Bath — Long-haired",  price: "$80", time: "2 hrs" },
  { name: "Cat Nail Trim",           price: "$15", time: "15 min" },
  { name: "Cat Shave",               price: "Call for quote", time: "" },
];

// Gallery — put your best photos here! Either paste web links (e.g. from your
// Instagram) into src, or drop image files into a public/images folder and use
// src: "/images/bella.jpg". Cards without a src show a friendly placeholder.
const GALLERY = [
  { src: "", pet: "Bella",  note: "Full Mutt Makeover" },
  { src: "", pet: "Rocky",  note: "Bath & Brush" },
  { src: "", pet: "Peanut", note: "Blueberry Facial Day" },
  { src: "", pet: "Duke",   note: "Big Boy, Bigger Glow-Up" },
  { src: "", pet: "Milo",   note: "Puppy's First Pamper" },
  { src: "", pet: "Sadie",  note: "De-Shed Transformation" },
];

// Reviews — swap these placeholders for your real Google / Facebook reviews.
const REVIEWS = [
  { name: "Sarah M.",   pet: "Bella",   stars: 5, text: "Bella comes home from Nuts About Mutts looking like a show dog every single time! The text updates during her groom are the sweetest touch — I always know exactly how she's doing." },
  { name: "James T.",   pet: "Rocky",   stars: 5, text: "Rocky is a nervous rescue and this is the ONLY groomer he's ever been happy to walk into. The team is so patient with him. Can't recommend enough!" },
  { name: "Denise W.",  pet: "Peanut",  stars: 5, text: "Best groom Peanut has ever had, and the price list right on the website made it so easy to know what to book. The blueberry facial is her favorite!" },
  { name: "Mike & Ana", pet: "Duke",    stars: 5, text: "Duke is a 110 lb Newfie and most places turn us away. Not here! He came home fluffy, fresh, and clearly happy. Booking online took two minutes." },
  { name: "Karen L.",   pet: "Milo",    stars: 5, text: "The puppy package was perfect for Milo's first groom. They took it slow, gave him treats, and now he LOVES bath time. These folks truly are nuts about mutts." },
  { name: "Tom R.",     pet: "Sadie",   stars: 5, text: "Fast, friendly, and Sadie's de-shed treatment has saved my couch. The pickup text with a timer is genius — no more guessing when to swing by." },
];

const RATING = { average: "5.0", count: "200+" };

// FAQ — edit these questions & answers to match your salon's policies.
const FAQS = [
  { q: "How often should my dog be groomed?", a: "Most pups do best every 4–8 weeks depending on their coat. Doodles, poodles, and other curly coats need the shorter end of that range to stay mat-free. We're happy to recommend a schedule for your dog at their first visit." },
  { q: "How long does a groom take?", a: "A bath usually takes 1–2 hours, a trim-up 2–3 hours, and a full body cut 2¼–3¼ hours, depending on your pup's size, coat, and how they feel about the blow dryer. We'll text you updates the whole way, and you'll get a message the moment they're ready for pickup." },
  { q: "Why do prices say \"starting at\"?", a: "Because every dog is different! The prices on our site are starting points by size — your pup's coat condition and length, behavior, any special needs, and any add-ons you choose can change the final price. We'll always go over the exact price with you before we start, so there are never any surprises." },
  { q: "Do you take walk-ins?", a: "Yes — three services are always walk-in, no appointment needed: nail trim or grinding ($15), nails plus ear cleaning ($20), and anal gland expression ($15). Baths and grooms are by appointment so every pup gets our full attention. Book online or give us a call." },
  { q: "My dog is nervous or has never been groomed. Can you help?", a: "Absolutely — gentle handling is our specialty, and nervous pups and rescues are some of our favorite clients. Tell us in the booking notes and we'll take it slow, with lots of breaks and treats. For puppies, our Puppy's First Pamper is the perfect low-stress introduction." },
  { q: "What if my dog's coat is matted?", a: "We'll always do what's kindest for your dog. Light matting can often be worked out with our dematting and extra brushing add-on ($20); heavier coats may need our excessive matting service ($25) or a shorter, comfortable cut. We'll always talk it through with you before we do anything." },
  { q: "What's the new spa ozone tub?", a: "The newest addition to our salon! An ozone spa bath is a warm, bubbly, therapeutic soak that deep-cleans all the way down to the skin, soothes itchiness and irritation, and helps with stubborn odor. It's wonderful for pups with allergies, skin issues, or achy joints — and honestly, most dogs just love the massage. Soaks start at $25, and for now the tub fits small to medium-size dogs only. Add it to any bath or groom!" },
  { q: "Do you groom cats?", a: "We do! Short-haired cat baths are $65, long-haired are $80, cat nail trims are $15, and cat shaves are quoted individually. Cat appointments are scheduled by phone — give us a call." },
  { q: "What if my dog has fleas?", a: "We keep our salon completely flea-free for every pup's safety, so we don't offer flea baths. If we spot fleas at check-in or during the groom, we'll pause and send your pup home — no judgment, it happens! Once your dog is flea-free (your vet can recommend a treatment), we'll happily get you rescheduled." },
  { q: "What do I need to bring?", a: "Just your pup on a leash (or in a carrier for the littles) and proof of current rabies vaccination for their first visit. We'll handle the rest — including the good-smelling stuff." },
  { q: "How do I pay, and can I tip my groomer?", a: "We accept cash and card at pickup. Tips are never expected but always appreciated — they're shared between your pup's groomer and bather, so the whole team that pampered them feels the love." },
  { q: "Are there any extra fees I should know about?", a: "A few, and we'd rather you hear them from us up front: late pickup is $25, a missed appointment (no-show) is $50, and pups who need extra time and special handling may have a $25 difficult-dog fee. Want your pup done straight through with no wait? Our express service is $20 and must be booked ahead. Gift certificates are also available — just ask!" },
];

// Awards & bragging rights — shown in the awards banner under the hero.
const AWARDS = [
  { icon: "🏆", title: "4× Southlands Best", desc: "Voted Southlands Best dog groomer four times" },
  { icon: "🥇", title: "Best on the South Side", desc: "Chicago's South Side favorite grooming salon" },
  { icon: "💚", title: "Loved by Pup Parents", desc: `${RATING.average} stars from ${RATING.count} happy customers` },
];

/* ════════════════════════════════════════════════════════════════════════
   Components
   ════════════════════════════════════════════════════════════════════════ */

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const openBooking = () => window.open(SALON.bookingUrl, "_blank", "noopener,noreferrer");

const SOCIAL_ICONS = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85C2.42 3.92 3.94 2.38 7.15 2.27 8.42 2.21 8.8 2.2 12 2.2zm0 3.68a6.12 6.12 0 1 0 0 12.24 6.12 6.12 0 0 0 0-12.24zm0 2.2a3.92 3.92 0 1 1 0 7.84 3.92 3.92 0 0 1 0-7.84zm6.4-2.71a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.01-2.76V9.39a6.34 6.34 0 1 0 5.46 6.28V9.01a8.16 8.16 0 0 0 4.77 1.53V7.1a4.85 4.85 0 0 1-1-.41z" /></svg>
  ),
  Amazon: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zm-2.99-3.9l1.05 4.37c.1.42.01.84-.25 1.17-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52L9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41-.25-.29-.37-.68-.33-1.07zm-4.45-.16L5.05 5h1.97l-.58 4.86c-.08.65-.6 1.14-1.21 1.14-.49 0-.8-.29-.93-.47-.27-.32-.36-.75-.26-1.17zM5 19v-6.03c.08.01.15.03.23.03.87 0 1.66-.36 2.24-.95.6.6 1.4.95 2.31.95.87 0 1.65-.36 2.23-.93.59.57 1.39.93 2.29.93.84 0 1.64-.35 2.24-.95.58.59 1.37.95 2.24.95.08 0 .15-.02.23-.03V19H5z" /></svg>
  ),
};

function SocialLinks({ className }) {
  return (
    <div className={className}>
      {SALON.socials.map((s) => (
        <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${SALON.name} on ${s.name}`} title={s.name}>
          {SOCIAL_ICONS[s.name] || s.name}
        </a>
      ))}
    </div>
  );
}

function Stars({ n = 5 }) {
  return <span className="stars" aria-label={`${n} out of 5 stars`}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

function Nav({ onStaff }) {
  const [open, setOpen] = useState(false);
  const links = [["Services & Pricing", "pricing"], ["Reviews", "reviews"], ["FAQ", "faq"], ["Contact", "contact"]];
  const go = (id) => { setOpen(false); scrollTo(id); };
  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => go("top")}>
          <span className="nav-logo-icon">🐾</span>
          <span>We're Nuts About <em>Mutts</em></span>
        </button>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map(([label, id]) => (
            <button key={id} className="nav-link" onClick={() => go(id)}>{label}</button>
          ))}
          <button className="nav-link nav-link-staff" onClick={onStaff}>Staff</button>
        </nav>
        <div className="nav-actions">
          <button className="btn btn-primary btn-nav" onClick={openBooking}>Book Appointment</button>
          <button className="nav-burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-blob hero-blob-1" aria-hidden="true" />
      <div className="hero-blob hero-blob-2" aria-hidden="true" />
      <div className="hero-inner">
        <span className="pill">🐶 {SALON.tagline}</span>
        <h1>Fresh cuts.<br />Happy <span className="accent">mutts.</span></h1>
        <p className="hero-sub">
          Professional dog grooming with a whole lot of love. Pick your pup's size,
          choose a service, and book in under two minutes — we'll text you updates
          the whole way through.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary btn-lg" onClick={openBooking}>
            🐾 Book an Appointment
          </button>
          <button className="btn btn-ghost btn-lg" onClick={() => scrollTo("pricing")}>
            See Prices
          </button>
        </div>
        <div className="hero-trust">
          <span className="hero-award">🏆 4× Southlands Best</span>
          <Stars />
          <span><strong>{RATING.average}</strong> from {RATING.count} happy pup parents</span>
        </div>
      </div>
    </section>
  );
}

function Awards() {
  return (
    <section className="awards" aria-label="Awards">
      <div className="section-inner awards-inner">
        {AWARDS.map((a) => (
          <div className="award" key={a.title}>
            <span className="award-icon">{a.icon}</span>
            <span>
              <strong>{a.title}</strong>
              <small>{a.desc}</small>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: "📏", title: "1. Pick your pup's size", desc: "Small, medium, large, or extra large — pricing is clear for every size." },
    { icon: "✂️", title: "2. Choose a service", desc: "Full body cut, trim-up, bath only, or a puppy trim. Add extras if you like." },
    { icon: "📅", title: "3. Book your spot", desc: "Tap any Book button to book online in seconds — pick your time and message us right there with any questions." },
  ];
  return (
    <section className="section how">
      <div className="section-inner">
        <span className="eyebrow">Easy as fetch</span>
        <h2>Booking is simple</h2>
        <div className="how-grid">
          {steps.map((s) => (
            <div className="how-card" key={s.title}>
              <div className="how-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({ onBook }) {
  const [size, setSize] = useState("medium");
  return (
    <section className="section pricing" id="pricing">
      <div className="section-inner">
        <span className="eyebrow">Services & Pricing</span>
        <h2>Pick a size, see every price</h2>
        <p className="section-sub">Select your dog's size to see starting prices. Every pup is unique — coat, behavior, and special needs can change the price, and we'll always confirm it with you before we start.</p>

        <div className="size-toggle" role="tablist" aria-label="Dog size">
          {SIZES.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={size === s.id}
              className={`size-btn ${size === s.id ? "active" : ""}`}
              onClick={() => setSize(s.id)}
            >
              <span className="size-btn-icon">{s.icon}</span>
              <span className="size-btn-label">{s.label}</span>
              <span className="size-btn-range">{s.range}</span>
            </button>
          ))}
        </div>

        <div className="price-grid">
          {SERVICES.map((svc) => (
            <div className={`price-card ${svc.popular ? "popular" : ""}`} key={svc.id}>
              {svc.popular && <span className="popular-tag">⭐ Most Popular</span>}
              <div className="price-card-head">
                <span className="price-card-icon">{svc.icon}</span>
                <h3>{svc.name}</h3>
              </div>
              <p className="price-card-desc">{svc.desc}</p>
              <ul className="price-card-list">
                {svc.includes.map((inc) => <li key={inc}>✓ {inc}</li>)}
              </ul>
              <div className="price-card-foot">
                <div>
                  <span className="price-starting">Starting at</span>
                  <span className="price-amount">${svc.price[size]}</span>
                  <span className="price-time">⏱ {svc.time}</span>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => onBook(size, svc.id)}>Book</button>
              </div>
            </div>
          ))}
        </div>

        <div className="addons">
          <h3>✨ Pawsome Add-Ons</h3>
          <div className="addons-grid">
            {ADDONS.map((a) => (
              <div className="addon-chip" key={a.id}>
                <span>{a.icon} {a.name}</span>
                <strong>+${a.price}</strong>
              </div>
            ))}
          </div>
          <p className="addons-walkin">💅 Walk-ins welcome, no appointment needed: Nail trim or grinding $15 · Nails + ear cleaning $20 · Anal gland expression $15</p>
          <p className="addons-note">Every dog is different! Final pricing can vary with your pup's coat condition, behavior, and any special needs — we'll always confirm the price with you before we start.</p>
        </div>

        <div className="addons cats">
          <h3>🐱 We groom cats too!</h3>
          <div className="cats-list">
            {CAT_SERVICES.map((c) => (
              <div className="cat-row" key={c.name}>
                <span>{c.name}{c.time && <small> · {c.time}</small>}</span>
                <strong>{c.price}</strong>
              </div>
            ))}
          </div>
          <p className="addons-note">Cat appointments are scheduled by phone — call us at <a href={`tel:${SALON.phone.replace(/[^\d+]/g, "")}`}>{SALON.phone}</a>.</p>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <div className="section-inner">
        <span className="eyebrow">Fresh out the tub</span>
        <h2>Our happy customers</h2>
        <p className="section-sub">A few of the very good dogs we've had the honor of pampering.</p>
        <div className="gallery-grid">
          {GALLERY.map((g) => (
            <figure className="gallery-card" key={g.pet}>
              {g.src ? (
                <img src={g.src} alt={`${g.pet} after their groom — ${g.note}`} loading="lazy" />
              ) : (
                <div className="gallery-placeholder" role="img" aria-label={`Photo of ${g.pet} coming soon`}>
                  <span>🐶</span>
                  <small>{g.pet}'s photo goes here</small>
                </div>
              )}
              <figcaption><strong>{g.pet}</strong> · {g.note}</figcaption>
            </figure>
          ))}
        </div>
        <p className="gallery-follow">
          Want more glow-ups? <a href={SALON.socials.find((s) => s.name === "Instagram")?.url} target="_blank" rel="noopener noreferrer">Follow us on Instagram</a> for fresh cuts every week. 🐾
        </p>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section reviews" id="reviews">
      <div className="section-inner">
        <span className="eyebrow">Wagging tails & rave reviews</span>
        <h2>Pup parents love us</h2>
        <div className="reviews-summary">
          <span className="reviews-score">{RATING.average}</span>
          <div>
            <Stars />
            <p>{RATING.count} five-star reviews</p>
          </div>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r) => (
            <figure className="review-card" key={r.name}>
              <Stars n={r.stars} />
              <blockquote>“{r.text}”</blockquote>
              <figcaption>
                <span className="review-avatar">{r.pet[0]}</span>
                <span><strong>{r.name}</strong><br /><small>{r.pet}'s human</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="reviews-follow">
          <p>Follow the daily glow-ups 🐾</p>
          <SocialLinks className="reviews-social" />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="section-inner faq-inner">
        <span className="eyebrow">Good questions</span>
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          {FAQS.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}<span className="faq-chevron" aria-hidden="true">▾</span></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p className="faq-more">
          Still wondering something? Call us at <a href={`tel:${SALON.phone.replace(/[^\d+]/g, "")}`}>{SALON.phone}</a> — we love talking dogs.
        </p>
      </div>
    </section>
  );
}

/* ── Book on Square ── */
function BookSquare() {
  return (
    <section className="section booking book-square" id="book">
      <div className="section-inner booking-inner">
        <div className="book-square-card">
          <span className="eyebrow">Book an appointment</span>
          <h2>Ready for a fresh cut?</h2>
          <p className="book-square-text">
            Booking online is quick and easy — pick your service, choose a time
            that works, and you can <strong>message us right there</strong> with
            any questions or special requests.
          </p>
          <button className="btn btn-primary btn-lg" onClick={openBooking}>
            🐾 Book Your Appointment
          </button>
          <p className="book-square-alt">
            Prefer to talk? Call us at <a href={`tel:${SALON.phone.replace(/[^\d+]/g, "")}`}>{SALON.phone}</a>
          </p>
          <p className="booking-cat-note">
            🐱 Booking for a cat? Cat appointments are scheduled by phone.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Booking wizard (old built-in form — no longer shown; kept in case
      you ever want an on-site form again instead of Square) ── */
function Booking({ preset }) {
  const [step, setStep] = useState(1);
  const [size, setSize] = useState(null);
  const [service, setService] = useState(null);
  const [addons, setAddons] = useState([]);
  const [form, setForm] = useState({ owner: "", pet: "", phone: "", day: "", time: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  // "Book" buttons in the price list preselect size + service and jump here.
  useEffect(() => {
    if (preset) {
      setSize(preset.size);
      setService(preset.service);
      setAddons([]);
      setSubmitted(false);
      setStep(3);
    }
  }, [preset]);

  const svcObj = SERVICES.find((s) => s.id === service);
  const sizeObj = SIZES.find((s) => s.id === size);
  const base = svcObj && size ? svcObj.price[size] : 0;
  const extras = addons.reduce((sum, id) => sum + ADDONS.find((a) => a.id === id).price, 0);
  const total = base + extras;

  const toggleAddon = (id) =>
    setAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const formValid = form.owner.trim() && form.pet.trim() && form.phone.trim() && form.day && form.time;

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const times = ["Morning (8–11 AM)", "Midday (11 AM–2 PM)", "Afternoon (2–5 PM)"];

  const smsBody = svcObj && sizeObj
    ? `Hi Nuts About Mutts! I'd like to book a ${svcObj.short} for ${form.pet || "my pup"} (${sizeObj.label.toLowerCase()}${addons.length ? ", plus " + addons.map((id) => ADDONS.find((a) => a.id === id).name).join(", ") : ""}). Preferred: ${form.day} ${form.time}. — ${form.owner}`
    : "";

  if (submitted) {
    return (
      <section className="section booking" id="book">
        <div className="section-inner booking-inner">
          <div className="booking-done">
            <div className="booking-done-icon">🎉</div>
            <h2>Request sent — happy dance!</h2>
            <p>
              Thanks {form.owner.split(" ")[0]}! We've got your request for <strong>{form.pet}</strong>'s{" "}
              <strong>{svcObj?.short}</strong> ({sizeObj?.label.toLowerCase()}) on <strong>{form.day}, {form.time}</strong>.
            </p>
            <p>We'll call or text <strong>{form.phone}</strong> shortly to confirm your exact time. 🐾</p>
            <div className="booking-done-total">Estimated total: <strong>${total}</strong></div>
            <p className="booking-done-alt">
              In a hurry? Call us at <a href={`tel:${SALON.phone.replace(/[^\d+]/g, "")}`}>{SALON.phone}</a>
            </p>
            <button className="btn btn-ghost" onClick={() => { setSubmitted(false); setStep(1); setSize(null); setService(null); setAddons([]); setForm({ owner: "", pet: "", phone: "", day: "", time: "", notes: "" }); }}>
              Book Another Pup
            </button>
          </div>
        </div>
      </section>
    );
  }

  const stepsMeta = [
    { n: 1, label: "Size" },
    { n: 2, label: "Service" },
    { n: 3, label: "Extras" },
    { n: 4, label: "Your Info" },
  ];

  return (
    <section className="section booking" id="book">
      <div className="section-inner booking-inner">
        <span className="eyebrow">Book an appointment</span>
        <h2>Let's get your pup pampered</h2>

        {/* Step indicator */}
        <div className="wizard-steps">
          {stepsMeta.map((s, i) => (
            <div key={s.n} className="wizard-step-wrap">
              <button
                className={`wizard-dot ${step === s.n ? "current" : ""} ${step > s.n ? "done" : ""}`}
                onClick={() => step > s.n && setStep(s.n)}
                disabled={step < s.n}
              >
                {step > s.n ? "✓" : s.n}
              </button>
              <span className={`wizard-label ${step >= s.n ? "on" : ""}`}>{s.label}</span>
              {i < stepsMeta.length - 1 && <div className={`wizard-line ${step > s.n ? "done" : ""}`} />}
            </div>
          ))}
        </div>

        <div className="wizard-card">
          {step === 1 && (
            <>
              <h3 className="wizard-q">How big is your pup?</h3>
              <div className="choice-grid">
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    className={`choice-card ${size === s.id ? "selected" : ""}`}
                    onClick={() => {
                      setSize(s.id);
                      setAddons((prev) => prev.filter((id) => {
                        const a = ADDONS.find((x) => x.id === id);
                        return !a.smOnly || s.id === "small" || s.id === "medium";
                      }));
                      setStep(2);
                    }}
                  >
                    <span className="choice-icon">{s.icon}</span>
                    <strong>{s.label}</strong>
                    <span className="choice-sub">{s.range}</span>
                    <span className="choice-hint">{s.examples}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="wizard-q">What does {sizeObj ? `your ${sizeObj.label.toLowerCase()} pup` : "your pup"} need?</h3>
              <div className="choice-grid">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    className={`choice-card ${service === s.id ? "selected" : ""}`}
                    onClick={() => { setService(s.id); setStep(3); }}
                  >
                    <span className="choice-icon">{s.icon}</span>
                    <strong>{s.short}</strong>
                    <span className="choice-sub">{s.name}</span>
                    <span className="choice-price">${s.price[size]}</span>
                  </button>
                ))}
              </div>
              <button className="wizard-back" onClick={() => setStep(1)}>← Change size</button>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="wizard-q">Any pawsome extras? <small>(optional)</small></h3>
              <div className="addon-select-grid">
                {ADDONS.filter((a) => !a.smOnly || size === "small" || size === "medium").map((a) => (
                  <button
                    key={a.id}
                    className={`addon-select ${addons.includes(a.id) ? "selected" : ""}`}
                    onClick={() => toggleAddon(a.id)}
                  >
                    <span>{a.icon} {a.name}</span>
                    <strong>{addons.includes(a.id) ? "✓ Added" : `+$${a.price}`}</strong>
                  </button>
                ))}
              </div>
              {(size === "large" || size === "xl") && (
                <p className="addon-restricted-note">🫧 Our new ozone spa tub fits small–medium pups only for now — sorry, big guys!</p>
              )}
              <div className="wizard-nav">
                <button className="wizard-back" onClick={() => setStep(2)}>← Change service</button>
                <button className="btn btn-primary" onClick={() => setStep(4)}>
                  Continue {addons.length > 0 ? `(+$${extras})` : "→"}
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h3 className="wizard-q">Almost done — who's coming in?</h3>
              <div className="form-grid">
                <label>Your name *
                  <input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} placeholder="e.g. Sarah Johnson" />
                </label>
                <label>Pup's name *
                  <input value={form.pet} onChange={(e) => setForm({ ...form, pet: e.target.value })} placeholder="e.g. Bella" />
                </label>
                <label>Phone number *
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="e.g. 555-867-5309" />
                </label>
                <label>Preferred day *
                  <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>
                    <option value="">Choose a day...</option>
                    {days.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </label>
                <label>Preferred time *
                  <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
                    <option value="">Choose a time...</option>
                    {times.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <label className="form-full">Anything we should know? <small>(optional)</small>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Nervous pup, matted coat, favorite treat..." rows={3} />
                </label>
              </div>
              <div className="wizard-nav">
                <button className="wizard-back" onClick={() => setStep(3)}>← Back</button>
                <button className="btn btn-primary btn-lg" disabled={!formValid} onClick={() => setSubmitted(true)}>
                  Request Appointment 🐾
                </button>
              </div>
              {smsBody && (
                <p className="booking-sms-alt">
                  Prefer to text? <a href={`sms:${SALON.phone.replace(/[^\d+]/g, "")}?&body=${encodeURIComponent(smsBody)}`}>Tap here to send us your request by text</a>
                </p>
              )}
            </>
          )}
        </div>

        <p className="booking-cat-note">
          🐱 Booking for a cat? Cat appointments are scheduled by phone — call us at{" "}
          <a href={`tel:${SALON.phone.replace(/[^\d+]/g, "")}`}>{SALON.phone}</a>.
        </p>

        {/* Live summary */}
        {(svcObj || sizeObj) && !submitted && (
          <div className="booking-summary">
            <span>
              {sizeObj && <strong>{sizeObj.icon} {sizeObj.label}</strong>}
              {svcObj && <> · {svcObj.icon} {svcObj.short}</>}
              {addons.length > 0 && <> · ✨ {addons.length} extra{addons.length > 1 ? "s" : ""}</>}
            </span>
            {svcObj && <span className="booking-summary-total">Est. total: <strong>${total}</strong></span>}
          </div>
        )}
      </div>
    </section>
  );
}

function Footer({ onStaff }) {
  return (
    <footer className="footer" id="contact">
      <div className="section-inner footer-grid">
        <div>
          <p className="footer-logo">🐾 We're Nuts About <em>Mutts</em></p>
          <p className="footer-tag">{SALON.tagline}</p>
          <SocialLinks className="footer-social" />
        </div>
        <div>
          <h4>Visit Us</h4>
          <p>{SALON.address}</p>
          <p><a href={`tel:${SALON.phone.replace(/[^\d+]/g, "")}`}>{SALON.phone}</a></p>
          <p><a href={`mailto:${SALON.email}`}>{SALON.email}</a></p>
        </div>
        <div>
          <h4>Hours</h4>
          {SALON.hours.map(([d, h]) => (
            <p key={d}><strong>{d}:</strong> {h}</p>
          ))}
        </div>
        <div>
          <h4>Quick Links</h4>
          <p><button className="footer-link" onClick={() => scrollTo("pricing")}>Services & Pricing</button></p>
          <p><button className="footer-link" onClick={() => scrollTo("reviews")}>Reviews</button></p>
          <p><a href={SALON.bookingUrl} target="_blank" rel="noopener noreferrer">Book Appointment</a></p>
          {SALON.socials.filter((s) => s.name === "Amazon").map((s) => (
            <p key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer">Our Amazon Storefront</a></p>
          ))}
          <p><button className="footer-link footer-link-dim" onClick={onStaff}>Staff Portal</button></p>
        </div>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} {SALON.name}. Made with 💚 for good dogs everywhere.</p>
    </footer>
  );
}

/* ── Root ── */
export default function App() {
  const [view, setView] = useState("site"); // "site" | "staff"

  if (view === "staff") return <StaffApp onExit={() => setView("site")} />;

  return (
    <div className="site">
      <Nav onStaff={() => setView("staff")} />
      <Hero />
      <Awards />
      <HowItWorks />
      <Pricing onBook={openBooking} />
      {/* When you have pup photos, add them to the GALLERY list up top and
          put <Gallery /> back on the next line to show the photo section: */}
      {/* <Gallery /> */}
      <Reviews />
      <Faq />
      <BookSquare />
      <Footer onStaff={() => setView("staff")} />
      <button className="fab" onClick={openBooking} aria-label="Book an appointment">
        🐾 Book Now
      </button>
    </div>
  );
}
