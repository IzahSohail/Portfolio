export const TECH_ICON_MAP: Record<string, { src: string; alt: string }> = {
  Python: { src: "/icons/Python-Light.svg", alt: "Python" },
  Django: { src: "/icons/Django.svg", alt: "Django" },
  PostgreSQL: { src: "/icons/postgre.svg", alt: "PostgreSQL" },
  JavaScript: { src: "/icons/JavaScript.svg", alt: "JavaScript" },
  Matplotlib: { src: "/icons/Matplotlib.svg", alt: "Matplotlib" },
  Plotly: { src: "/icons/plotly-icon.svg", alt: "Plotly" },
  Pandas: { src: "/icons/Pandas.svg", alt: "Pandas" },
  BeautifulSoup: { src: "/icons/BeautifulSoup.svg", alt: "BeautifulSoup" },
  "Next.js": { src: "/icons/NextJS-Dark.svg", alt: "Next.js" },
  React: { src: "/icons/react.svg", alt: "React" },
  TypeScript: { src: "/icons/TypeScript.svg", alt: "TypeScript" },
  Tailwind: { src: "/icons/TailwindCSS-Light.svg", alt: "Tailwind CSS" },
  "Tailwind CSS": { src: "/icons/TailwindCSS-Light.svg", alt: "Tailwind CSS" },
  "OpenAI Assistants": { src: "/icons/openai-icon.svg", alt: "OpenAI Assistants" },
  Supabase: { src: "/icons/Supabase-Light.svg", alt: "Supabase" },
  "Node.js": { src: "/icons/NodeJS.svg", alt: "Node.js" },
  Express: { src: "/icons/Express.svg", alt: "Express" },
  Kafka: { src: "/icons/Kafka.svg", alt: "Kafka" },
  Bootstrap: { src: "/icons/Bootstrap.svg", alt: "Bootstrap" },
  "Adobe Illustrator": { src: "/icons/Illustrator.svg", alt: "Adobe Illustrator" },
}

export function getTechIcon(name: string) {
  return TECH_ICON_MAP[name] ?? null
}
