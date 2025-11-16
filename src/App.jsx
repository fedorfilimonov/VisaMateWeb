import React, { useEffect, useState } from "react";

export default function VisaMateLandingPage() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system"
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = (t) => {
      const isDark = t === "dark" || (t === "system" && mql.matches);
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      );
    };

    apply(theme);
    const handler = () => theme === "system" && apply("system");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header theme={theme} setTheme={setTheme} />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

/* Layout */

function Container({ children }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

/* Header */

function Header({ theme, setTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <img
              src="/assets/visamate-icon.png"
              alt="VisaMate"
              className="h-7 w-7 rounded-xl shadow"
            />
            <span className="text-sm font-semibold tracking-tight">
              VisaMate
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#pricing" className="nav-link">
              Pricing
            </a>
            <a href="#faq" className="nav-link">
              FAQ
            </a>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {open && (
          <div className="pb-3 md:hidden">
            <div className="mt-2 grid gap-2 border-t border-zinc-200 pt-2 dark:border-zinc-800">
              <a href="#features" className="nav-link">
                Features
              </a>
              <a href="#pricing" className="nav-link">
                Pricing
              </a>
              <a href="#faq" className="nav-link">
                FAQ
              </a>
              <div className="mt-2 flex items-center justify-between">
                <ThemeToggle theme={theme} setTheme={setTheme} />
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

function ThemeToggle({ theme, setTheme }) {
  const cycle = () => {
    const next =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    localStorage.setItem("theme", next);
    setTheme(next);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = next === "dark" || (next === "system" && mql.matches);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  };

  const label =
    theme === "system" ? "System" : theme === "light" ? "Light" : "Dark";

  return (
    <button
      type="button"
      onClick={cycle}
      className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-800"
    >
      <span
        className={`h-2 w-2 rounded-full ${
          label === "Dark"
            ? "bg-zinc-100"
            : label === "Light"
            ? "bg-zinc-900"
            : "bg-zinc-400"
        }`}
      />
      <span>Theme: {label}</span>
    </button>
  );
}

/* Hero */

function Hero() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-950 dark:to-black" />
      <Container>
        <div className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200">
              ✈️ Your main travel companion
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              All your visas, one tidy place.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              VisaMate keeps your visa details, scans, and reminders organised,
              so you don’t need to dig through emails or spreadsheets before
              every trip.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex items-center focus:outline-none"
              >
                <img
                  src="/assets/appstore-badge.svg"
                  alt="Download on the App Store"
                  className="h-9"
                />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto aspect-[110/239] w-full max-w-[340px] overflow-hidden rounded-[32px] border border-zinc-200 bg-black shadow-2xl dark:border-zinc-700 dark:bg-black">
              {/* Light hero mock */}
              <img
                src="/assets/hero-light.png"
                alt="VisaMate app preview (light)"
                className="h-full w-full object-cover dark:hidden"
              />
              {/* Dark hero mock */}
              <img
                src="/assets/hero-dark.png"
                alt="VisaMate app preview (dark)"
                className="hidden h-full w-full object-cover dark:block"
              />
            </div>
          </div>
        </div>
      </Container>

      {showModal && <AppStoreModal onClose={() => setShowModal(false)} />}
    </section>
  );
}

function AppStoreModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6 text-sm text-zinc-100 shadow-xl">
        <h2 className="text-base font-semibold">Coming soon to the App Store</h2>
        <p className="mt-3 text-xs text-zinc-300">
          VisaMate is in the final stage of development and preparation for App
          Store submission. We&apos;re polishing the experience to make sure
          your visas are handled reliably from day one.
        </p>
        <p className="mt-2 text-xs text-zinc-400">
          Check back soon or follow our updates to be notified when the app is
          available.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-zinc-600 px-4 py-1.5 text-xs font-medium text-zinc-100 hover:bg-zinc-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* Sections: Features, Pricing */

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Features() {
  const items = [
    {
      title: "Visa vault",
      desc: "Store visa number, issuing country, type, expiry, entries, and notes in one place.",
    },
    {
      title: "Smart reminders",
      desc: "Get notified well before expiry, so renewals are calm and predictable.",
    },
    {
      title: "Scans & photos",
      desc: "Attach PDFs or photos of visas and invitations next to each entry.",
    },
    {
      title: "Search & tags",
      desc: "Filter by country, purpose, or trip instead of scrolling endlessly.",
    },
    {
      title: "Travel docs (Pro)",
      desc: "Store passports, insurance, vaccination certificates, loyalty cards, and more.",
    },
    {
      title: "Roadmap: AI & widgets",
      desc: "Planned tools like AI assistant, stay tracking widgets, and multi-profile support.",
    },
  ];
  return (
    <section id="features" className="py-14">
      <Container>
        <SectionHeader
          eyebrow="Features"
          title="Built for people who cross borders often"
          subtitle="From simple storage to pro-level tools for heavy travellers."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div key={f.title} className="section-card p-5">
              <h3 className="text-sm font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-14">
      <Container>
        <SectionHeader
          eyebrow="Pricing"
          title="Simple, annual pricing"
          subtitle="Start with Lite. Upgrade when your travels demand more."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Plan
            name="Lite"
            price="$0"
            tagline="For a few visas"
            features={["Up to 3 visas", "Basic details & notes", "Local-only storage"]}
          />
          <Plan
            name="Plus"
            price="$20/year"
            tagline="For frequent travellers"
            highlight
            features={[
              "Unlimited visas",
              "Expiry reminders",
              "Scans & photos",
              // removed "Search & tags"
              "Exclusive themes/icons",
              // removed "Newsletter access"
            ]}
          />
          <Plan
            name="Pro"
            price="$30/year"
            tagline="For power travellers"
            features={[
              "Everything in Plus",
              "Travel docs storage",
              "Smart Stay Tracker",
              // removed "Custom reminders"
              "Export & backup",
              "Family Sharing",
              "Widgets / Multi-profile / AI (2026)",
            ]}
          />
        </div>
      </Container>
    </section>
  );
}

function Plan({ name, price, tagline, features, highlight }) {
  return (
    <div
      className={`section-card p-6 ${
        highlight ? "border-zinc-900 shadow-md dark:border-zinc-100" : ""
      }`}
    >
      <h3 className="text-sm font-semibold">{name}</h3>
      <p className="mt-1 text-xl font-semibold">{price}</p>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{tagline}</p>
      <ul className="mt-4 space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <span>•</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* FAQ */

function FAQ() {
  const items = [
    {
      q: "Is my data private?",
      a: "Yes. You can keep everything local-only on your device, or enable iCloud sync. App Lock will support Face ID / Touch ID where available.",
    },
    {
      q: "Where is my data stored?",
      a: "Visa data is stored on your device, and optionally in iCloud if you enable sync. We do not use random third-party servers for your documents.",
    },
    {
      q: "Will there be a web or Android app?",
      a: "The first release focuses on iOS. Web and Android are on the longer-term roadmap once the core experience is stable.",
    },
    {
      q: "How do reminders work?",
      a: "VisaMate uses scheduled notifications on your device with configurable lead times, so you can set what “in advance” means for you.",
    },
    {
      q: "Can I change plans later?",
      a: "Yes. You will be able to upgrade from Lite to Plus or Pro, or downgrade, using Apple’s subscription management.",
    },
    {
      q: "What happens if I cancel my subscription?",
      a: "Your data stays on your device. Some Pro or Plus features will stop working, but you won’t lose your stored visas.",
    },
    {
      q: "Do you support families or multiple profiles?",
      a: "Pro is designed with families and power travellers in mind. Multi-profile support is part of the roadmap for 2026.",
    },
    {
      q: "Can I export my data?",
      a: "In Pro, export and backup features will let you generate PDF/CSV summaries for your records or travel planning.",
    },
  ];

  return (
    <section id="faq" className="bg-zinc-100 py-14 dark:bg-zinc-900">
      <Container>
        <SectionHeader
          eyebrow="FAQ"
          title="Questions, answered"
          subtitle="If you have more questions, you’ll be able to reach us directly from the app."
        />
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
          {items.map((item, idx) => (
            <FAQItem key={idx} q={item.q} a={item.a} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium">{q}</span>
        <svg
          className={`h-5 w-5 transform transition ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 text-xs text-zinc-600 dark:text-zinc-300">
          {a}
        </div>
      )}
    </div>
  );
}

/* Footer */

function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-8 text-xs dark:border-zinc-800 dark:bg-zinc-950">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <img
              src="/assets/visamate-icon.png"
              alt="VisaMate"
              className="h-7 w-7 rounded-xl shadow"
            />
            <div>
              <p className="font-medium">VisaMate</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Your main travel companion.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              Updates
            </a>
            <a
              href="#"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              Privacy
            </a>
            <a
              href="mailto:email@visamate.com"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              Contact support
            </a>
          </div>
        </div>
        <p className="mt-4 text-[11px] text-zinc-500">
          © {new Date().getFullYear()} VisaMate. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}