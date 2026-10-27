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
  { n: "03", verb: "Grow", title: "Newsletter Acceleration Blueprint", body: "From outreach to growth plan — I'll build your newsletter engine." },
  { n: "04", verb: "Read", title: "1•1•1 Signals", body: "Field notes from the edge of the wild and the boardroom. Free, every other week." },
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
  reach: "350K+",
  cadence: "One upgrade. One Mind on a Mission. One invitation to build. Free.",
  blueprint: "The system behind 1•1•1 Signals, built for you: a targeted, high-value email list — owned distribution, not rented reach.",
};

// Verified profiles from myheadquarters.club — do not invent others.
export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/yrmis/" },
  { name: "Instagram", href: "https://www.instagram.com/allblacksheep_club/" },
  { name: "X", href: "https://x.com/AllBlackSheep" },
] as const;

// The river's final destination: applied innovation. Example names come from the
// approved keynote script — do not add detail beyond them.
export const riverDestination = {
  headline: "What can be done better?",
  intro:
    "The river ends where application begins. Looking closely at nature — and borrowing lenses from other worlds — turns practical problems into opportunities.",
  examples: ["A fit problem", "A place to eat together", "A better bag closure"],
  exercise: {
    title: "Try it on something of yours",
    note: "This stays in your browser — nothing is stored or sent.",
    prompts: ["A problem", "A different lens", "Available resources", "Useful feedback", "A first experiment"],
  },
  line: "New territory. Bring what you know.",
  exits: [
    { to: "/speaking", name: "Speaking", note: "Click Into Wild Innovation" },
    { to: "/work", name: "Consulting Studio", note: "Plan and conspire" },
    { to: "/signals", name: "1•1•1 Signals", note: "Field notes, free" },
  ],
  map: "Return to the map",
  water: "Back on the water",
};

// Fictional in-scene cues, not additional biography or company claims.
export const riverWildlife = {
  crocodile: {
    title: "Something stirs beneath the surface.",
    cue: "Lift the long stick. Offer the food above the water.",
    offer: "Offer food on the stick",
    reacting: "A leap. A splash. The river settles.",
    fed: "Satisfied, it slips back into the river.",
    continue: "Continue downstream",
    map: "Return to the map",
  },
  piranha: { watch: "Watch the shallows", dive: "The piranha slips underwater" },
};

/** Published address from the press kits. The inquiry form does not send. */
export const publishedEmail = "yrmisb@gmail.com";

export const inquiryTypes = [
  "Consulting Studio",
  "Speaking",
  "Communications strategy",
  "Press",
  "Other",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export function inquiryFromSearch(value: unknown): InquiryType {
  const raw = typeof value === "string" ? value.trim().toLowerCase() : "";
  return inquiryTypes.find((type) => type.toLowerCase() === raw) ?? "Consulting Studio";
}

/** Website squares. The river keeps `principles` and its own guardian script. */
export const clickOutcomes = [
  { letter: "C", name: "Curiosity", line: "Notice what bugs you. Ask what could work better." },
  { letter: "L", name: "Labels into lenses", line: "Turn your past roles into new ways to see." },
  { letter: "I", name: "Ingenuity", line: "Find a better way with what you have." },
  { letter: "C", name: "Criticism", line: "Keep what helps. Keep building." },
  { letter: "K", name: "Kickstart under uncertainty", line: "Take a step. Learn what happens." },
] as const;

export const subscribeUrl = "https://yrmis.substack.com/subscribe";
export const substackHome = "https://yrmis.substack.com/";
export const substackArchive = "https://yrmis.substack.com/archive";

export const signalIssues = [
  { href: "https://yrmis.substack.com/p/111-signals-dr-mark-hymans-hrv-coach", title: "Dr. Mark Hyman’s HRV coach had to stop hacking his sleep." },
  { href: "https://yrmis.substack.com/p/kobe-bryant-security-guard-for-one", title: "Kobe Bryant, security guard (for one morning)" },
  { href: "https://yrmis.substack.com/p/111-signals-tom-brady-and-andrew", title: "Tom Brady & Andrew Huberman are going. Here’s why I am." },
] as const;

export const siteCopy = {
  identity: "Economist · Founder · Keynote speaker",
  headline: "New territory.",
  headlineEm: "Bring what you know.",
  homeIntro: "I carry what I learn into what I build next. I help people and companies do the same.",
  homeDeck: "Science, nature, culture and imagination to design a more alive future.",
  homeShared:
    "I explore the intersections between science, nature, culture and imagination to generate ideas, projects and conversations that connect people, ecosystems and real possibilities.",
  homeClose:
    "From talks and experiences, to research initiatives, each project is an opportunity to connect knowledge, people and territories to imagine and build a more alive world.",
  about: "I’ve moved from economics into fashion, food, and technology by solving one problem after another. Each field gives me another lens for the next one.",
  studio: "I work with founders and leadership teams on strategy, growth, and the decisions that turn a promising idea into a working business.",
  speaking: "I take teams on a trip through the problems that became my companies. Along the way, we practice spotting problems, using what we know, and putting ideas to work through CLICK.",
  yellow: "See sooner. Think sharper.",
  venturesLead: "Fashion, food, content, and technology. Each field adds another way to see a problem.",
  signalsPromise: "Where tech meets human performance.",
  signalsOffer: "Join 350K+ readers. One human performance upgrade, one bold idea, and one invitation to build. Free, about every two weeks.",
  founders: "Strategy, growth, fundraising readiness, and fractional leadership, from the first idea to the next stage.",
  executives: "A thinking partner for the decisions, priorities, and people involved in making change work.",
  institutions: "Advisory for venture studios, accelerators, academic institutions, and investors bringing new ideas to market.",
  communications: "Communications strategy, audience research, targeted outreach, and a growth plan for a newsletter that supports your business.",
  unnamed: "Have a different idea? Tell me what you have in mind.",
  conversation: "A keynote for your team, a thinking partner for your business, or communications strategy for your business. Tell me what you’re working on.",
  walkingOut: "I can use what I know to solve what comes next.",
  story: [
    {
      title: "The Llanos",
      paragraphs: [
        "I was studying economics in Caracas when I started working with the biologists on the reserve. I could speak some English. That was how I got there.",
        "What I found was a problem I cared about too much to ignore: how to help sustain the wildlife. I didn’t know how to start a foundation yet. I wanted to figure out what could be done better.",
      ],
    },
    {
      title: "Across industries",
      paragraphs: [
        "At Parsons, I learned to keep building through criticism. With my clothing line, I found a fit problem: women needed an alternative to jeans. Solving it led to another opportunity, designing and teaching entrepreneurship at Parsons. The economist came with me.",
        "Then came Mission Heirloom. I brought design into the menu, the protocols, the packaging, and the building. After all those years in fashion, I finally made it into Vogue. With crackers.",
        "I’ll take it. The crackers were cooler.",
      ],
    },
    {
      title: "What I carry forward",
      paragraphs: [
        "Every company added something: another way to see, another way to make things work. I bring all of it into the next problem. And I’m still looking.",
        "What can be done better? That is the question that has powered my life.",
      ],
    },
  ],
} as const;

export const clickExamples = [
  {
    title: "A fit problem",
    kind: "fit",
    problem: "Customers had few options beyond jeans that fit.",
    lens: "Patternmaking, body proportions, and an economist’s eye for a market gap.",
    move: "Change the pattern. Put it in a fitting room.",
  },
  {
    title: "A place to belong",
    kind: "table",
    problem: "People with dietary requirements needed somewhere they could eat together.",
    lens: "Design applied to the menu, the space, and the way the business worked.",
    move: "Design the whole experience around that need.",
  },
  {
    title: "A better bread clip",
    kind: "clip",
    problem: "A plastic clip closed the bag, then became waste.",
    lens: "Reconsider the material, while keeping the job it needs to do.",
    move: "Try a cardboard version.",
  },
] as const;

export const ventureStories = [
  {
    name: "Mission Heirloom",
    place: "Food · Berkeley",
    photo: "greenhouse" as const,
    body: "An award-winning, first-in-class gluten-free-certified restaurant and commissary built on one idea: food as medicine. Its Yucan Crunch crackers, made from cassava, became North America’s largest Casabe distributor within three months of launch.",
  },
  {
    name: "All Black Sheep",
    place: "Wellness · Online",
    photo: "family" as const,
    body: "An online consulting practice and e-commerce platform helping people make conscious, data-driven, healthier choices — without the guilt, the fads, or the fine print.",
  },
  {
    name: "(hĕm)",
    place: "Retail · Soho · 2007",
    photo: "hem" as const,
    body: "A niche Soho boutique built on the pivot: stylish, comfortable pants designed for diverse body types. Named one of the Top 10 Most Fashionable Boutiques opened in NYC in 2007.",
  },
  {
    name: "YRMIS",
    place: "Fashion · New York · 2004",
    photo: "pants" as const,
    body: "A womenswear label stocked at Fred Segal Flair and Madison LA, known for pants that fit. Buyers started calling Yrmis “the pant lady.”",
  },
] as const;
