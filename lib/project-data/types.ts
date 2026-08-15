export type CaseFigure = {
  src: string
  alt: string
  label?: string
  caption: string
  variant?: "default" | "lite" | "wide"
}

export type CaseCard = {
  title: string
  body: string
}

export type CasePhase = {
  title: string
  body: string
}

export type CaseAdr = {
  label: string
  title: string
  body: string
}

export type CaseSection =
  | {
      type: "prose"
      title: string
      body: string
      bullets?: string[]
    }
  | {
      type: "cards"
      title: string
      intro?: string
      cards: CaseCard[]
    }
  | {
      type: "figures"
      title: string
      intro?: string
      layout?: "stack" | "grid-2" | "grid-3"
      figures: CaseFigure[]
    }
  | {
      type: "split"
      title: string
      body: string
      bullets?: string[]
      figure: CaseFigure
    }
  | {
      type: "phases"
      title: string
      intro?: string
      phases: CasePhase[]
      figure?: CaseFigure
    }
  | {
      type: "adrs"
      title: string
      items: CaseAdr[]
    }
  | {
      type: "table"
      title: string
      intro?: string
      headers: [string, string]
      rows: [string, string][]
    }
  | {
      type: "gallery"
      title: string
      intro?: string
      images: string[]
    }

export type Project = {
  id: number
  slug: string
  title: string
  tagline: string
  image: string
  technologies: string[]
  link?: string
  linkLabel?: string
  lede: string
  sections: CaseSection[]
  footnote?: string
}
