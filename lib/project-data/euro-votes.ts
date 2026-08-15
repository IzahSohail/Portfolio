import type { Project } from "./types"

const IMG = "/projects/euro-votes"

export const euroVotes: Project = {
  id: 3,
  slug: "euro-votes",
  title: "Euro Votes",
  tagline: "Political transparency through EU voting data",
  image: `${IMG}/thumbnail.jpg`,
  technologies: [
    "Python",
    "Django",
    "PostgreSQL",
    "Plotly",
    "D3.js",
    "Matplotlib",
    "Pandas",
    "BeautifulSoup",
  ],
  link: "https://github.com/IzahSohail/Eu-Parliament",
  linkLabel: "View repository",
  lede:
    "A Django platform that ingests European Parliament roll-call votes, reconstructs political group membership over time, and turns each ballot into searchable, interactive visualizations.",
  sections: [
    {
      type: "cards",
      title: "Overview",
      intro:
        "European Parliament voting records are public, but they are spread across APIs, HTML minutes pages, and historical CSV/XLS archives. Euro Votes turns that raw material into a single application where you can search a vote, open a detail page, and immediately see how MEPs, countries, and political groups lined up. The project spans the full pipeline: fetch and normalize MEP profiles and photos, import voting histories across parliamentary terms, resolve each MEP to the political group they belonged to on the day of the vote, then render dashboards with Plotly choropleths, stacked breakdowns, and a D3 coalition graph.",
      cards: [
        {
          title: "EP1–EP10",
          body: "Parliamentary terms covered — from historical archives through current roll-calls.",
        },
        {
          title: "5 models",
          body: "MEP, VoteInfo, VoteMapping, PoliticalGroup, and Membership keep the ledger relational.",
        },
        {
          title: "3 lenses",
          body: "Country, political group, and coalition graph — three views of the same ballot.",
        },
      ],
    },
    {
      type: "cards",
      title: "Problem",
      intro: "Fragmented sources and time-sensitive affiliations make “simple” vote lookup anything but.",
      cards: [
        {
          title: "Data is scattered",
          body: "Official roll-call results live in DOCEO HTML minutes, the Europarl data API, and decade-spanning spreadsheet dumps. Labels for amendments are terse machine strings; membership history is a separate stream from the vote itself.",
        },
        {
          title: "Context changes over time",
          body: "An MEP’s political group is not a static attribute. To answer “how did the Greens vote on this bill?” you have to join each ballot to the membership interval that was active on that vote’s date.",
        },
      ],
    },
    {
      type: "phases",
      title: "Architecture",
      intro:
        "Two Django apps keep concerns separated: core owns models and management commands for ingestion; data_visualization owns search, vote detail pages, and chart generation.",
      phases: [
        {
          title: "Ingest",
          body: "Management commands pull MEP metadata and photos from the EU Parliament API, scrape recent vote minutes from DOCEO HTML, and import historical RCV files for EP1–EP9. Incremental fetchers avoid re-downloading votes already in the database.",
        },
        {
          title: "Normalize & store",
          body: "Records land in PostgreSQL as related models: MEP, VoteInfo, VoteMapping, PoliticalGroup, and Membership. A shared vote parser humanizes amendment labels and maps API result codes (For / Against / Abstention) into Yes / No / Abstain.",
        },
        {
          title: "Resolve & visualize",
          body: "On each vote detail page, memberships are filtered to the intervals covering the vote date. Aggregations by country and group feed Plotly charts; pairwise majority agreement feeds a D3 force-directed coalition graph.",
        },
      ],
    },
    {
      type: "cards",
      title: "Product surface",
      intro: "What users can do once the pipeline has a vote in hand.",
      cards: [
        {
          title: "Search & browse",
          body: "Find votes by keyword, year, exact date, or committee. Paginated feed of recent roll-calls with AJAX load-more. Jump from a vote to individual MEP profile pages.",
        },
        {
          title: "Inspect a single ballot",
          body: "Headline counts for Yes / No / Abstain with percentages. Per-group and per-country stacked breakdowns. Choropleth map of “in favor” share across member states. Coalition graph of groups that voted the same way.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Interface",
      intro: "Screens from the live exploration UI — search, vote detail, and the paths users take through a ballot.",
      images: [`${IMG}/hero.jpg`, `${IMG}/detail-1.jpg`],
    },
    {
      type: "prose",
      title: "Visualizations",
      body: "Each vote detail page answers a different question: who sided with whom, where support was concentrated geographically, and how national delegations split. The figures below are generated from the live analysis pipeline.",
    },
    {
      type: "split",
      title: "Political coalition graph",
      body: "For every political group on a vote, the app computes the share of Yes, No, and Abstain. If two groups both cast a majority the same way (≥50% on the same outcome), an edge is drawn between them. The resulting D3 force-directed graph surfaces blocs and isolates — for example, a compact centre cluster (EPP–ALDE–S&D) versus a denser web of groups that aligned on the opposite outcome.",
      figure: {
        src: `${IMG}/coalition.jpg`,
        alt: "Political coalition graph linking European Parliament groups that voted alike",
        label: "Coalition graph",
        caption:
          "Nodes are political groups; edges mean majority agreement on the same vote outcome. Disconnected components highlight competing coalitions on that ballot.",
      },
    },
    {
      type: "split",
      title: "Europe map — share voting in favor",
      body: "Country codes from MEP profiles are aggregated into ISO-3 choropleth locations. Color intensity is the percentage of that country’s participating MEPs who voted Yes. Plotly renders the interactive map so hover tooltips show the exact favorability rate — useful for spotting north–south or east–west divides on a given dossier.",
      figure: {
        src: `${IMG}/europe-map.jpg`,
        alt: "Choropleth map of Europe showing percentage of votes in favor by country",
        label: "Choropleth map",
        caption:
          "Bluescale choropleth of “In Favor (%)” by member state. Non-EU / out-of-scope territories remain unshaded.",
      },
    },
    {
      type: "split",
      title: "Divergent breakdown by country",
      body: "A signed / divergent stacked bar chart places Yes to the right of zero and No to the left, with Abstain straddling the baseline. Sorting by delegation size makes Germany, France, Italy, and the UK easy to compare at a glance: you see both the magnitude of each national contingent and how internally divided it was. The same aggregation pattern powers political-group stacked charts on the vote page.",
      figure: {
        src: `${IMG}/divergent-country.jpg`,
        alt: "Divergent stacked bar chart of Yes, No, and Abstain votes by country",
        label: "Country breakdown",
        caption:
          "Likert-style divergent bars: green = Yes, red = No, yellow = Abstain. Countries are ordered so larger delegations sit lower on the axis.",
      },
    },
    {
      type: "cards",
      title: "Engineering depth",
      intro: "Details that made the project work beyond a one-off chart dump.",
      cards: [
        {
          title: "Temporal membership joins",
          body: "Vote detail queries load memberships where start_date ≤ vote.date and end_date ≥ vote.date (or still open). That temporal join is what lets group charts and the coalition matrix stay historically accurate when MEPs switch parties mid-term.",
        },
        {
          title: "Coalition matrix logic",
          body: "Pairwise combinations of groups check whether both have ≥50% on the same outcome. The adjacency map becomes D3 link data; groups with no partners remain isolated nodes — a deliberate signal, not an omission.",
        },
        {
          title: "Incremental refresh",
          body: "fetch_recent_data and import_recent_data pull only new voting windows, writing dated CSV snapshots before import. That keeps EP10 updates cheap without replaying decades of archives.",
        },
        {
          title: "Label cleanup",
          body: "Scraped amendment titles are rewritten into readable phrases (“Amendment 12 to Article 3…”) so the search index and vote headers are usable by people, not just parsers.",
        },
      ],
    },
    {
      type: "prose",
      title: "Outcome",
      body: "Euro Votes is end-to-end civic data work: scraping and API ingestion, relational modeling with time-aware joins, and multi-chart storytelling on a single vote. It shows comfort moving between backend pipelines and frontend visualization libraries, and designing views that answer concrete political questions rather than dumping tables.",
    },
  ],
}
