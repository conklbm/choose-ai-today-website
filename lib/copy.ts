// All user-facing copy in one place so partner edits are one-file changes.

// ⚠️ BLOCKER (PRD §6): confirm exact approved wording with Paul before launch.
// Used in the hero trust line and the About block. Edit here, changes both.
export const AMBASSADOR_LINE = "Led by the official Anthropic Ambassador for Mobile, AL.";

// Meetup platform URL — TBD (Luma / Meetup.com / Eventbrite). When chosen,
// set this and the community success state will link to it.
export const MEETUP_URL: string | null = null;

export const SITE = {
  name: "Choose AI Today",
  domain: "https://chooseaitoday.com",
  city: "Mobile, Alabama",
  area: "Mobile Bay Area, Alabama",
  description:
    "A local community for founders, teams, and the curious learning practical AI across the Mobile Bay Area — plus hands-on help when your business is ready to put AI to work.",
};

export const NAV = {
  links: [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  cta: "Join the community →",
};

export const HERO = {
  eyebrow: "Mobile Bay Area, Alabama",
  headline: "AI is now a non-negotiable.",
  subhead:
    "A local community for founders, teams, and the curious — plus hands-on help when your business is ready to put AI to work. Come to a meetup. Bring your team.",
  cta: "Get meetup invites + AI notes →",
};

export const COMMUNITY = {
  heading: "You belong here.",
  facts: ["Monthly", "In person", "Free"],
  photo: {
    src: "/ai-meetup.jpg",
    width: 1231,
    height: 754,
    alt: "A full room at a recent AI meetup in Mobile, with Paul presenting",
    caption: "Paul leading a recent AI meetup in Mobile.",
  },
  body: "Whether you're just AI-curious or running a company that needs to move faster, this is where Mobile figures it out together — meetups, connections, and a short note now and then on using AI in the real world.",
  button: "Get meetup invites + AI notes →",
  consent:
    "We'll only email you about meetups and practical AI. Unsubscribe anytime.",
  success: {
    heading: "You're in.",
    body: "Watch your inbox for the next meetup invite.",
    meetupLinkLabel: "See upcoming meetups →",
  },
};

export const BRIDGE =
  "Some businesses want to move faster than a monthly meetup allows. We can get hands-on to help your company move faster.";

export const SERVICES = {
  heading: "When you're ready to go further",
  items: [
    {
      title: "See where AI fits.",
      body: "We assess your business and show you where AI creates real leverage — and where it doesn't.",
    },
    {
      title: "Get it implemented.",
      body: "From idea to working tool. We build and deploy AI that earns its keep.",
    },
    {
      title: "Train your team.",
      body: "Hands-on AI training so your staff uses it with confidence, not fear.",
    },
    {
      title: "Build an AI strategy.",
      body: "A clear roadmap for adopting AI without betting the business on hype.",
    },
  ],
  softCta: {
    lead: "Not sure where to start?",
    actions: [
      { label: "Come to a meetup first →", href: "#community" },
      { label: "Tell us your situation →", href: "#contact" },
    ],
  },
};

export const ABOUT = {
  heading: "Two locals, one mission: help our community use AI for good.",
  partners: [
    {
      name: "Paul",
      role: "Founder, Pim & Co.",
      body: "Anthropic Ambassador for Mobile and founder of Pim & Co., a boutique software consulting practice helping founders and enterprises build MVPs, AI-powered products, and full-scale software systems. Full-stack engineer with experience spanning Google, Flexport, and multiple early-stage startups.",
      link: { label: "Pim & Co.", href: "https://pim-and-co.com" },
      photo: "/paul-lockett.jpg",
    },
    {
      name: "Brooks",
      role: "Founder, Erase Friction",
      body: "Founder of Erase Friction, where he helps teams kill busywork with custom software, workflow automation, and practical AI. 17 years building and scaling businesses.",
      link: { label: "Erase Friction", href: "https://erasefriction.com" },
      photo: "/brooks-conkle.jpg",
    },
  ],
};

export const OTHER_MEETUPS = {
  heading: "More AI around the Bay",
  body: "We're not the only ones. These groups are worth your time too.",
  groups: [
    {
      name: "Lower Alabama AI (LAAI)",
      schedule: "1st Friday in Fairhope · last Friday of the month in Mobile",
      links: [
        {
          label: "Join on Meetup →",
          href: "https://www.meetup.com/lower-alabama-ai-meetup/",
        },
        { label: "Discord →", href: "https://discord.gg/a57wzV3jTE" },
      ],
    },
  ],
};

export const CONTACT = {
  heading: "Bring us your bottleneck.",
  body: "Tell us what you're trying to do with AI. We'll come back within 48 hours with a real, useful response — no pitch.",
  button: "Send it →",
  note: "We'll send initial analysis via email — no call required.",
  success: {
    heading: "Got it.",
    body: "A real, useful response is on its way — within 48 hours.",
  },
  timelineOptions: [
    "Ready now — let's talk",
    "Within the next 1–3 months",
    "Just exploring for now",
  ],
};

export const FOOTER = {
  links: [{ label: "Privacy", href: "/privacy" }],
};
