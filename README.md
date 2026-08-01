# sraavya.vercel.app

Personal portfolio website. Built with Next.js 14, deployed on Vercel.

**Live:** [sraavya.vercel.app](https://sraavya.vercel.app)

---

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Inline styles + CSS variables — no Tailwind, no component library
- **Animation:** Custom canvas-based neural network background (`NeuralBackground.tsx`)
- **AI Twin:** OpenAI API — chat widget with a hardcoded system prompt that keeps responses Sraavya-specific
- **Contact form:** [Web3Forms](https://web3forms.com) — submissions land directly in email, no backend needed
- **Deployment:** Vercel

---

## Features

**AI Twin** — "Ask my AI twin" opens a chat widget powered by the OpenAI API. The system prompt constrains it to only answer questions about Sraavya: projects, experience, skills, achievements. Off-topic questions get redirected with personality. The prompt lives in `lib/portfolio-data.ts`.

**Neural background** — animated canvas in `components/ui/NeuralBackground.tsx`. Draws nodes and edges that pulse and shift. Purely custom, no library.

**Typewriter hero** — rotating lines in the hero section cycle through a few one-liners defined in `portfolio-data.ts`.

**Experience accordion** — each experience card expands on click to show bullet points. Collapsed by default to keep the section clean.

**Achievements filter** — tabs to filter by `all`, `competitive`, `hackathon`.

**Contact form** — sends a message directly to Sraavya's inbox via Web3Forms. No server, no database.

**Easter egg** — try the Konami code (↑ ↑ ↓ ↓ ← → ← → B A). No functionality gated behind it — just a reward for the curious.

---

## Project Structure

```
├── app/
│   ├── layout.tsx          # root layout, fonts, metadata
│   ├── page.tsx            # composes all sections
│   └── api/chat/route.ts   # OpenAI API route for AI twin
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── HumanStrip.tsx  # the "also: I read literary fiction" ticker
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Achievements.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── NeuralBackground.tsx
│       ├── SectionDivider.tsx
│       ├── Terminal.tsx
│       └── TypeWriter.tsx
├── lib/
│   └── portfolio-data.ts   # single source of truth for all content + AI twin system prompt
└── public/
    ├── projects/           # project preview images
    └── resume.pdf
```

---

## Running Locally

```bash
git clone https://github.com/ksraavya/portfolio-website
cd portfolio-website
npm install
```

Create a `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Updating Content

Everything content-related lives in **`lib/portfolio-data.ts`** — projects, experience, achievements, skills, typewriter lines, and the AI twin's system prompt. To update the portfolio, edit that file. No other files need to change for content updates.

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `OPENAI_API_KEY` | Powers the AI twin chat widget |

Web3Forms access key is set directly in the contact form component — no env variable needed.

---

## Deployment

Deployed on Vercel. Push to `main` triggers a deploy automatically. Add `OPENAI_API_KEY` in Vercel's environment variable settings.

---

## License

Code is open source — feel free to use it as reference or inspiration. Please don't deploy it as-is with my content. Swap in your own.