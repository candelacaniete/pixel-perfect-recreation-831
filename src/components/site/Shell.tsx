import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { socials, subscribeUrl, substackHome } from "@/content/yrmis";

const nav = [
  { to: "/about", label: "About" },
  { to: "/work", label: "Work with me" },
  { to: "/speaking", label: "Speaking" },
  { to: "/ventures", label: "Ventures" },
  { to: "/press", label: "Press kit" },
  { to: "/signals", label: "1•1•1 Signals" },
] as const;

export function Shell({ children, page = false }: { children: ReactNode; page?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className={page ? "living page" : "living"}>
      <a className="sr-only" href="#content">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <nav className="nav" aria-label="Primary">
        <Link to="/" className="brand">
          Yrmis Barroeta
        </Link>
        <ul>
          {nav.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className={path === item.to ? "on" : undefined} aria-current={path === item.to ? "page" : undefined}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ctas">
          <Link to="/contact" search={{ interest: "Consulting Studio" }} className="btn">
            Start a conversation
          </Link>
          <a className="btn red" href={subscribeUrl} target="_blank" rel="noreferrer">
            Subscribe now
          </a>
        </div>
      </nav>
      <div id="content">{children}</div>
      <footer className="chapter short">
        <div className="grid">
          <div className="sq w2 inkb lined">
            <p className="d h-xl">
              Wild black wool
              <br />
              <em>never dyes.</em>
            </p>
            <div>
              <div className="eyebrow">Yrmis Barroeta · Wild Innovation</div>
              <div className="social">
                {socials.map((item) => (
                  <a key={item.name} href={item.href} aria-label={item.name} target="_blank" rel="noreferrer">
                    {item.name === "LinkedIn" ? "in" : item.name === "Instagram" ? "IG" : "𝕏"}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="sq bone">
            <div className="eyebrow">Site</div>
            <ul className="list small">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sq redb">
            <div className="eyebrow">1•1•1 Signals</div>
            <p className="d h-m">Field notes, free, every other week.</p>
            <div>
              <a className="btn" href={subscribeUrl} target="_blank" rel="noreferrer">
                Subscribe now
              </a>
              <p className="small" style={{ marginTop: 10 }}>
                <a href={substackHome} target="_blank" rel="noreferrer">
                  yrmis.substack.com ↗
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="fine">
          <span>© Yrmis Barroeta</span>
          <Link to="/world">Explore Yrmis World</Link>
        </div>
      </footer>
    </div>
  );
}
