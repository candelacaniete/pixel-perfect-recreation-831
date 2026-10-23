import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { workOptions } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";
import { Scene, CrossingBird } from "@/components/safari/motion";
import tiger from "@/assets/tiger.png";
import gJabiru from "@/assets/g-jabiru.webp";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work with me — Five ways to click into your wild · Yrmis" },
      { name: "description", content: "Keynotes, the Studio, a feature in Signals, a newsletter engine of your own — or something not yet named." },
      { property: "og:title", content: "Work with Yrmis" },
      { property: "og:description", content: "Five ways to click into your wild." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});

type Status = "idle" | "sending" | "sent" | "error";

function WorkPage() {
  useEffect(() => markVisited("work"), []);
  const [pick, setPick] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const interest = String(f.get("interest") || "").trim();
    const message = String(f.get("message") || "").trim();
    if (!name || !email || !message) return;
    setStatus("sending");
    setErrorMsg("");
    const { error } = await supabase.from("contact_messages").insert({ name, email, interest, message });
    if (error) {
      setErrorMsg("The message didn't go through. Please try again — nothing was sent.");
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  return (
    <main className="bg-scarlet text-paper">
      <Scene className="relative overflow-hidden px-5 pb-10 pt-28 md:px-12">
        <p aria-hidden className="display-xl swell pointer-events-none absolute -right-6 bottom-0 whitespace-nowrap text-[24vw] text-ink/15">CLICK</p>
        <img src={tiger} alt="" aria-hidden width={1024} height={1024} className="emerge pointer-events-none absolute -bottom-16 right-[-8%] hidden w-[30rem] md:block" />
        <p className="eyebrow">Work with me</p>
        <h1 className="display-xl relative mt-4">Five ways to<br /><em>click into your wild.</em></h1>
        <p className="mt-6 max-w-2xl text-lg">One room turned around in ninety minutes, a newsletter that reaches the right 250,000 people, or a company built from inception to scale — underneath, the work is the same.</p>
      </Scene>
      <section className="grid gap-px bg-ink md:grid-cols-3" aria-label="Ways to work together">
        {[...workOptions, { n: "∞", verb: "Custom", title: "Something we haven't named yet", body: "Not seeing exactly what you need? Good — that's usually where the interesting work is." }].map((o) => (
          <button key={o.n} onClick={() => { setPick(o.title); document.getElementById("form")?.scrollIntoView({ behavior: "smooth" }); }} aria-pressed={pick === o.title}
            className={`p-6 text-left transition md:p-8 ${pick === o.title ? "bg-ink text-paper" : "bg-scarlet hover:bg-paper hover:text-ink"}`}>
            <span className="eyebrow">{o.n} · {o.verb}</span>
            <span className="font-display mt-4 block text-3xl">{o.title}</span>
            <span className="mt-3 block">{o.body}</span>
          </button>
        ))}
      </section>
      <Scene id="form" className="relative overflow-hidden bg-paper px-5 py-16 text-ink md:px-12">
        <CrossingBird className="top-4" />
        <img src={gJabiru} alt="" aria-hidden width={560} height={560} loading="lazy" className="drift-up pointer-events-none absolute -right-10 top-24 hidden w-56 -rotate-6 rounded-full border-2 border-ink [--d:180px] lg:block" />
        <h2 className="display-lg">Start a conversation</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">Tell me about the room, the company, or the goal. We'll build the approach around where you actually are.</p>
        {status === "sent" ? (
          <div role="status" className="mt-10 max-w-xl border-l-4 border-scarlet pl-5">
            <p className="font-display text-3xl italic">Sent — thank you.</p>
            <p className="mt-3 text-muted-foreground">Your message landed. Expect a reply from Yrmis, not an autoresponder.</p>
            <button onClick={() => setStatus("idle")} className="pill mt-6 border-2 border-ink">Send another message</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 grid max-w-3xl gap-5 md:grid-cols-2">
            <label className="block"><span className="eyebrow">Name</span><input name="name" required autoComplete="name" className="mt-2 w-full border-b-2 border-ink bg-transparent py-2 text-lg outline-none focus:border-tangerine" /></label>
            <label className="block"><span className="eyebrow">Email</span><input name="email" required type="email" autoComplete="email" className="mt-2 w-full border-b-2 border-ink bg-transparent py-2 text-lg outline-none focus:border-tangerine" /></label>
            <label className="block md:col-span-2"><span className="eyebrow">Interested in</span><input name="interest" value={pick} onChange={(e) => setPick(e.target.value)} placeholder="Keynote, Studio, Signals…" className="mt-2 w-full border-b-2 border-ink bg-transparent py-2 text-lg outline-none focus:border-tangerine" /></label>
            <label className="block md:col-span-2"><span className="eyebrow">The room, the company, or the goal</span><textarea name="message" required rows={4} className="mt-2 w-full border-b-2 border-ink bg-transparent py-2 text-lg outline-none focus:border-tangerine" /></label>
            {status === "error" && <p role="alert" className="text-crimson md:col-span-2">{errorMsg}</p>}
            <button disabled={status === "sending"} className="pill w-fit bg-ink text-paper disabled:opacity-50">
              {status === "sending" ? "Sending…" : "Send →"}
            </button>
          </form>
        )}
      </Scene>
      <NextStops />
    </main>
  );
}
