// All narrative copy lives here. Facts are sourced from yrmis-branding-preview.vercel.app
// and myheadquarters.club — do not add claims that are not on those sources.

export type DestinationId = "click" | "studio" | "ventures" | "signals";

export const destinations: {
  id: DestinationId;
  to: "/click" | "/studio" | "/ventures" | "/signals";
  name: string;
  kicker: string;
  line: string;
  at: number; // position along the river, 0..1
}[] = [
  { id: "click", to: "/click", name: "CLICK", kicker: "The framework", line: "Five instincts every human already has.", at: 0.2 },
  { id: "studio", to: "/studio", name: "Studio", kicker: "Fractional & advisory", line: "Plan and conspire.", at: 0.44 },
  { id: "ventures", to: "/ventures", name: "Ventures", kicker: "Four companies, four industries", line: "Built on nothing but resourcefulness.", at: 0.68 },
  { id: "signals", to: "/signals", name: "Signals", kicker: "1•1•1 Signals", line: "Field notes from the wild and the boardroom.", at: 0.92 },
];

export const reframe = {
  lead: "Not a new self.",
  rest: "Permission to use the wild, resourceful one you already have.",
  body: "You don't have a capability problem. You have a permission problem.",
};

export const origin =
  "On a nature reserve in Venezuela, in the back of my father's truck, deciding how much water to drink at dawn because there wouldn't be more until dusk.";
export const capybaraLaw =
  "Thirty-three thousand capybaras taught me the one law every survival plan forgets: it goes to the most adaptable.";

export const principles = [
  { letter: "C", name: "Curiosity", tagline: "Ask before you armor.", guardian: "The Night Heron", sky: "night" },
  { letter: "L", name: "Labels into Lenses", tagline: "The name they gave you is a way of seeing, not a cage.", guardian: "The Anaconda", sky: "deep" },
  { letter: "I", name: "Ingenuity", tagline: "Make it work with what's in the truck.", guardian: "The Capybara Mechanic", sky: "indigo" },
  { letter: "C", name: "Criticism", tagline: "Take the hit; keep the signal.", guardian: "The Macaw Editor", sky: "violet" },
  { letter: "K", name: "Kickstart under uncertainty", tagline: "Act before the map is finished.", guardian: "The Jabiru", sky: "dawn" },
] as const;

export const workOptions = [
  { n: "01", verb: "Speak", title: "Keynotes & offsites", body: "Click Into Wild Innovation — the keynote for teams being moved onto AI. 45–90 min, or a leadership offsite." },
  { n: "02", verb: "Build", title: "The Studio", body: "Fractional & advisory. Founders from inception to scale; exec teams steadying a live change." },
  { n: "03", verb: "Feature", title: "Get into 1•1•1 Signals", body: "Put your idea in front of 250,000 executives and builders — years before the headlines." },
  { n: "04", verb: "Grow", title: "Newsletter Acceleration Blueprint", body: "From outreach to growth plan — I'll build your newsletter engine." },
  { n: "05", verb: "Read", title: "1•1•1 Signals", body: "Field notes from the edge of the wild and the boardroom. Free, every other week." },
];

export const studio = {
  intro: "A boutique studio for the companies the future is waiting for. Part venture builder, part fractional executive, part sparring partner.",
  for: "Founders making the impossible inevitable. Executive teams steadying a live transformation.",
  tracks: [
    { name: "Founders", body: "Inception to scale — strategy, growth, fundraising readiness, and the fractional leadership to get there." },
    { name: "Institutions", body: "Advisory for venture studios, accelerators and investors turning breakthrough ideas into real-world businesses." },
    { name: "Exec teams", body: "When the change is live inside your company: office hours with the executive team so it holds." },
  ],
  keynote: {
    title: "Click Into Wild Innovation",
    in: "They think they need to learn a technology.",
    out: "They know they need to tap into more of themselves.",
    formats: ["Keynote · 45–90 min", "All-hands · kickoffs · summits", "Leadership offsite · ½–2 days", "CLICK, worked on your real rollout"],
    for: "Heads of L&D, People and Transformation moving thousands onto AI. Executive teams who've bought the tools and are waiting for the nerve.",
  },
};

export const ventures = ["Mission Heirloom", "All Black Sheep", "(hĕm)", "YRMIS"];
export const hqPillars = ["Designing strategies to magnify value", "Powering innovation stories", "Driving community impact"];

export const signals = {
  substack: "https://yrmis.substack.com/",
  cadence: "One upgrade. One Mind on a Mission. One invitation to build. Free.",
  feature: "The Minds on a Mission slot puts your startup, invention or bold idea in front of exactly the right room — straight to inboxes that open it.",
  blueprint: "The system behind 1•1•1 Signals, built for you: a targeted, high-value email list — owned distribution, not rented reach.",
};
