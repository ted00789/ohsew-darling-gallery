import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Instagram, Facebook, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.webp.asset.json";
const nav = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/pricing", label: "Pricing" },
  { to: "/how-it-works", label: "How It Works" },
] as const;
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" aria-label="OhSEWDear home" onClick={() => setOpen(false)}>
          <img
            className="brand-logo"
            src={logo.url}
            alt="Oh SEW Dear vintage sewing machine logo"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="nav-link" activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
          <Button asChild size="lg">
            <Link to="/contact">
              Let’s Make Something <Heart size={15} />
            </Link>
          </Button>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="nav-link" onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className="nav-link" onClick={() => setOpen(false)}>
            Contact / Order
          </Link>
        </nav>
      )}
    </header>
  );
}
export function SocialLinks() {
  return (
    <div className="footer-social">
      <a
        href="https://www.instagram.com/ohsewdear"
        target="_blank"
        rel="noreferrer"
        aria-label="OhSEWDear on Instagram"
      >
        <Instagram size={19} />
      </a>
      <a
        href="https://www.facebook.com/share/1EDcSmoEYs/"
        target="_blank"
        rel="noreferrer"
        aria-label="OhSEWDear on Facebook"
      >
        <Facebook size={19} />
      </a>
    </div>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-width">
        <div className="footer-main">
          <div>
            <Link to="/" className="footer-brand">
              OhSEWDear
            </Link>
            <p className="footer-tagline">Handmade creations for those dearest to you.</p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
            <Link to="/gallery">Gallery</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/contact">Contact / Order</Link>
          </div>
          <SocialLinks />
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} OhSEWDear. Made with love by Sarah Manas.</span>
          <a href="tel:+12054278923">(205) 427-8923</a>
        </div>
      </div>
    </footer>
  );
}
export function PageHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="page-heading">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
export function CustomBand() {
  return (
    <section className="personal-band">
      <Heart className="mx-auto text-primary" size={24} strokeWidth={1.4} />
      <h2>A little idea. A lot of love.</h2>
      <p>
        Something for a little one, a special celebration, or a place you call home.
        <br className="hidden sm:block" /> Let’s make a piece that’s just right for you.
      </p>
      <Button asChild size="lg">
        <Link to="/contact">
          Request a Custom Piece <ArrowRight />
        </Link>
      </Button>
    </section>
  );
}
