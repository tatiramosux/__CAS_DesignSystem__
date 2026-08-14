"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUpRightFromSquare, faBars, faChevronLeft, faChevronRight, faMagnifyingGlass, faSquare } from "@fortawesome/free-solid-svg-icons";
import { cssVariables, themes, type ThemeId } from "@/app/token-data";
import { ThemeContext } from "@/components/theme-context";

type NavGroup = { label: string; mark: string; items: { href: string; label: string }[] };

const nav: NavGroup[] = [
  { label: "Getting Started", mark: "01", items: [{ href: "/", label: "Overview" }] },
  { label: "Foundations", mark: "02", items: [
    { href: "/governance", label: "Governance" }, { href: "/tokens", label: "Design tokens" },
    { href: "/color", label: "Color" }, { href: "/typography", label: "Typography" },
    { href: "/units", label: "Spacing & units" }, { href: "/radius", label: "Radius" }, { href: "/grid", label: "Grid & layout" },
  ] },
  { label: "Components", mark: "03", items: [{ href: "/components", label: "Component index" }, { href: "/components/buttons", label: "Buttons" }, { href: "/components/text-input", label: "Text Input" }, { href: "/components/badges", label: "Badges" }] },
  { label: "Patterns", mark: "04", items: [{ href: "/patterns", label: "Pattern index" }] },
  { label: "Resources", mark: "05", items: [{ href: "/resources", label: "Libraries & tools" }] },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>("carbrain-light");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // localStorage is unavailable during SSR, so the persisted theme can only be read post-hydration.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { const saved = localStorage.getItem("cas-theme") as ThemeId | null; if (saved) setTheme(saved); }, []);
  useEffect(() => { localStorage.setItem("cas-theme", theme); document.documentElement.dataset.theme = theme; }, [theme]);

  const matches = useMemo(() => query.trim() ? nav.flatMap(g => g.items).filter(x => x.label.toLowerCase().includes(query.toLowerCase())) : [], [query]);
  const go = (href: string) => { router.push(href); setMobileOpen(false); setQuery(""); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`app ${collapsed ? "is-collapsed" : ""}`} style={cssVariables(theme) as CSSProperties}>
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation"><FontAwesomeIcon icon={faBars} /></button>
          <Link href="/" className="brand" aria-label="CAS Design System home" onClick={() => setMobileOpen(false)}>
            <img src="/CAS-logo.svg" alt="CAS" /><b>Design System</b><small>v1.0</small>
          </Link>
          <div className="search-wrap">
            <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search the system" aria-label="Search the system" />
            {matches.length > 0 && (
              <div className="search-results">
                {matches.map(x => <button key={x.href} onClick={() => go(x.href)}>{x.label}<span>Open <FontAwesomeIcon icon={faArrowRight} /></span></button>)}
              </div>
            )}
          </div>
          <div className="top-actions">
            <a href="https://www.figma.com/design/ljmdJkv2aa10SL4NazHYAC/____CAS-Design-System--v1.0--____?node-id=1483-8372&t=f1D4dalJv9MCo0x2-1" target="_blank" rel="noreferrer">Figma <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
            <select value={theme} onChange={e => setTheme(e.target.value as ThemeId)} aria-label="Select theme">
              {themes.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
        </header>
        <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
          <nav>
            {nav.map(group => (
              <div className="nav-group" key={group.label}>
                <button className="nav-title" onClick={() => { if (collapsed) setCollapsed(false); else go(group.items[0].href); }}>
                  <span>{group.mark}</span><b>{group.label}</b>
                </button>
                <div className="nav-items">
                  {group.items.map(item => (
                    <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""} onClick={() => setMobileOpen(false)}>
                      <FontAwesomeIcon icon={faSquare} />{item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <button className="collapse" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <FontAwesomeIcon icon={faChevronRight} /> : <><FontAwesomeIcon icon={faChevronLeft} /> Collapse</>}
          </button>
        </aside>
        <button className="sidebar-handle" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} />
        </button>
        <main>
          {children}
          <footer><span>CAS Design System</span><span>English · Figma Variables source · 2026</span></footer>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}
