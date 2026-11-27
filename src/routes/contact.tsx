import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Phone, Heart, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading, SocialLinks } from "@/components/site-shell";
import { contactSchema, contactSearchSchema, formEndpoint, pageHead } from "@/lib/sewing";
export const Route = createFileRoute("/contact")({
  validateSearch: (search) => contactSearchSchema.parse(search),
  head: () =>
    pageHead(
      "Contact & Custom Orders",
      "Share your custom sewing idea with Sarah Manas at OhSEWDear. Request handmade clothing, accessories, quilts, or gifts.",
    ),
  component: Contact,
});
function Contact() {
  const search = Route.useSearch();
  const [description, setDescription] = useState(search.description ?? "");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  useEffect(() => {
    setDescription(search.description ?? "");
  }, [search.description]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const result = contactSchema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone") ?? "",
      description,
    });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!response.ok)
        throw new Error(
          "Your request could not be sent. Please try again, or contact Sarah by phone.",
        );
      setStatus("success");
    } catch {
      setError(
        "Your request could not be sent. Please try again, or contact Sarah by phone.",
      );
      setStatus("idle");
    }
  }
  return (
    <>
      <PageHeading
        title="Let’s make something dear"
        description="Tell me a little about what you have in mind. I’d love to help turn your idea into a handmade piece you’ll treasure."
      />
      <section className="section content-width contact-layout">
        <aside className="contact-info">
          <div className="eyebrow">
            <Heart size={14} /> A personal hello
          </div>
          <h2>Hi, I’m Sarah.</h2>
          <p>
            Every piece starts with a conversation. Share your inspiration, ask a question, or just
            say hello — I’d love to hear from you.
          </p>
          <div className="contact-detail">
            <Heart size={19} />
            <span>Sarah Manas · OhSEWDear</span>
          </div>
          <a className="contact-detail" href="tel:+12054278923">
            <Phone size={19} />
            (205) 427-8923
          </a>
          <div className="mt-8">
            <p className="mb-3! text-xs!">A little more inspiration</p>
            <SocialLinks />
          </div>
        </aside>
        {status === "success" ? (
          <div className="form-success" role="status">
            <Check size={32} />
            <h2>Your idea is on its way!</h2>
            <p>Thank you for sharing your request with OhSEWDear.</p>
            <Button
              className="mt-6"
              variant="outline"
              onClick={() => {
                setStatus("idle");
                setDescription("");
              }}
            >
              Send another request
            </Button>
          </div>
        ) : (
          <form className="contact-form" action={formEndpoint} method="POST" onSubmit={submit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Your name *</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Your name"
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={255}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="phone">
                Phone number <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
                placeholder="(205) 555-0123"
              />
            </div>
            <div className="field">
              <label htmlFor="description">What would you like made? *</label>
              <textarea
                id="description"
                name="description"
                required
                maxLength={5000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell me about your idea, favorite colors, sizes, or a special occasion…"
              />
            </div>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div>
              <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send My Request <ArrowRight />
                  </>
                )}
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                A little idea is all you need to get started.
              </p>
            </div>
          </form>
        )}
      </section>
    </>
  );
}
