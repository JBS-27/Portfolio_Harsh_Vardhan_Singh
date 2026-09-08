# Harsh Vardhan Singh — Portfolio

Personal site for Harsh Vardhan Singh: full-stack engineer, AI systems, and visual craft. Built as a dark-mode-first, single-page portfolio with case-study routes.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · next-themes · Lucide React

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
npm run lint
```

## Edit content

Almost everything is in `src/lib/data.ts`:

- Name, role, tagline, availability
- Projects and case studies
- About copy, skills, experience
- Social links and email

Drop your PDF resume at `public/Harsh_Vardhan_Singh_Resume.pdf` so the Download PDF button on `/resume` works.

## Contact form

The form posts to `src/app/api/contact/route.ts`.

1. Copy `.env.example` to `.env.local`
2. Set **either** Resend (`RESEND_API_KEY`) **or** Formspree (`FORMSPREE_FORM_ID`)
3. If neither is set, the form opens a `mailto:` draft instead

## Deploy

Push to GitHub and import the repo in [Vercel](https://vercel.com). Add the same env vars in the project settings if you want the form to send mail.

Then set `site.url` in `src/lib/data.ts` to your production origin (used for sitemap, robots, and Open Graph).

## Structure

```
src/
  app/                 # routes, metadata, contact API
  components/          # navbar, hero, work, about, skills, contact
  lib/data.ts          # all copy
```
