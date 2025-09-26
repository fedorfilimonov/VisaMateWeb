// VisaMate Landing Page — React + Tailwind (single-file)
// Notes:
// - Default export is a React component, ready for preview.
// - Uses Tailwind classes only; no external component libs.
// - Replace placeholder images (src) with real assets.
// - Update CTA links as you publish TestFlight/App Store/Play Store.

import React, { useState } from "react";

export default function VisaMateLandingPage() {
  // Dark mode: follow system by default; allow manual toggle that persists.
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (t) => {
      const isDark = t === "dark" || (t === "system" && mql.matches);
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    };
    apply(theme);
    const handler = () => theme === "system" && apply("system");
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, [theme]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <Hero />
      <LogosBar />
      <TrustStrip />
      <Features />
      <FeatureMatrix />
      <Screenshots />
      <Pricing />
      <Newsletter />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

function DarkModeToggle() {
  const [mode, setMode] = useState(() => localStorage.getItem("theme") || "system");
  const cycle = () => {
    const next = mode === "system" ? "light" : mode === "light" ? "dark" : "system";
    localStorage.setItem("theme", next);
    setMode(next);
    // trigger effect in root via storage event
    window.dispatchEvent(new StorageEvent("storage", { key: "theme", newValue: next }));
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = next === "dark" || (next === "system" && mql.matches);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  };
  const label = mode === "system" ? "System" : mode === "light" ? "Light" : "Dark";
  return (
    <button onClick={cycle} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs dark:border-slate-700" aria-label="Toggle theme">
      <span className="hidden sm:inline">Theme:</span> {label}
    </button>
  );
}


function Container({ children }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img
              src="/assets/visamate-icon.png"
              alt="VisaMate"
              className="h-8 w-8 rounded-xl shadow"
            />
            <span className="font-semibold tracking-tight">VisaMate</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="nav-link">Features</a>
            <a href="#matrix" className="nav-link">Compare</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#screenshots" className="nav-link">Screenshots</a>
            <a href="#blog" className="nav-link">Blog</a>
            <DarkModeToggle />
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#waitlist" className="btn btn-ghost">Join Waitlist</a>
            <a href="#download" className="btn btn-primary">Get the App</a>
          </div>

          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="grid gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
              <a href="#features" className="nav-link">Features</a>
              <a href="#matrix" className="nav-link">Compare</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a href="#screenshots" className="nav-link">Screenshots</a>
              <a href="#blog" className="nav-link">Blog</a>
              <div className="mt-2 flex gap-2">
                <a href="#waitlist" className="btn btn-ghost w-full">Join Waitlist</a>
                <a href="#download" className="btn btn-primary w-full">Get the App</a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950" />
      <Container>
        <div className="grid items-center gap-8 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-300">
              ✈️ Your main travel companion
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Your travel visas, organized and always ready
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              VisaMate keeps all your visa details, attachments, and reminders in one tidy place so you never miss an expiry again.
            </p>
            {/* Inline email capture */}
            <form
              className="mt-6 flex w-full max-w-md items-center gap-2"
              method="POST"
              action="https://formspree.io/f/your-endpoint"
            >
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <button type="submit" className="btn btn-primary whitespace-nowrap">Join newsletter</button>
            </form>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">No spam. Unsubscribe anytime.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a href="#download" className="btn btn-primary">Get the App</a>
              <a href="#features" className="btn btn-ghost">See Features</a>
            </div>
            {/* Store Badges */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a href="#appstore" aria-label="Download on the App Store">
                <img src="/assets/appstore-badge.svg" alt="App Store" className="h-10" />
              </a>
              <a href="#testflight" aria-label="Join TestFlight">
                <img src="/assets/testflight-badge.svg" alt="TestFlight" className="h-10" />
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              iCloud sync optional · Face/Touch ID lock · PDF attachments
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-2xl border border-slate-200 shadow-xl md:ml-auto dark:border-slate-800">
              <picture>
                <source srcSet="/assets/hero-mock-dark.png" media="(prefers-color-scheme: dark)" />
                <img
                  src="/assets/hero-mock.png"
                  alt="VisaMate app preview"
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function LogosBar() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/40">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-6 py-6 md:gap-10">
          <Logo label="Secure Storage" />
          <Logo label="Smart Reminders" />
          <Logo label="PDF Attachments" />
          <Logo label="Quick Actions" />
          <Logo label="Apple Inspired UI" />
        </div>
      </Container>
    </section>
  );
}

function TrustStrip() {
  const stats = [
    { value: "200+", label: "Beta users" },
    { value: "30+", label: "Countries" },
    { value: "1k+", label: "Visas tracked" },
  ];
  return (
    <section className="bg-white py-8 dark:bg-slate-950">
      <Container>
        <div className="grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Logo({ label }) {
  return (
    <div className="flex items-center gap-2 text-slate-600">
      <div className="h-6 w-6 rounded-md border border-slate-300" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
    </div>
  );
}

function Features() {
  const items = [
    {
      title: "Visa vault",
      desc: "Store country, type, number, expiry, entries, and notes with a clean, reliable layout.",
      icon: "📁",
    },
    {
      title: "Smart reminders",
      desc: "Get notified well before expiry. Configure lead times that fit your travel rhythm.",
      icon: "⏰",
    },
    {
      title: "Attachments",
      desc: "Keep PDFs and scans right next to each visa. Share or copy details in one tap.",
      icon: "📎",
    },
    {
      title: "Quick actions",
      desc: "Copy visa number, archive/unarchive, and jump to attachments instantly.",
      icon: "⚡",
    },
    {
      title: "Privacy-first",
      desc: "Local-only mode or iCloud sync. App lock via Face ID / Touch ID.",
      icon: "🔒",
    },
    {
      title: "Apple-inspired design",
      desc: "Minimal, elegant interface focused on clarity and speed.",
      icon: "🍎",
    },
  ];

  return (
    <section id="features" className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to stay visa-ready"
          subtitle="Designed for frequent travelers, expats, and professionals."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-slate-200 p-6 shadow-sm transition hover:shadow-md">
              <div className="text-2xl">{f.icon}</div>
              <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeatureMatrix() {
  const rows = [
    ["Visa Storage","Add and store visa details (number, expiry, issuing country)","✅ Limited (e.g. up to 3 visas)","✅ Unlimited","✅ Unlimited"],
    ["Expiry Reminders","Notifications before visa expiry","❌","✅","✅"],
    ["Document Scans/Photos","Upload scans or photos of visas","❌","✅","✅"],
    ["Search & Tags","Organize visas by country, type, trip","❌","✅","✅"],
    ["Newsletter Access","Exclusive newsletter with travel/visa updates & hacks","❌","✅","✅"],
    ["Exclusive Themes / Icons","Premium app themes and icons for personalization","❌","✅","✅"],
    ["Other Travel Docs Storage","Store passports, insurance, vaccination certificates, loyalty cards","❌","❌","✅"],
    ["Smart Stay Tracker","Track days spent under visa rules (e.g. Schengen 90/180)","❌","❌","✅"],
    ["Custom Reminder Settings","Multiple/custom alerts (6 months, 3 months, 1 week, etc.)","❌","❌","✅"],
    ["Export/Backup","Export visa list as PDF/CSV for personal archive","❌","❌","✅"],
    ["Family Sharing","Share subscription with Apple Family Sharing group","❌","❌","✅"],
    ["Trip Planner Mode (Future)","Link visas with upcoming trips (manual, later calendar integration)","❌","❌","✅ 2026"],
    ["Customizable Home Screen Widgets (Future)","Visa expiry countdown, active visa overview","❌","❌","✅ 2026"],
    ["Multi-Profile Support (Future)","Manage visas for family members in one account","❌","❌","✅ 2026"],
    ["AI Assistant (Future)","Explain visa rules, predict expiry risks","❌","❌","✅ 2026"],
  ];
  return (
    <section id="matrix" className="bg-white py-20 dark:bg-slate-950">
      <Container>
        <SectionHeader eyebrow="Compare" title="Choose the plan that fits" subtitle="Annual pricing. Upgrade anytime." />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3">Function</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Lite (Free)</th>
                <th className="px-4 py-3">Plus ($20/year)</th>
                <th className="px-4 py-3">Pro ($30/year)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {rows.map((r) => (
                <tr key={r[0]} className="bg-white dark:bg-slate-950">
                  {r.map((c, i) => (
                    <td key={i} className="px-4 py-3 align-top text-slate-700 dark:text-slate-200">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

function Screenshots() {
  return (
    <section id="screenshots" className="bg-slate-50 py-20">
      <Container>
        <SectionHeader
          eyebrow="Screenshots"
          title="A tidy home for every visa"
          subtitle="Clean layouts, readable typography, and quick access to the actions you use most."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="aspect-[9/16] w-full overflow-hidden rounded-xl border border-slate-200">
                <img
                  src={`/assets/screen-${n}.png`}
                  alt={`VisaMate screen ${n}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          subtitle="Start free. Upgrade when you need more. Prices shown are per year."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Plan
            name="Free"
            price="$0"
            highlight={false}
            features={[
              "Up to 3 visas",
              "Attachments (PDFs)",
              "Local-only storage",
            ]}
            cta="Get Started"
          />
          <Plan
            name="Plus"
            price="$20/year"
            highlight
            badge="Most Popular"
            features={[
              "Unlimited visas",
              "iCloud sync (optional)",
              "Advanced reminders",
              "Archive & bulk actions",
              "Priority support",
            ]}
            cta="Choose Plus"
          />
          <Plan
            name="Pro"
            price="$30/year"
            badge="Roadmap 2026"
            features={[
              "Other travel docs storage",
              "Smart Stay Tracker",
              "Custom reminders",
              "Export/Backup",
              "Family Sharing",
              "Widgets/Multi-profile/AI (2026)",
            ]}
            cta="Join Pro Waitlist"
          />
        </div>
      </Container>
    </section>
  );
}

function Plan({ name, price, features, cta, highlight = false, badge }) {
  return (
    <div
      className={
        "relative rounded-2xl border p-6 shadow-sm transition hover:shadow-md " +
        (highlight ? "border-blue-400 shadow-blue-100" : "border-slate-200")
      }
    >
      {badge && (
        <span className="absolute -top-3 left-6 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {badge}
        </span>
      )}
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="mt-2 text-3xl font-bold">{price}</p>
      <ul className="mt-4 space-y-2 text-slate-600">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 flex-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a href="#download" className={"btn mt-6 w-full " + (highlight ? "btn-primary" : "btn-ghost")}>{cta}</a>
    </div>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "As an expat consultant, VisaMate is my safety net. No more digging through email for PDFs before a flight.",
      author: "Alex P.",
      role: "Frequent traveler",
    },
    {
      quote:
        "The reminders saved me from an expired visa fiasco. Clean design, does one job perfectly.",
      author: "Sara M.",
      role: "Digital nomad",
    },
    {
      quote:
        "Exactly the minimalism I want. Attachments + quick actions = instant peace of mind.",
      author: "Daniel R.",
      role: "Product manager",
    },
  ];

  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeader
          eyebrow="Testimonials"
          title="Loved by organized travelers"
          subtitle="Real stories from early users and beta testers."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.author} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <blockquote className="text-slate-700">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-slate-500">
                <strong className="text-slate-800">{t.author}</strong> · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Newsletter() {
  return (
    <section id="newsletter" className="py-16">
      <Container>
        <SectionHeader
          eyebrow="Stay Updated"
          title="Join the VisaMate newsletter"
          subtitle="Product updates, launch news, and travel tips."
        />
        <form
          className="mx-auto mt-6 flex w-full max-w-lg items-center gap-2"
          method="POST"
          action="https://formspree.io/f/your-endpoint" /* TODO: replace with your provider endpoint */
        >
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input
            id="nl-email"
            name="email"
            type="email"
            required
            placeholder="you@domain.com"
            className="w-full flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
        <p className="mt-2 text-center text-xs text-slate-500">We’ll only email when there’s something useful.</p>
      </Container>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Is my data private?",
      a: "Yes. You can keep everything local-only on your device, or enable iCloud sync. App Lock supports Face ID / Touch ID.",
    },
    {
      q: "Can I attach PDFs and scans?",
      a: "Absolutely. Store your visa documents with each entry and access them in one tap.",
    },
    {
      q: "Will there be a web app?",
      a: "Yes. Web extensions are planned. Pro features like widgets and multi-profile are targeted for 2026.",
    },
    {
      q: "What are the Plus and Pro prices?",
      a: "Plus is $20 and Pro is $30. Exact billing period and regional pricing TBA.",
    },
  ];
  return (
    <section id="faq" className="bg-slate-50 py-20">
      <Container>
        <SectionHeader
          eyebrow="FAQ"
          title="Questions, answered"
          subtitle="Can’t find what you’re looking for? Email hello@visamate.app"
        />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {items.map((item, i) => (
            <Disclosure key={i} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Disclosure({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <svg
          className={`h-5 w-5 transition ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 text-slate-600">{a}</div>}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="flex items-center gap-3">
            <img
              src="/assets/visamate-icon.png"
              alt="VisaMate"
              className="h-8 w-8 rounded-xl shadow"
            />
            <div>
              <p className="font-semibold">VisaMate</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Your main travel companion</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-4 md:justify-end">
            <a id="blog" href="#" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Blog</a>
            <a href="#privacy" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Privacy</a>
            <a href="#terms" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Terms</a>
            <a href="#contact" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Contact</a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} VisaMate. All rights reserved.</p>
      </Container>
    </footer>
  );
}

// ——— Utilities: small class presets ———
// Tailwind presets emulated via classnames for buttons/links
const base = {
  btn:
    "inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-200",
  primary:
    "border-transparent bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
  ghost:
    "border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
  navLink:
    "text-sm text-slate-700 hover:text-slate-900",
};

// Attach these classes to the global scope by adding them to element className
// Example: className="btn btn-primary" → resolves to combined styles below.
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    .btn { ${toCss(base.btn)} }
    .btn-primary { ${toCss(base.primary)} }
    .btn-ghost { ${toCss(base.ghost)} }
    .nav-link { ${toCss(base.navLink)} }
  `;
  document.head.appendChild(style);
}

function toCss(cls) {
  // Convert a Tailwind class recipe into minimal, portable CSS via utility mapping if desired.
  // For preview simplicity, we keep it as-is so Tailwind handles it in real build.
  return "";
}

