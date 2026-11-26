import { createFileRoute } from "@tanstack/react-router";
import { Scissors, Heart, Flower2, Gift, Layers, Sparkles, Bookmark } from "lucide-react";
import { PageHeading, CustomBand } from "@/components/site-shell";
import { categories, pageHead } from "@/lib/sewing";
export const Route = createFileRoute("/pricing")({
  head: () =>
    pageHead(
      "Custom Piece Pricing",
      "Starting prices for custom handmade sewing by OhSEWDear. Every piece is tailored to your idea and details.",
    ),
  component: Pricing,
});
const icons = [Scissors, Heart, Flower2, Gift, Layers, Sparkles, Bookmark];
const descriptions = [
  "Sweet outfits, playful dresses, and pieces made for little personalities.",
  "Bows and accessories with your favorite fabrics and colors.",
  "Handmade touches to make your space feel like home.",
  "Personal pieces to celebrate a very special day.",
  "Keepsake quilts and larger projects to treasure.",
  "A name, a motif, or a detail that makes it yours.",
  "Small handmade gifts with a thoughtful personal touch.",
];
function Pricing() {
  return (
    <>
      <PageHeading
        title="Made for you, priced for your piece"
        description="Every creation is custom. These starting prices are a guide; your final price depends on the fabric, size, and details we choose together."
      />
      <section className="section content-width">
        <div className="category-grid">
          {categories.map((category, i) => {
            const Icon = icons[i] ?? Heart;
            return (
              <article className="price-card" key={category}>
                <Icon size={26} strokeWidth={1.5} />
                <h2>{category}</h2>
                <p>{descriptions[i]}</p>
                <div className="price-value">Starting at $X</div>
              </article>
            );
          })}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">
          Prices are being finalized. Please get in touch for a quote for your custom piece.
        </p>
      </section>
      <CustomBand />
    </>
  );
}
