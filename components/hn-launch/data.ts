// Hand-coded top-level comments on 30 AI/DevTool Launch HN and Show HN
// threads, Oct 29 to Nov 13, 2026. Raw data: /data/hn-launch-objections-2026-11.csv

export type CategoryKey =
  | "comparison"
  | "support"
  | "unclear"
  | "proof"
  | "trust"
  | "pricing"
  | "name";

export type Example = { product: string; text: string; url: string };

export type Category = {
  key: CategoryKey;
  label: string;
  short: string;
  comments: number;
  threads: number;
  fix: string;
  examples: Example[];
};

const hn = (id: number) => `https://news.ycombinator.com/item?id=${id}`;

export const CATEGORIES: Category[] = [
  {
    key: "comparison",
    label: "How is this different from X?",
    short: "Compare",
    comments: 75,
    threads: 20,
    fix: "Name the closest alternative in the first paragraph, and say when it's the better pick.",
    examples: [
      { product: "OmniDiff", text: "Asked how it compares to delta, the diff pager many readers already use.", url: hn(50325592) },
      { product: "Momentic", text: "Asked why not point Opus 5.5 at the app through a Playwright setup instead.", url: hn(50340455) },
      { product: "Waymark", text: "Asked how the workflow engine differs from Temporal.", url: hn(50404983) },
    ],
  },
  {
    key: "support",
    label: "Does it support X?",
    short: "Support",
    comments: 58,
    threads: 20,
    fix: "Add a short 'works with / doesn't yet' list to the post and the top of the README.",
    examples: [
      { product: "Simantic", text: "Went looking for the list of supported models in the docs before anything else.", url: hn(50292130) },
      { product: "DBDelve", text: "Won't switch from DataGrip until Oracle, SQL Server and Postgres all work.", url: hn(50430454) },
    ],
  },
  {
    key: "unclear",
    label: "I can't tell what it does",
    short: "Unclear",
    comments: 47,
    threads: 19,
    fix: "Put one plain sentence on the first screen: what it is, what it runs on, what it costs.",
    examples: [
      { product: "Rivet", text: "Someone working in the same space said they couldn't tell what the company did.", url: hn(50386496) },
      { product: "Subvocal", text: "Scrolled for 30 seconds through the landing page animation, then left.", url: hn(50340459) },
      { product: "Palomino", text: "Had to work out that 'ADE' meant agentic development environment.", url: hn(50310350) },
    ],
  },
  {
    key: "proof",
    label: "Show me proof",
    short: "Proof",
    comments: 29,
    threads: 13,
    fix: "Ship every benchmark with its method, and give people something they can run.",
    examples: [
      { product: "Momentic", text: "Pointed out the benchmark was built and graded by the company selling the tool.", url: hn(50370994) },
      { product: "Subvocal", text: "Would have preordered, but found the accuracy FAQ too thin to trust.", url: hn(50346752) },
    ],
  },
  {
    key: "trust",
    label: "Where does my data go?",
    short: "Trust",
    comments: 28,
    threads: 10,
    fix: "Say where data lives, what runs locally, and whether it can be self-hosted.",
    examples: [
      { product: "Pomerado", text: "Asked where a user's password or session cookie is stored.", url: hn(50456425) },
      { product: "Momentic", text: "Dismissed closed-source, non-self-hosted tools in one line.", url: hn(50343730) },
    ],
  },
  {
    key: "pricing",
    label: "What does it cost?",
    short: "Price",
    comments: 14,
    threads: 8,
    fix: "State the price, whose tokens get billed, and how the project stays funded.",
    examples: [
      { product: "Momentic", text: "Asked if it was another tool charging for token usage on top of a subscription.", url: hn(50340196) },
      { product: "DBDelve", text: "Asked how a no-paywall project pays for development past the next few weekends.", url: hn(50429760) },
    ],
  },
  {
    key: "name",
    label: "Isn't that name taken?",
    short: "Name",
    comments: 5,
    threads: 4,
    fix: "Search the name on HN, GitHub and the top search results before launch day.",
    examples: [
      { product: "Simantic", text: "Flagged how close the name is to Symantec.", url: hn(50293138) },
    ],
  },
];

export type Launch = {
  name: string;
  kind: "Launch HN" | "Show HN";
  id: number;
  comments: number;
  // counts in CATEGORIES order
  c: number[];
};

export const LAUNCHES: Launch[] = [
  { name: "Subvocal", kind: "Show HN", id: 50340088, comments: 145, c: [9, 8, 15, 5, 10, 4, 0] },
  { name: "Momentic", kind: "Launch HN", id: 50339913, comments: 44, c: [7, 7, 1, 11, 4, 4, 0] },
  { name: "Yogurt", kind: "Show HN", id: 50454625, comments: 47, c: [12, 3, 2, 1, 3, 0, 0] },
  { name: "Pomerado", kind: "Launch HN", id: 50455811, comments: 24, c: [3, 6, 4, 0, 5, 1, 0] },
  { name: "Rivet", kind: "Launch HN", id: 50381687, comments: 29, c: [4, 4, 5, 0, 1, 0, 1] },
  { name: "OmniDiff", kind: "Show HN", id: 50325253, comments: 21, c: [4, 3, 1, 1, 0, 1, 0] },
  { name: "Simantic", kind: "Launch HN", id: 50291116, comments: 13, c: [2, 4, 1, 0, 0, 0, 2] },
  { name: "Modern web skills", kind: "Show HN", id: 50443812, comments: 42, c: [2, 4, 1, 1, 0, 1, 0] },
  { name: "Waymark", kind: "Show HN", id: 50379221, comments: 16, c: [3, 2, 2, 1, 0, 0, 0] },
  { name: "Kino AI", kind: "Launch HN", id: 50368804, comments: 19, c: [5, 1, 1, 0, 0, 0, 0] },
  { name: "DBDelve", kind: "Show HN", id: 50427934, comments: 19, c: [3, 2, 0, 1, 0, 1, 0] },
  { name: "Ghostman", kind: "Show HN", id: 50300902, comments: 9, c: [2, 1, 1, 2, 0, 0, 0] },
  { name: "tmux-restore", kind: "Show HN", id: 50355009, comments: 14, c: [5, 1, 0, 0, 0, 0, 0] },
  { name: "Palomino", kind: "Show HN", id: 50310055, comments: 13, c: [3, 0, 2, 0, 1, 0, 0] },
  { name: "WASM web apps", kind: "Show HN", id: 50401844, comments: 13, c: [0, 0, 2, 2, 1, 0, 1] },
  { name: "Klad", kind: "Show HN", id: 50454951, comments: 16, c: [2, 1, 0, 1, 0, 1, 0] },
  { name: "Recalc", kind: "Show HN", id: 50413970, comments: 6, c: [3, 2, 0, 0, 0, 0, 0] },
  { name: "Aircad", kind: "Show HN", id: 50441350, comments: 11, c: [0, 2, 1, 0, 0, 1, 0] },
  { name: "Kairos", kind: "Show HN", id: 50358314, comments: 9, c: [2, 0, 1, 0, 0, 0, 1] },
  { name: "Stroq", kind: "Show HN", id: 50380704, comments: 15, c: [0, 0, 4, 0, 0, 0, 0] },
  { name: "Flide", kind: "Show HN", id: 50421155, comments: 7, c: [1, 2, 0, 1, 0, 0, 0] },
  { name: "Bema", kind: "Show HN", id: 50351404, comments: 7, c: [2, 0, 1, 0, 1, 0, 0] },
  { name: "Firenook", kind: "Show HN", id: 50378643, comments: 12, c: [0, 3, 0, 0, 0, 0, 0] },
  { name: "Codemap", kind: "Show HN", id: 50366811, comments: 8, c: [0, 1, 1, 1, 0, 0, 0] },
  { name: "Lasm", kind: "Show HN", id: 50299004, comments: 6, c: [0, 0, 1, 1, 0, 0, 0] },
  { name: "Overtone", kind: "Show HN", id: 50293115, comments: 6, c: [0, 1, 0, 0, 1, 0, 0] },
  { name: "SafeScript", kind: "Show HN", id: 50417478, comments: 2, c: [0, 0, 0, 0, 1, 0, 0] },
  { name: "Gauge", kind: "Show HN", id: 50371090, comments: 4, c: [1, 0, 0, 0, 0, 0, 0] },
  { name: "Recto", kind: "Show HN", id: 50357042, comments: 2, c: [0, 0, 0, 0, 0, 0, 0] },
  { name: "Rustable", kind: "Show HN", id: 50347524, comments: 4, c: [0, 0, 0, 0, 0, 0, 0] },
];
