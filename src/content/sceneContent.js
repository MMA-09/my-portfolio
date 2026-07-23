export const HERO = {
  kicker: '[YOUR NAME] · BUILDER · FIRST-GEN',
  headline: ['Six years on a board.', ['A lifetime ', { accent: 'figuring things out.' }]],
  body: "Computer Science applicant. I ship things — apps, hardware, curricula — for people who don't usually get access to any of it.",
  scrollCue: 'SCROLL TO PLAY →',
  tapHint: 'TAP THE BOARD TO KICKFLIP',
};

export const ORIGIN = {
  mono: '// ORIGIN STORY',
  headline: ['I learned early', 'that starting over', 'is a skill.'],
  body:
    "First-generation. Hispanic and South Asian. Nobody in the family had a map for this — so I made my own. Skateboarding taught me the actual mechanic of it: you fall in public, you get back on, you don't wait for someone to spot you. Six years later that's still the whole method.",
};

export const LEARNING = {
  mono: '// HOW I LEARN',
  headline: ['I DON’T WAIT', 'TO BE TAUGHT.'],
  body: "The curriculum is the floor, not the ceiling. Structured classes give me the vocabulary — everything past that, I go get myself.",
  blocks: [
    { tag: '[HL × 3]', title: 'MATHEMATICS AA · PHYSICS · COMPUTER SCIENCE' },
    { tag: '[BUILT]', title: 'PROJECTS · HACKATHONS · HARDWARE' },
    { tag: '[READ]', title: 'BOOKS AND SELF-DIRECTED STUDY' },
  ],
};

export const BUILD = {
  mono: '// HOW I WORK',
  headline: ['I DON’T JUST', 'LEARN THINGS.', 'I BUILD THEM.'],
  body: 'Every idea gets tested the same way: turned into something that runs, ships, or gets used by an actual person.',
  blocks: [
    { tag: 'SOFTWARE', title: 'Web platforms, internal tools, production code' },
    { tag: 'HARDWARE', title: 'Arduino-based assistive devices' },
    { tag: 'SHIPPED', title: 'Deployed and maintained — not just demoed' },
  ],
};

export const PROJECTS = [
  {
    frame: 'FRAME 42 / 120',
    number: '01',
    name: 'AlumnX',
    description: 'A mentorship platform connecting graduating students with alumni — so networking access doesn’t start and end with who your parents know.',
    role: 'Founder · full-stack',
    tech: 'TypeScript · Next.js · Postgres',
    status: 'LIVE — PRODUCTION',
  },
  {
    frame: 'FRAME 58 / 120',
    number: '02',
    name: 'RebootAE',
    description: 'Snap a photo of a broken device, get a reparability score, reuse suggestions, and a chatbot to ask questions — built in 48 hours.',
    role: 'One of 5 founders',
    tech: 'Hackathon build · computer vision',
    status: 'UNIVERSITY OF BIRMINGHAM DUBAI HACKATHON',
  },
  {
    frame: 'FRAME 73 / 120',
    number: '03',
    name: 'VeriBuy',
    description: 'A price-intelligence platform for the cosmetics market, pulling and ranking real-time pricing across retailers with reliability signals baked in.',
    role: 'Co-founder · technical lead',
    tech: 'SerpAPI · real-time ranking',
    status: 'GW NEW VENTURE SEMIFINALIST · TOP 10 / 200',
  },
];

export const TOOLKIT = {
  mono: '// TOOLKIT',
  headline: ['THE THINGS', 'I REACH FOR.'],
  body: 'Not a skills bar. A toolbox — some items sharper than others, all of them load-bearing.',
};

export const JOURNEY = {
  mono: '// THE JOURNEY',
  headline: ['THERE’S NO', 'PERFECTLY STRAIGHT PATH.'],
  body: 'Just a lot of continuing to move — through robotics, hackathons, an internship, a startup, and whatever came with leading a team.',
};

export const CURRENT = {
  mono: '// CURRENT POSITION',
  headline: ['STILL IN', 'PROGRESS.'],
  status: [
    { label: 'ROLE', value: 'STUDENT DEVELOPER' },
    { label: 'STATE', value: 'BUILDING · LEARNING · SHIPPING' },
    { label: 'NEXT', value: 'PREPARING FOR CS PROGRAMS' },
  ],
  body: "This isn't a finished biography. It's an active process — and this site is one of the things currently in it.",
};

export const FINAL = {
  mono: '// NEXT LINE',
  headline: ['WHAT’S THE', 'NEXT LINE?'],
  body: 'Looking for a CS program that treats "access" as more than a buzzword — and a place to keep building things that outlast the semester they were built in.',
  links: [
    { label: 'Email', href: 'mailto:you@email.com' },
    { label: 'LinkedIn', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Amazon Books', href: '#' },
  ],
};
