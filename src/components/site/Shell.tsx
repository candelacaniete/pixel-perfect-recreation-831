import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useId, useState, type ReactNode } from "react";
import { socials, subscribeUrl, substackHome } from "@/content/yrmis";

type SitePath = "/" | "/about" | "/work" | "/speaking" | "/ventures" | "/press" | "/signals" | "/contact" | "/world" | "/river" | "/click" | "/home";

const nav = [
  { to: "/about", label: "About" },
  { to: "/work", label: "Work with me" },
  { to: "/speaking", label: "Speaking" },
  { to: "/ventures", label: "Entrepreneurial Ventures" },
  { to: "/press", label: "Press kit" },
  { to: "/signals", label: "1•1•1 Signals Newsletter" },
] as const;

export function Chapter({
  n,
  title,
  to,
}: {
  n: string;
  title: string;
  to: SitePath;
}) {
  return (
    <Link to={to} className="ed-chapter">
      <span>{n}</span>
      <h2>{title}</h2>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="ed">
      <a className="sr-only" href="#content">
        Skip to content
      </a>
      <header className="ed-header">
        <Link to="/" className="ed-logo">
          Yrmis Barroeta
        </Link>
        <button
          type="button"
          className="ed-menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
        <nav id={menuId} className={open ? "ed-nav is-open" : "ed-nav"} aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={path === item.to ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link to="/contact" search={{ interest: "Consulting Studio" }} className="ed-cta">
          Start a conversation
        </Link>
      </header>
      <main id="content" className="ed-main">
        {children}
      </main>
      <footer className="ed-footer">
        <div className="ed-footer-grid">
          <div className="ed-foot-brand">
            <h2>Wild black wool never dyes.</h2>
            <p>Yrmis Barroeta · Wild Innovation</p>
            <div className="ed-socials">
              {socials.map((item) => (
                <a key={item.name} href={item.href} aria-label={item.name} target="_blank" rel="noreferrer">
                  {item.name === "LinkedIn" ? "in" : item.name === "Instagram" ? "IG" : "𝕏"}
                </a>
              ))}
            </div>
          </div>
          <nav className="ed-foot-site" aria-label="Site">
            <p className="ed-eyebrow">Site</p>
            {nav.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ed-foot-signals">
            <p className="ed-eyebrow">1•1•1 Signals</p>
            <h2>Field notes, free, every other week.</h2>
            <a className="ed-control" href={subscribeUrl}>
              Subscribe now
            </a>
          </div>
        </div>
        <div className="ed-fine">
          <span>© Yrmis Barroeta</span>
          <a href={substackHome}>yrmis.substack.com</a>
          <Link to="/world">Explore Yrmis World</Link>
        </div>
      </footer>
    </div>
  );
}
