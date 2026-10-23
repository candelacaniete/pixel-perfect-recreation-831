import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { workOptions } from "@/content/yrmis";
import { NextStops } from "@/components/safari/SiteChrome";
import { markVisited } from "@/components/safari/visited";
import { Scene } from "@/components/safari/motion";
import puma from "@/assets/puma.png";
import { supabase } from "@/integrations/supabase/client";
import pumaWalk from "@/assets/videos/puma-walk.mp4.asset.json";
import pumaWalkWebm from "@/assets/videos/puma-walk.webm.asset.json";
import { assetUrl } from "@/lib/asset-url";

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
  const [filled, setFilled] = useState(0);
  function onFormInput(e: React.FormEvent<HTMLFormElement>) {
    const f = new FormData(e.currentTarget);
    setFilled(["name", "email", "message"].filter((k) => String(f.get(k) || "").trim()).length);
  }


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
        <p className="eyebrow">Work with me</p>
        <h1 className="display-xl relative mt-4">Five ways to<br /><em>click into your wild.</em></h1>
        <p className="mt-6 max-w-2xl text-lg">One room turned around in ninety minutes, a newsletter that reaches the right 250,000 people, or a company built from inception to scale — underneath, the work is the same.</p>
        <video autoPlay muted loop playsInline aria-label="A Venezuelan Llanos puma walking" width={1280} height={720}
          className="pointer-events-none relative -mx-5 mt-6 block w-[calc(100%+2.5rem)] max-w-none [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_80%)] md:-mx-12 md:-mt-10 md:w-[calc(100%+6rem)]">
          <source src={assetUrl(pumaWalkWebm)} type="video/webm" />
          <source src={assetUrl(pumaWalk)} type="video/mp4" />
        </video>
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
        <h2 className="display-lg">Start a conversation</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">Tell me about the room, the company, or the goal. We'll build the approach around where you actually are.</p>
        <PumaTrail progress={status === "sent" ? 1 : (filled + (pick.trim() ? 1 : 0)) / 4} />
        {status === "sent" ? (
          <div role="status" className="mt-10 max-w-xl border-l-4 border-scarlet pl-5">
            <p className="font-display text-3xl italic">Sent — thank you.</p>
            <p className="mt-3 text-muted-foreground">Your message landed. Expect a reply from Yrmis, not an autoresponder.</p>
            <button onClick={() => { setStatus("idle"); setFilled(0); }} className="pill mt-6 border-2 border-ink">Send another message</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} onInput={onFormInput} className="mt-10 grid max-w-3xl gap-5 md:grid-cols-2">
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
      <NextStops current="Work with me" tone="scarlet" />
    </main>
  );
}

function PumaTrail({ progress }: { progress: number }) {
  const p = Math.min(1, Math.max(0, progress));
  return (
    <div aria-hidden className="relative mt-10 h-28 max-w-3xl md:h-36">
      <div className="absolute inset-x-0 bottom-3 h-0.5 bg-ink/15" />
      <div className="absolute bottom-3 left-0 h-0.5 bg-scarlet transition-[width] duration-700 ease-out" style={{ width: `${p * 100}%` }} />
      {[0.25, 0.5, 0.75, 1].map((m) => (
        <span key={m} className={`absolute bottom-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-ink transition-colors duration-500 ${p >= m ? "bg-gold" : "bg-paper"}`} style={{ left: `${m * 100}%` }} />
      ))}
      <img src={puma} alt="" width={1024} height={1024}
        className="absolute bottom-2 w-28 transition-[left,transform] duration-700 ease-out md:w-36"
        style={{ left: `calc(${p * 100}% - ${p * 7}rem)`, transform: p >= 1 ? "translateY(-6px) scale(1.05)" : "none" }} />
    </div>
  );
}
