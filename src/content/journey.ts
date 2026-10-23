// Narrative script for the river journey. Guardian dialogue is creative framing
// around the confirmed CLICK taglines — it must never state facts about Yrmis's life.
import { principles } from "./yrmis";

export type InteractionKind = "clues" | "lens" | "truck" | "signals" | "fog";

export type Stop = {
  z: number;
  side: -1 | 1;
  guardian: string;
  sprite: "heron" | "anaconda" | "capymech" | "macaw" | "jabiru";
  letter: string;
  name: string;
  tagline: string;
  recognition: string;
  dialogue: string[];
  interaction: InteractionKind;
  prompt: string;
  revelation: string;
  departure: string;
};

const p = principles;

export const stops: Stop[] = [
  {
    z: 46, side: 1, guardian: "The Night Heron", sprite: "heron", letter: p[0].letter, name: p[0].name, tagline: p[0].tagline,
    recognition: "Two gold eyes open on the bank. The heron does not blink.",
    dialogue: ["You gripped the side of the boat. Most travellers do.", "Before you decide what I am — look around. The river leaves notes for anyone who asks."],
    interaction: "clues", prompt: "Tap the three glints in the dark.",
    revelation: "It was never hunting you. It was guarding the shallows.",
    departure: "Keep asking. Downstream, someone has been called a name for a very long time.",
  },
  {
    z: 96, side: -1, guardian: "The Anaconda", sprite: "anaconda", letter: p[1].letter, name: p[1].name, tagline: p[1].tagline,
    recognition: "The roots move. Then you realise they were never roots.",
    dialogue: ["They call me dangerous. Dull. Camouflage.", "Here — borrow this lens. See what the name was hiding."],
    interaction: "lens", prompt: "Move the lens across the bank.",
    revelation: "Same snake. Same grass. A completely different world.",
    departure: "Keep the lens. The capybara ahead has a problem and a truck full of odd things.",
  },
  {
    z: 146, side: 1, guardian: "The Capybara Mechanic", sprite: "capymech", letter: p[2].letter, name: p[2].name, tagline: p[2].tagline,
    recognition: "A fallen trunk blocks the river. A capybara in goggles is already rolling up its sleeves.",
    dialogue: ["No bridge, no crane, no plan.", "What we have is whatever's in the truck. Pick two."],
    interaction: "truck", prompt: "Combine two things to clear the trunk.",
    revelation: "Rope and a jerrycan: the trunk floats free and turns with the current.",
    departure: "Onward. The macaw downstream has opinions. Loud ones.",
  },
  {
    z: 196, side: -1, guardian: "The Macaw Editor", sprite: "macaw", letter: p[3].letter, name: p[3].name, tagline: p[3].tagline,
    recognition: "Feathers, a quill, and a storm of words blowing across the water.",
    dialogue: ["Everyone has notes for you. Most of them are noise.", "Take the hit — then pluck out what's actually useful."],
    interaction: "signals", prompt: "Catch only the useful signals.",
    revelation: "The storm settles. Three true notes remain, and they're enough.",
    departure: "The fog ahead hides the rest of the map. Good — that's where the jabiru waits.",
  },
  {
    z: 246, side: 1, guardian: "The Jabiru", sprite: "jabiru", letter: p[4].letter, name: p[4].name, tagline: p[4].tagline,
    recognition: "In the fog, a tall white shape lifts one wing and points.",
    dialogue: ["The map isn't finished. It never will be.", "Choose a channel. The river reveals itself to those already moving."],
    interaction: "fog", prompt: "Choose a channel — three times.",
    revelation: "The fog lifts. Dawn was waiting for you to move.",
    departure: "Land ahead. Everything you came for is on that shore.",
  },
];

export const LANDING_Z = 296;

export const ambientLines: { z: number; text: string; cite?: string }[] = [
  { z: 6, text: "On a nature reserve in Venezuela, in the back of my father's truck, deciding how much water to drink at dawn because there wouldn't be more until dusk.", cite: "Yrmis" },
  { z: 24, text: "Thirty-three thousand capybaras taught me the one law every survival plan forgets: it goes to the most adaptable.", cite: "Yrmis" },
  { z: 272, text: "Not a new self. Permission to use the wild, resourceful one you already have." },
];
