import {useEffect, useId, useRef, useState} from "react";
import {IconArrowRight, IconMenu2, IconX} from "@tabler/icons-react";
import {Link} from "@/link";
import {ScoutShowcase} from "./components/scout-showcase";

const nav = [
  {label: "Scout", to: "/scout"},
  {label: "Prospect List", to: "/track"},
  {label: "CSIN Analyst", to: "/analyst?org=ottawa"},
];

function NavLinks({onNavigate}: {onNavigate?: () => void}) {
  return (
    <>
      {nav.map((item) => (
        <Link key={item.label} to={item.to} onClick={onNavigate}>
          {item.label}
        </Link>
      ))}
      <a className="nav-primary" href="#capabilities" onClick={onNavigate}>
        Watch demo
      </a>
    </>
  );
}

export default function Landing() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="csin-landing">
      <header className="landing-header" ref={headerRef}>
        <Link to="/" className="landing-brand">
          CSIN
        </Link>
        <nav className="landing-nav" aria-label="Primary navigation">
          <NavLinks />
        </nav>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <IconX aria-hidden="true" /> : <IconMenu2 aria-hidden="true" />}
          <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
        </button>
        {open && (
          <nav id={menuId} className="landing-menu" aria-label="Mobile navigation">
            <NavLinks onNavigate={() => setOpen(false)} />
          </nav>
        )}
      </header>

      <main>
        <section className="landing-hero">
          <div className="hero-copy">
            <p className="eyebrow">Corporate Social Intelligence Network</p>
            <h1>CSIN</h1>
            <p className="hero-line">
              Discover impactful organizations through our Corporate Social Intelligence Network.
            </p>
            <div className="hero-actions">
              <a href="#capabilities" className="button-outline">
                See how it works
              </a>
              <Link to="/scout" className="button-solid">
                Get Started <IconArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section id="capabilities" className="capability-section scout-capability">
          <div className="section-heading">
            <span>01</span>
            <div>
              <h2>Scout Network</h2>
              <p>Set the funding criteria. See the organizations that match.</p>
            </div>
            <Link to="/scout">
              Open Scout <IconArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ScoutShowcase />
        </section>

        <section className="capability-section screenshot-section">
          <div className="section-heading">
            <span>02</span>
            <div>
              <h2>Organization Profile</h2>
              <p>Review the organization before opening its program evidence.</p>
            </div>
            <Link to="/evidence?org=ottawa">
              Open Profile <IconArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="product-frame">
            <img
              src="/assets/organization-profile.png"
              alt="CSIN organization profile showing organization details, evidence ratings and program analysis actions"
              loading="lazy"
            />
          </div>
        </section>

        <section className="capability-section screenshot-section">
          <div className="section-heading">
            <span>03</span>
            <div>
              <h2>Program Analysis</h2>
              <p>Open findings, discuss the evidence and keep funding approval human.</p>
            </div>
            <Link to="/evidence?org=ottawa&view=analysis">
              Open Analysis <IconArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="product-frame">
            <img
              src="/assets/program-analysis.png"
              alt="CSIN program analysis with evidence tiles and the voice analyst call action"
              loading="lazy"
            />
          </div>
        </section>

        <section className="landing-close">
          <p>Scout → Review → Discuss → Fund</p>
          <h2>Start with the evidence.</h2>
          <Link to="/scout" className="button-solid">
            Open Scout <IconArrowRight aria-hidden="true" />
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <span>CSIN</span>
        <span>Sample hackathon demonstration</span>
      </footer>
    </div>
  );
}
