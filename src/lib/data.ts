export type Perfume = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  size: string;
  top: string;
  heart: string;
  base: string;
  tint: [string, string, string]; // glass gradient stops for the card illustration
  liquid: string;
};

export const perfumes: Perfume[] = [
  {
    id: "cendre",
    name: "Cendre",
    tagline: "Smoked iris on a cold hearth.",
    price: 240,
    size: "50 ml Eau de Parfum",
    top: "Pink pepper, bergamot",
    heart: "Smoked iris, cedar",
    base: "Vetiver, tonka",
    tint: ["#2b2927", "#0e0d0c", "#3a3733"],
    liquid: "#8b7a5a",
  },
  {
    id: "minuit-ambre",
    name: "Minuit Ambre",
    tagline: "Saffron and amber after dark.",
    price: 285,
    size: "50 ml Eau de Parfum",
    top: "Saffron, cardamom",
    heart: "Rose absolute, labdanum",
    base: "Amber, benzoin, white musk",
    tint: ["#33200f", "#100a05", "#4a2f14"],
    liquid: "#c5802c",
  },
  {
    id: "velours-noir",
    name: "Velours Noir",
    tagline: "Tuberose wrapped in black velvet.",
    price: 265,
    size: "50 ml Eau de Parfum",
    top: "Black currant, mandarin",
    heart: "Tuberose, jasmine sambac",
    base: "Patchouli, vanilla, sandalwood",
    tint: ["#2a1620", "#0d0609", "#3d2030"],
    liquid: "#8a3b5c",
  },
];

export const chapters = [
  {
    title: "First light",
    kicker: "Top notes · the first ten minutes",
    body: "Bergamot and pink pepper open like a window thrown wide in a dark room. Bright, brief, and gone before you can name it, which is exactly why you reach for it again.",
  },
  {
    title: "The heart",
    kicker: "Heart notes · the next three hours",
    body: "Smoked iris and rose absolute settle into the warmth of your skin. This is where NOIRÉ becomes yours: softer at the wrist, deeper at the collar, never the same twice.",
  },
  {
    title: "What stays",
    kicker: "Base notes · the rest of the night",
    body: "Amber, vetiver and sandalwood hold on long after the room has emptied. A trace on a scarf, a coat, a pillow. The reason someone asks what you are wearing the next morning.",
  },
];

export const ingredients = [
  {
    name: "Calabrian bergamot",
    origin: "Southern Italy",
    note: "Cold-pressed from the peel within hours of picking, so the opening stays sharp and green rather than sweet.",
    color: ["#d8d27a", "#4c5a1c"],
  },
  {
    name: "Rose absolute",
    origin: "Grasse, France",
    note: "Petals are gathered before sunrise, when the oils are at their fullest, and extracted gently into a deep, jammy absolute.",
    color: ["#d98aa0", "#4a1426"],
  },
  {
    name: "Smoked iris butter",
    origin: "Tuscany, Italy",
    note: "Rhizomes age for three years before extraction. A touch of birch smoke gives the powder a charred edge.",
    color: ["#a9a2c9", "#25213b"],
  },
  {
    name: "Madagascan vanilla",
    origin: "Sava region",
    note: "Cured pods, split by hand, steeped slowly into spirit for a dry vanilla that reads more like leather than dessert.",
    color: ["#d9b27a", "#4a2a0e"],
  },
];

export const craftSteps = [
  { title: "Harvest", text: "Raw materials are picked at peak ripeness, in small lots, from growers we visit every season." },
  { title: "Extract", text: "Cold pressing and gentle distillation keep delicate top notes intact." },
  { title: "Rest", text: "Each blend macerates for sixty days in the dark, then is filtered and tested by our perfumers." },
  { title: "Fill", text: "Bottles are filled and capped by hand, then inspected one at a time." },
];

export const navLinks = [
  { href: "#collection", label: "Collection" },
  { href: "#story", label: "Story" },
  { href: "#craft", label: "Craft" },
  { href: "#newsletter", label: "Newsletter" },
];
