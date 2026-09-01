import { useEffect, useState } from "react";
import StaffApp from "./StaffApp";

/* ════════════════════════════════════════════════════════════════════════
   EDIT ME! — All salon info, prices, and reviews live right here.
   Change any text, price, or review below and the whole site updates.
   ════════════════════════════════════════════════════════════════════════ */

const SALON = {
  name: "We're Nuts About Mutts Inc",
  tagline: "Where every pup leaves looking pawsitively fabulous",
  phone: "(555) 555-5309",
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
  { id: "small",  label: "Small",       range: "Under 20 lbs",  icon: "🐕‍🦺", examples: "Yorkie, Chihuahua, Shih Tzu" },
  { id: "medium", label: "Medium",      range: "20 – 50 lbs",   icon: "🐕",  examples: "Beagle, Cocker Spaniel, Corgi" },
  { id: "large",  label: "Large",       range: "50 – 90 lbs",   icon: "🦮",  examples: "Lab, Golden Retriever, Boxer" },
  { id: "xl",     label: "Extra Large", range: "Over 90 lbs",   icon: "🐩",  examples: "Great Dane, Newfoundland, Mastiff" },
];

// Main services — step 2 of booking. price is per size id above.
const SERVICES = [
  {
    id: "fullgroom",
    name: "The Full Mutt Makeover",
    short: "Full Groom",
    icon: "✂️",
    popular: true,
    desc: "The works! Bath, blow-dry, haircut & style, nail trim, ear cleaning, and a finishing bow or bandana.",
    includes: ["Warm bath & massage", "Blow-dry & brush-out", "Haircut & styling", "Nail trim", "Ear cleaning", "Bow or bandana"],
    price: { small: 85, medium: 125, large: 175, xl: 240 },
    time: "2 – 3 hours",
  },
  {
    id: "bathbrush",
    name: "Splish Splash Bath & Brush",
    short: "Bath & Brush",
    icon: "🛁",
    popular: false,
    desc: "A refreshing scrub for pups who just need to freshen up. Bath, blow-dry, full brush-out, and a spritz of cologne.",
    includes: ["Warm bath & massage", "Blow-dry & brush-out", "Cologne spritz", "Bandana"],
    price: { small: 35, medium: 45, large: 55, xl: 70 },
    time: "1 – 1.5 hours",
  },
  {
    id: "puppy",
    name: "Puppy's First Pamper",
    short: "Puppy Intro",
    icon: "🐶",
    popular: false,
    desc: "A gentle, patient introduction to grooming for pups under 6 months. Short, sweet, and full of treats.",
    includes: ["Gentle intro bath", "Light face & feet trim", "Nail trim", "Lots of treats & praise"],
    price: { small: 45, medium: 45, large: 55, xl: 55 },
    time: "45 min – 1 hour",
  },
  {
    id: "tidy",
    name: "Quick Tidy-Up",
    short: "Tidy-Up",
    icon: "🐾",
    popular: false,
    desc: "In between grooms? Face, feet, and sanitary trim plus a nail trim to keep your pup looking sharp.",
    includes: ["Face & feet trim", "Sanitary trim", "Nail trim"],
    price: { small: 30, medium: 35, large: 40, xl: 45 },
    time: "30 – 45 min",
  },
];

// Add-ons — step 3 of booking (optional extras, flat price).
const ADDONS = [
  { id: "nailgrind", name: "Nail Grind (smooth finish)", icon: "💅", price: 12 },
  { id: "teeth",     name: "Teeth Brushing",             icon: "🦷", price: 10 },
  { id: "deshed",    name: "De-Shedding Treatment",      icon: "💨", price: 15 },
  { id: "flea",      name: "Flea & Tick Bath",           icon: "🧼", price: 15 },
  { id: "facial",    name: "Blueberry Facial",           icon: "🫐", price: 10 },
  { id: "pawbalm",   name: "Paw Balm Treatment",         icon: "🐾", price: 8 },
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
  { q: "How long does a groom take?", a: "A bath & brush usually takes 1–1.5 hours and a full groom 2–3 hours, depending on your pup's size, coat, and how they feel about the blow dryer. We'll text you updates the whole way, and you'll get a message the moment they're ready for pickup." },
  { q: "Do you take walk-ins?", a: "Nail trims are always walk-in — just $15, no appointment needed, stop by during business hours! Baths and grooms are by appointment so every pup gets our full attention. Book online or give us a call." },
  { q: "My dog is nervous or has never been groomed. Can you help?", a: "Absolutely — gentle handling is our specialty, and nervous pups and rescues are some of our favorite clients. Tell us in the booking notes and we'll take it slow, with lots of breaks and treats. For puppies, our Puppy's First Pamper is the perfect low-stress introduction." },
  { q: "What if my dog's coat is matted?", a: "We'll always do what's kindest for your dog. Light matting can often be brushed out; heavier matting may mean a shorter, comfortable cut and a little extra time, which can add to the price. We'll always talk it through with you before we do anything." },
  { q: "What do I need to bring?", a: "Just your pup on a leash (or in a carrier for the littles) and proof of current rabies vaccination for their first visit. We'll handle the rest — including the good-smelling stuff." },
  { q: "How do I pay, and can I tip my groomer?", a: "We accept cash and card at pickup. Tips are never expected but always appreciated — they're shared between your pup's groomer and bather, so the whole team that pampered them feels the love." },
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
          <button className="btn btn-primary btn-nav" onClick={() => go("book")}>Book Appointment</button>
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
          <button className="btn btn-primary btn-lg" onClick={() => scrollTo("book")}>
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
    { icon: "✂️", title: "2. Choose a service", desc: "Full groom, bath & brush, puppy intro, or a quick tidy-up. Add extras if you like." },
    { icon: "📅", title: "3. Book your spot", desc: "Tell us when works and we'll confirm. You'll get text updates during the groom!" },
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
        <p className="section-sub">No surprises at pickup — select your dog's size and prices update instantly.</p>

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
          <p className="addons-walkin">💅 Walk-in nail trims — just $15, no appointment needed. Stop by anytime!</p>
          <p className="addons-note">Severely matted coats, special-handling pups, or extra-long coats may add to the price — we'll always confirm with you first.</p>
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

/* ── Booking wizard ── */
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
                    onClick={() => { setSize(s.id); setStep(2); }}
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
                {ADDONS.map((a) => (
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
          <p><button className="footer-link" onClick={() => scrollTo("book")}>Book Appointment</button></p>
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
  const [preset, setPreset] = useState(null);

  const bookFromPricing = (size, service) => {
    setPreset({ size, service, at: Date.now() });
    scrollTo("book");
  };

  if (view === "staff") return <StaffApp onExit={() => setView("site")} />;

  return (
    <div className="site">
      <Nav onStaff={() => setView("staff")} />
      <Hero />
      <Awards />
      <HowItWorks />
      <Pricing onBook={bookFromPricing} />
      {/* When you have pup photos, add them to the GALLERY list up top and
          put <Gallery /> back on the next line to show the photo section: */}
      {/* <Gallery /> */}
      <Reviews />
      <Faq />
      <Booking preset={preset} />
      <Footer onStaff={() => setView("staff")} />
      <button className="fab" onClick={() => scrollTo("book")} aria-label="Book an appointment">
        🐾 Book Now
      </button>
    </div>
  );
}
