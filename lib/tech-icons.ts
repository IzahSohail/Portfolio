export const TECH_ICON_MAP: Record<string, { src: string; alt: string }> = {
  Python: { src: "/assets/Python-Light.svg", alt: "Python" },
  Django: { src: "/assets/Django.svg", alt: "Django" },
  PostgreSQL: { src: "/assets/postgre.svg", alt: "PostgreSQL" },
  JavaScript: { src: "/assets/JavaScript.svg", alt: "JavaScript" },
  Matplotlib: { src: "/assets/Matplotlib.svg", alt: "Matplotlib" },
  Plotly: { src: "/assets/plotly-icon.svg", alt: "Plotly" },
  Pandas: { src: "/assets/Pandas.svg", alt: "Pandas" },
  BeautifulSoup: { src: "/assets/BeautifulSoup.svg", alt: "BeautifulSoup" },
  "Next.js": { src: "/assets/NextJS-Dark.svg", alt: "Next.js" },
  React: { src: "/assets/react.svg", alt: "React" },
  TypeScript: { src: "/assets/TypeScript.svg", alt: "TypeScript" },
  Tailwind: { src: "/assets/TailwindCSS-Light.svg", alt: "Tailwind CSS" },
  "Tailwind CSS": { src: "/assets/TailwindCSS-Light.svg", alt: "Tailwind CSS" },
  "OpenAI Assistants": { src: "/assets/openai-icon.svg", alt: "OpenAI Assistants" },
  Supabase: { src: "/assets/Supabase-Light.svg", alt: "Supabase" },
  "Node.js": { src: "/assets/NodeJS.svg", alt: "Node.js" },
  Express: { src: "/assets/Express.svg", alt: "Express" },
  Kafka: { src: "/assets/Kafka.svg", alt: "Kafka" },
  Bootstrap: { src: "/assets/Bootstrap.svg", alt: "Bootstrap" },
  "Adobe Illustrator": { src: "/assets/Illustrator.svg", alt: "Adobe Illustrator" },
}

export function getTechIcon(name: string) {
  return TECH_ICON_MAP[name] ?? null
}
