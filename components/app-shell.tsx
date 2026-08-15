"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUpRightFromSquare, faBars, faChevronLeft, faChevronRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { cssVariables, themes, type ThemeId } from "@/app/token-data";
import { ThemeContext } from "@/components/theme-context";
import { Dropdown } from "@/components/ui/dropdown";
import { SidebarItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type NavGroup = { label: string; mark: string; items: { href: string; label: string }[] };

const nav: NavGroup[] = [
  { label: "Getting Started", mark: "01", items: [{ href: "/", label: "Overview" }] },
  { label: "Foundations", mark: "02", items: [
    { href: "/governance", label: "Governance" }, { href: "/tokens", label: "Design tokens" },
    { href: "/color", label: "Color" }, { href: "/typography", label: "Typography" },
    { href: "/units", label: "Spacing & units" }, { href: "/radius", label: "Radius" }, { href: "/grid", label: "Grid & layout" },
  ] },
  { label: "Components", mark: "03", items: [
    { href: "/components", label: "Component index" },
    ...[
      { href: "/components/accordion", label: "Accordion" },
      { href: "/components/alerts", label: "Alerts" },
      { href: "/components/avatars", label: "Avatars" },
      { href: "/components/badges", label: "Badges" },
      { href: "/components/breadcrumbs", label: "Breadcrumbs" },
      { href: "/components/buttons", label: "Buttons" },
      { href: "/components/card", label: "Card" },
      { href: "/components/checkbox", label: "Checkbox" },
      { href: "/components/content-card", label: "Content Card" },
      { href: "/components/divider", label: "Divider" },
      { href: "/components/dropdown", label: "Dropdown" },
      { href: "/components/icon", label: "Icon" },
      { href: "/components/label", label: "Label" },
      { href: "/components/loading", label: "Loading" },
      { href: "/components/pagination", label: "Pagination" },
      { href: "/components/progress-indicators", label: "Progress Indicators" },
      { href: "/components/radio-button", label: "Radio Button" },
      { href: "/components/rating", label: "Rating" },
      { href: "/components/scroll", label: "Scroll" },
      { href: "/components/sidebar", label: "Sidebar" },
      { href: "/components/stepper", label: "Stepper" },
      { href: "/components/switch", label: "Switch" },
      { href: "/components/table", label: "Table" },
      { href: "/components/tabs", label: "Tabs" },
      { href: "/components/text-area", label: "Text Area" },
      { href: "/components/text-input", label: "Text Input" },
      { href: "/components/toggle-button", label: "Toggle Button" },
      { href: "/components/tooltip", label: "Tooltip" },
    ].sort((a, b) => a.label.localeCompare(b.label)),
  ] },
  { label: "Visual Assets", mark: "04", items: [
    ...[{ href: "/visual-assets/icons", label: "Icons" }, { href: "/visual-assets/illustrations", label: "Illustrations" }]
      .sort((a, b) => a.label.localeCompare(b.label)),
  ] },
  { label: "Templates", mark: "05", items: [{ href: "/templates", label: "Templates index" }] },
  { label: "Resources", mark: "06", items: [{ href: "/resources", label: "Libraries & tools" }] },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>("carbrain-light");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
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
            <a href="https://www.figma.com/design/ljmdJkv2aa10SL4NazHYAC/____CAS-Design-System--v1.0--____?node-id=1-574&t=f1D4dalJv9MCo0x2-1" target="_blank" rel="noreferrer">Figma <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
            <div style={{ width: 172 }}>
              <Dropdown
                aria-label="Select theme"
                size="sm"
                inverse
                position="right"
                value={theme}
                onChange={v => setTheme(v as ThemeId)}
                options={themes.map(t => ({ value: t.id, label: t.label }))}
              />
            </div>
          </div>
        </header>
        <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
          <nav className="flex flex-col gap-1 px-1">
            {nav.map(group => (
              <SidebarItem
                key={group.label}
                text={group.label}
                expanded={expandedGroup === group.label}
                onExpandedChange={next => {
                  if (collapsed) { setCollapsed(false); return; }
                  setExpandedGroup(next ? group.label : null);
                }}
              >
                {group.items.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block truncate rounded px-2 py-1.5 font-body text-sm no-underline transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--action-secondary-base)_8%,transparent)]",
                      pathname === item.href ? "font-bold text-[var(--action)]" : "font-normal text-[var(--text-muted)]"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </SidebarItem>
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
