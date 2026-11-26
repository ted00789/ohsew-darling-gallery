import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Scissors, Sparkles, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomBand } from "@/components/site-shell";
import { pageHead } from "@/lib/sewing";
import hero from "@/assets/hero.webp.asset.json";
import clothing from "@/assets/clothing.webp.asset.json";
import bows from "@/assets/bows.webp.asset.json";
import home from "@/assets/home.webp.asset.json";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Handmade with love",
      "Custom children’s clothing, hair accessories, quilts, embroidery, and thoughtful handmade creations by Sarah Manas.",
    ),
  component: Index,
});
const previews = [
  {
    title: "Kids’ Clothing",
    description: "Little outfits for big memories. Made for your one-of-a-kind little ones.",
    image: clothing.url,
  },
  {
    title: "Hair Accessories",
    description: "Sweet bows and pretty little details to brighten every day.",
    image: bows.url,
  },
  {
    title: "Home & Celebrations",
    description: "Thoughtful touches for cozy homes and moments worth celebrating.",
    image: home.url,
  },
];
function Index() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-photo"
          src={hero.url}
          alt="Mint gingham dress, floral bow, and sewing supplies on a linen worktable"
          fetchPriority="high"
        />
        <div className="content-width hero-content">
          <div className="hero-copy">
            <div className="eyebrow">
              <Scissors size={15} /> Thoughtfully stitched. Lovingly made.
            </div>
            <p className="hero-brand">OhSEWDear — by Sarah Manas</p>
            <h1>
              Handmade creations
              <br />
              for those <em>dearest</em>
              <br />
              to you.
            </h1>
            <p className="hero-summary">
              From little outfits to treasured keepsakes, each piece is made just for you — with
              care in every stitch.
            </p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <Link to="/gallery">
                  See the Gallery <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Request a Custom Piece</Link>
              </Button>
            </div>
            <div className="hero-note">
              <Heart size={13} /> A personal touch, from my sewing room to you.
            </div>
          </div>
        </div>
      </section>
      <div className="trust-strip">
        <span>
          <Scissors size={16} /> Handmade with care
        </span>
        <span>
          <Sparkles size={16} /> Made just for you
        </span>
        <span>
          <Leaf size={16} /> Little details, big love
        </span>
      </div>
      <section className="section content-width">
        <div className="section-heading">
          <h2>Something special, just for you</h2>
          <p>
            Custom kids’ clothing, hair accessories, home decorations, birthday details,
            <br className="hidden md:block" /> quilts, embroidery & appliqué — made to make you
            smile.
          </p>
        </div>
        <div className="category-grid">
          {previews.map((item) => (
            <Link to="/gallery" key={item.title} className="category-card">
              <div className="overflow-hidden">
                <img
                  className="category-image"
                  src={item.image}
                  alt={item.title + " — sample inspiration"}
                  loading="lazy"
                />
              </div>
              <div className="category-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="category-link">
                  Find your inspiration <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CustomBand />
    </>
  );
}
