import type { Project } from "./types"

const D = "/projects/falcon-market/diagrams"

export const falconMarket: Project = {
  id: 1,
  slug: "falcon-market",
  title: "Falcon Market",
  tagline: "A student marketplace with seller tools and real-time analytics",
  image: "/projects/falcon-market/thumbnail.jpg",
  technologies: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "Auth0", "Supabase", "Kafka"],
  link: "https://github.com/IzahSohail/Retail_App",
  linkLabel: "View repository",
  lede:
    "A campus marketplace for students to buy, sell, and donate books, clothes, and electronics — designed around transactional checkout, inventory integrity, and role-based access rather than simple CRUD.",
  sections: [
    {
      type: "cards",
      title: "Context",
      intro:
        "Built for CS-UH 3260: Software Architecture as a retail management system (also referred to as Falcon Market), with continued work beyond the architecture checkpoint. Campus resale usually lives in group chats — no inventory truth, no receipts, and no way to stop someone buying their own listing. The goal was a system where purchases are atomic, auditable, and safe under concurrent buyers.",
      cards: [
        {
          title: "Students",
          body: "List items, browse by category, cart, and checkout with card, cash, or store credit.",
        },
        {
          title: "Businesses",
          body: "Register, get verified, and bulk-upload catalogs via CSV/JSON through an ETL pipeline.",
        },
        {
          title: "Admins",
          body: "Verify users, run flash sales, and process returns through inspection, shipment, and refund.",
        },
      ],
    },
    {
      type: "figures",
      title: "Architecture",
      intro:
        "A React SPA talks to an Express API. Auth middleware integrates with Auth0 (OIDC); an upload adapter stores product images in Supabase; Prisma is the persistence boundary over PostgreSQL. Purchase logic is isolated: pricing as pure functions, payment behind an adapter, and checkout as a multi-phase transaction.",
      layout: "stack",
      figures: [
        {
          src: `${D}/module-diagram.png`,
          alt: "Module diagram of frontend, backend, database, and external services",
          label: "Module diagram",
          caption:
            "Frontend feature modules call the API over HTTP. The Express server splits auth, image upload, and domain routes. Prisma owns persistence; Auth0 and Supabase stay outside the core.",
        },
        {
          src: `${D}/deployment-diagram.png`,
          alt: "Deployment diagram showing browser, Express host, Prisma, Auth0, Supabase, and PostgreSQL",
          label: "Deployment diagram",
          caption:
            "Browser → HTTPS → server.js. Checkout flows through pricing and purchase services, then Prisma. Money is stored in minor units (fils). The purchase path is an ACID transaction so stock and the sale ledger stay aligned.",
        },
      ],
    },
    {
      type: "split",
      title: "Data model",
      body:
        "Users both buy and sell. A cart is the pre-purchase state; a sale, sale items, and payment form the post-purchase ledger. Products belong to a category and a seller. Later schema additions cover flash sales, B2B verification, and a full RMA workflow (return requests, shipments, inspections, refunds, audit logs).",
      bullets: [
        "Prices and balances stored as integers in minor units",
        "Foreign keys keep the ledger coherent and auditable",
        "Cart vs sale is intentional: carts change; completed sales are ledger rows",
      ],
      figure: {
        src: `${D}/er-diagram.png`,
        alt: "Entity-relationship diagram for users, products, carts, sales, and payments",
        caption:
          "ER diagram — payments are their own entity so a declined charge never pretends to be a completed order.",
      },
    },
    {
      type: "phases",
      title: "Purchase flow",
      intro:
        "Checkout is not “insert order.” It is a designed use case with failure paths treated as first-class behavior.",
      phases: [
        {
          title: "Authenticate",
          body: "Guests must log in via Auth0 before purchase; failed or cancelled login persists nothing.",
        },
        {
          title: "Validate & price",
          body: "Active listing, sufficient stock, not your own product; totals in minor units; live flash-sale discounts applied when active.",
        },
        {
          title: "Reserve stock (ACID)",
          body: "prisma.$transaction decrements stock with updateMany where stock >= quantity. If another buyer took the last unit, count === 0 and the transaction rolls back.",
        },
        {
          title: "Charge safely",
          body: "PaymentService uses retries, exponential backoff, a circuit breaker, and an idempotency key. On failure, reserved stock is restored and the sale is marked CANCELED.",
        },
        {
          title: "Finalize",
          body: "Cart cleared, payment APPROVED, and a sale.completed event emitted to Kafka for ops reporting.",
        },
      ],
      figure: {
        src: `${D}/ssd.png`,
        alt: "System sequence diagram of the Falcon Market purchase flow",
        label: "System sequence diagram",
        caption:
          "Purchase flow from login through browse, cart, and checkout. The alt blocks are the point: invalid stock, declined payment, and rollback are designed paths — not afterthoughts.",
        variant: "wide",
      },
    },
    {
      type: "figures",
      title: "Use cases",
      intro:
        "Three UML use cases capture the policy surface around purchase: registering a sale, requiring login, and blocking self-purchase.",
      layout: "grid-3",
      figures: [
        {
          src: `${D}/uc-register-sale.png`,
          alt: "Use case diagram for register sale / purchase",
          caption:
            "Register sale — mandatory steps vs extensions for insufficient stock, payment declined, and concurrency conflicts.",
          variant: "lite",
        },
        {
          src: `${D}/uc-login.png`,
          alt: "Use case diagram for purchase requiring login",
          caption:
            "Purchase requires login — Auth0 as an external actor; failed login extends the base case and writes nothing.",
          variant: "lite",
        },
        {
          src: `${D}/uc-self-purchase.png`,
          alt: "Use case diagram for self-purchase prevention",
          caption:
            "Self-purchase prevention — checkout always includes an ownership check before payment.",
          variant: "lite",
        },
      ],
    },
    {
      type: "adrs",
      title: "Architecture decisions",
      items: [
        {
          label: "ADR-001 · Accepted",
          title: "PostgreSQL over NoSQL",
          body: "A purchase writes Sale, SaleItems, Payment, and stock together. ACID transactions, foreign keys, and SQL aggregations beat schema flexibility here. A document store would push integrity into application code and risk stale inventory. Trade-off: correctness and auditability now; horizontal write scale later.",
        },
        {
          label: "ADR-002 · Accepted",
          title: "Prisma behind a persistence boundary",
          body: "Services own business rules; Prisma owns nested writes and $transaction. Pricing stays as pure functions for unit testing. Raw SQL would mean more boilerplate and weaker types. Trade-off: less control over hot SQL, with a seam to swap the data-access layer later.",
        },
      ],
    },
    {
      type: "table",
      title: "Beyond the diagrams",
      intro:
        "The architecture docs stop at the checkpoint. The system kept growing into resilience, promotions, returns, and event-driven reporting.",
      headers: ["Area", "What it shows"],
      rows: [
        [
          "PaymentService",
          "Adapter pattern (mock gateway), retries, exponential backoff, CLOSED / OPEN / HALF_OPEN circuit breaker, idempotency cache",
        ],
        [
          "Checkout",
          "Reserve-then-pay; stock restored on payment failure; Idempotency-Key header to avoid double-charge",
        ],
        [
          "Flash sales",
          "Time-boxed percentage or fixed discounts; surge testing with concurrent buyers",
        ],
        [
          "B2B ETL",
          "CSV/JSON extract → validate titles, prices, categories, stock → load listings",
        ],
        [
          "RMA",
          "Inspection → approve/reject → ship → refund to original payment or store credit, with audit logs",
        ],
        [
          "Kafka → Sheets",
          "Fire-and-forget sale.completed producer; consumer appends line items for ops reporting",
        ],
        [
          "Tests",
          "Unit (pricing, payment), cart integration, concurrency (10 buyers / 5 stock), flash-sale surge, high-volume catalog upload",
        ],
      ],
    },
    {
      type: "prose",
      title: "Honest constraints",
      body: "",
      bullets: [
        "Payments use a mock adapter by design — the focus is retries, idempotency, and rollback, not PCI compliance.",
        "Kafka emit is fire-and-forget so a broker outage does not fail checkout; Sheets is ops reporting, not the ledger.",
        "This is a course project with continued build-out — not a production marketplace (local Kafka, session cookies in development, etc.).",
      ],
    },
  ],
}
