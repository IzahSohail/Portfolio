import type { Project } from "./types"

export const mathConfidence: Project = {
  id: 2,
  slug: "math-confidence",
  title: "Math Confidence",
  tagline: "AI pre-algebra tutor that builds mastery",
  image: "/projects/math-confidence/thumbnail.jpg",
  technologies: ["Next.js", "React", "TypeScript", "Tailwind", "OpenAI Assistants", "Supabase"],
  link: "https://math-confidence.com",
  linkLabel: "Visit live site",
  lede:
    "An interactive pre-algebra learning platform that pairs structured curriculum with an AI tutor — built so explanations stay pedagogical, mastery feels earned, and the product is trustworthy enough for real learners.",
  sections: [
    {
      type: "prose",
      title: "Context",
      body: "Many AI tutors either dump answers or feel like a chat toy. Math Confidence started from a different goal: guide learners step by step through pre-algebra, assess understanding, and reinforce a growth-mindset approach. The product needed a responsive frontend, durable auth/data foundations, and an assistant experience oriented around learning outcomes rather than novelty.",
    },
    {
      type: "gallery",
      title: "Product",
      intro: "A selection of the live learning experience — curriculum flow, tutor interaction, and the interface learners actually use.",
      images: [
        "/projects/math-confidence/hero.jpg",
        "/projects/math-confidence/detail-1.jpg",
        "/projects/math-confidence/detail-2.jpg",
      ],
    },
    {
      type: "cards",
      title: "Approach",
      intro:
        "The frontend is Next.js, React, TypeScript, and Tailwind. Tutoring is powered by OpenAI Assistants, with Supabase handling authentication and persistence so progress can survive across sessions.",
      cards: [
        {
          title: "Curriculum + tutor",
          body: "Structured topics give the assistant a lane; prompts are tuned to scaffold reasoning instead of skipping to the answer.",
        },
        {
          title: "Mastery signals",
          body: "Progress is tracked across topics so the experience can adapt without becoming noisy or overwhelming.",
        },
        {
          title: "Product polish",
          body: "Responsive UI and clear flows so the tool feels like a learning product, not a wrapped API demo.",
        },
      ],
    },
    {
      type: "prose",
      title: "Challenges",
      body: "The hard parts were pedagogical and product, not just wiring an LLM into a page.",
      bullets: [
        "Designing tutor prompts and conversation flow so explanations stay useful rather than giving away answers too quickly.",
        "Tracking mastery across topics so personalization feels intentional instead of random.",
        "Shipping something polished enough that learners and educators could take it seriously.",
      ],
    },
    {
      type: "prose",
      title: "Outcome",
      body: "Launched a live AI tutoring product at math-confidence.com that combines curriculum structure with adaptive guidance. The work shows applied LLM product sense: clear UX, durable data/auth foundations, and an assistant experience oriented around learning outcomes.",
    },
  ],
}

export const nycMurals: Project = {
  id: 4,
  slug: "nyc-murals",
  title: "NYC Murals",
  tagline: "Explore street art across New York City",
  image: "/projects/nyc-murals/thumbnail.jpg",
  technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  link: "https://nyc-murals.vercel.app",
  linkLabel: "Visit live site",
  lede:
    "A map-driven web app for discovering street art across New York City — fast mural detail pages, location browsing, and enough context that it feels like a guide rather than a pin dump.",
  sections: [
    {
      type: "prose",
      title: "Context",
      body: "NYC’s murals are everywhere and hard to browse as a coherent collection. NYC Murals uses Next.js, React, TypeScript, and Tailwind with server-side rendering and dynamic routes so each mural has a shareable detail page, while maps help users explore by place.",
    },
    {
      type: "gallery",
      title: "Experience",
      images: [
        "/projects/nyc-murals/hero.jpg",
        "/projects/nyc-murals/detail-1.jpg",
        "/projects/nyc-murals/detail-2.jpg",
      ],
    },
    {
      type: "prose",
      title: "Challenges",
      body: "Discovery UX and performance mattered as much as the content model.",
      bullets: [
        "Structuring routes so map browsing and deep detail views stay fluid.",
        "Keeping map and list interactions readable on desktop and mobile.",
        "Giving visual, location-based content enough story to feel like a guide.",
      ],
    },
    {
      type: "prose",
      title: "Outcome",
      body: "Shipped a polished exploration experience that makes NYC street art easier to find and understand — typed React/Next.js architecture, responsive design, and place-based product UX.",
    },
  ],
}

export const photoshare: Project = {
  id: 5,
  slug: "photoshare",
  title: "PhotoShare",
  tagline: "Flickr-inspired photo sharing platform",
  image: "/projects/photoshare/thumbnail.jpg",
  technologies: ["Django", "PostgreSQL", "Bootstrap", "JavaScript"],
  link: "https://github.com/IzahSohail/instagram2.0",
  linkLabel: "View repository",
  lede:
    "A Flickr-inspired photo platform built for a Database Systems course — registration, albums, tags, social engagement, search, and recommendations grounded in deliberate schema and query design.",
  sections: [
    {
      type: "prose",
      title: "Context",
      body: "PhotoShare was a course project with a real product surface: users upload photos, organize albums, tag content, like and comment, search, and get recommendations. Django and PostgreSQL sit underneath, with ER modeling, indexing, and query optimization treated as first-class work.",
    },
    {
      type: "gallery",
      title: "Product surface",
      images: ["/projects/photoshare/hero.jpg"],
    },
    {
      type: "cards",
      title: "What the data layer had to support",
      cards: [
        {
          title: "Social graph",
          body: "Users, albums, photos, tags, likes, and comments with relationships that stay consistent under real app flows.",
        },
        {
          title: "Search & feeds",
          body: "Indexes and queries designed so discovery stays responsive as content volume grows.",
        },
        {
          title: "Recommendations",
          body: "Useful discovery without requiring an overly complex ML stack — practical ranking over hype.",
        },
      ],
    },
    {
      type: "prose",
      title: "Challenges",
      body: "The interesting problems were relational and operational.",
      bullets: [
        "Modeling interactions so relationships stay correct under concurrent app flows.",
        "Designing indexes and queries for search, feeds, and recommendations as data grows.",
        "Shipping recommendation and discovery features that feel useful with course-project constraints.",
      ],
    },
    {
      type: "prose",
      title: "Outcome",
      body: "Delivered a complete photo-sharing application grounded in strong database fundamentals — schema design, query optimization, and full-stack feature delivery for a social product.",
    },
  ],
}

export const feverDream: Project = {
  id: 6,
  slug: "fever-dream",
  title: "Fever Dream",
  tagline: "Generative art and music visualization",
  image: "/projects/fever-dream/thumbnail.jpg",
  technologies: ["Adobe Illustrator", "JavaScript"],
  link: "https://izahsohail.github.io/feverdream",
  linkLabel: "View live demo",
  lede:
    "An experimental interactive piece that blends generative visuals with music-driven motion — illustration brought to life in the browser as something to explore, not just watch.",
  sections: [
    {
      type: "prose",
      title: "Context",
      body: "Fever Dream sits at the intersection of creative coding and interface craft. Artwork drafted in Adobe Illustrator is animated and reacted to with JavaScript, creating a dreamlike environment that invites exploration without conventional UI chrome.",
    },
    {
      type: "gallery",
      title: "Visual world",
      images: [
        "/projects/fever-dream/hero.jpg",
        "/projects/fever-dream/detail-1.jpg",
        "/projects/fever-dream/detail-2.jpg",
      ],
    },
    {
      type: "prose",
      title: "Challenges",
      body: "Making the piece feel intentional under real browser constraints.",
      bullets: [
        "Translating static illustration into motion that feels musical and responsive.",
        "Keeping performance smooth while layering generative and audio-reactive effects.",
        "Designing an experience that invites exploration without instructions.",
      ],
    },
    {
      type: "prose",
      title: "Outcome",
      body: "Published an immersive web experience that shows range beyond conventional product UIs — visual systems thinking, interaction design, and shipping an expressive browser-based piece end to end.",
    },
  ],
}
