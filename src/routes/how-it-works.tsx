import { createFileRoute } from "@tanstack/react-router";
import { PageHeading, CustomBand } from "@/components/site-shell";
import { pageHead } from "@/lib/sewing";
export const Route = createFileRoute("/how-it-works")({
  head: () =>
    pageHead(
      "How It Works",
      "From your first idea to your handmade piece: discover the simple custom sewing process with Sarah at OhSEWDear.",
    ),
  component: HowItWorks,
});
const steps = [
  {
    title: "You bring the idea",
    text: "Reach out with what you’d love to have made. A picture, a favorite color, or just a little spark of inspiration is a lovely place to start.",
  },
  {
    title: "We dream up the details",
    text: "We work together to make sure the final idea is exactly how you imagined it — from the fabrics and colors to those special little touches.",
  },
  {
    title: "I make it for you",
    text: "I bring our idea to life, with thoughtful details and care in every stitch. A handmade creation for someone dear to you.",
  },
];
const faqs = [
  {
    q: "Do I need an exact design?",
    a: "Not at all. You can bring a photo, a few ideas, or simply tell me who the piece is for. We can work out the details together.",
  },
  {
    q: "How long does it take?",
    a: "Timing depends on the piece and my current projects. Let me know if you have a special date in mind, and we’ll discuss what’s possible before you order.",
  },
  {
    q: "Can I request different colors or personal details?",
    a: "Absolutely. Tell me about your favorite colors, a name you’d like embroidered, or any special details you have in mind.",
  },
  {
    q: "How will I know the final price?",
    a: "Once we’ve talked through your idea, fabrics, size, and details, I’ll share a quote for your custom piece.",
  },
];
function HowItWorks() {
  return (
    <>
      <PageHeading
        title="From your idea to something dear"
        description="A simple, personal process. We’ll create something lovely together, one thoughtful detail at a time."
      />
      <section className="section content-width">
        <div className="steps">
          {steps.map((step, i) => (
            <div key={step.title}>
              <div className="step-number">0{i + 1}</div>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section bg-muted">
        <div className="content-width">
          <div className="section-heading">
            <h2>A few things you might wonder</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CustomBand />
    </>
  );
}
