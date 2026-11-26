import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading, CustomBand } from "@/components/site-shell";
import { categories, portfolio, similarDescription, pageHead } from "@/lib/sewing";
export const Route = createFileRoute("/gallery")({
  head: () =>
    pageHead(
      "Gallery & Inspiration",
      "Explore inspiration for custom handmade clothing, bows, quilts, embroidery, and gifts from OhSEWDear.",
    ),
  component: Gallery,
});
function Gallery() {
  const [filter, setFilter] = useState("All");
  const items = portfolio.filter((item) => filter === "All" || item.category === filter);
  return (
    <>
      <PageHeading
        title="A little inspiration"
        description="Find a starting point for something uniquely yours. Different colors, a personal detail, a whole new idea — there’s room to make it your own."
      />
      <section className="section content-width">
        <div className="filter-row" aria-label="Gallery categories">
          {["All", ...categories].map((c) => (
            <Button
              key={c}
              variant={filter === c ? "default" : "outline"}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              size="sm"
            >
              {c}
            </Button>
          ))}
        </div>
        <p className="gallery-caption">
          Sample inspiration • Sarah’s own creations are coming soon.
        </p>
        <div className="gallery-grid">
          {items.map((item) => (
            <article className="category-card" key={item.name}>
              <img
                src={item.image}
                alt={item.name + " — illustrative sample"}
                className="category-image"
                loading="lazy"
              />
              <div className="category-body">
                <p className="sample-label">{item.category}</p>
                <h3>{item.name}</h3>
                <Button asChild variant="link" className="p-0 mt-2">
                  <Link to="/contact" search={{ description: similarDescription(item.name) }}>
                    Request Similar <ArrowRight />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CustomBand />
    </>
  );
}
