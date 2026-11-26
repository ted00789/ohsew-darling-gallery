import { z } from "zod";
import clothing from "@/assets/clothing.webp.asset.json";
import bows from "@/assets/bows.webp.asset.json";
import home from "@/assets/home.webp.asset.json";
export const categories = [
  "Kids’ Clothing",
  "Hair Accessories",
  "Home Decor",
  "Birthday",
  "Quilts & Larger Pieces",
  "Embroidery & Appliqué",
  "Bookmarks & Small Items",
] as const;
export const portfolio = [
  { name: "Mint gingham flutter dress", category: categories[0], image: clothing.url },
  { name: "A little bundle of bows", category: categories[1], image: bows.url },
  { name: "Floral embroidery hoop", category: categories[2], image: home.url },
  { name: "Pastel birthday bunting", category: categories[3], image: home.url },
  { name: "Keepsake patchwork quilt", category: categories[4], image: home.url },
  { name: "Sweet floral embroidery", category: categories[5], image: home.url },
  { name: "Little fabric keepsakes", category: categories[6], image: bows.url },
];
export const similarDescription = (name: string) =>
  `I’d like something similar to ${name} (or based on this design but with different colors/details).`;
export const formEndpoint = "https://formspree.io/f/xjywzpbz";
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().max(40),
  description: z.string().trim().min(1, "Please describe what you’d like made.").max(5000),
});
export const contactSearchSchema = z.object({
  description: z.string().max(5000).optional().catch(""),
});
export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | OhSEWDear` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | OhSEWDear` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
