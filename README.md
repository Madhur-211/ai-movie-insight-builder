AI Movie Insight Builder

A full-stack web application that allows users to enter an IMDb movie ID and retrieve detailed movie insights along with AI-generated audience sentiment analysis.

The application aggregates data from multiple external APIs and uses AI to summarize audience reviews and classify overall sentiment.

Live Demo

Deployed on Vercel:

https://ai-movie-insight-builder-gamma.vercel.app/

Features

Fetch movie details using IMDb ID

Display movie metadata:

Title

Poster

Release year

IMDb rating

Cast list

Plot summary

Retrieve audience reviews from TMDB

Generate AI-based sentiment summary

Classify audience sentiment:

Positive

Mixed

Negative

Responsive design for desktop and mobile

Graceful error handling

Loading skeletons and improved UX

Unit tests for core logic

Tech Stack

Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

Backend

Next.js API Routes

Axios / Fetch for external API requests

External APIs

OMDb API – Movie metadata

TMDB API – Audience reviews

Google Gemini API – AI sentiment summarization

Testing

Jest

React Testing Library

Architecture Overview

The project follows a modular layered architecture:

Client (React UI)
↓
API Route (/api/movie/[id])
↓
Service Layer (lib/)
├── omdb.ts
├── tmdb.ts
├── ai.ts
└── validation.ts
↓
External APIs

Key Design Decisions

Separation of concerns between UI, API routes, and service logic.

Service layer abstraction for external APIs.

Input validation using Zod schemas.

Graceful fallback handling when external APIs fail.

Caching strategy implemented to reduce redundant API requests.

AI module abstraction allows switching between AI providers easily.

Deployment

The application is deployed on Vercel.

Environment variables must be configured in:

Vercel Dashboard → Project Settings → Environment Variables

After configuration, Vercel automatically builds and deploys the application.

Assumptions

IMDb ID format: tt followed by 7–8 digits.

Not all movies have audience reviews available.

AI summarization is performed using the top 5 reviews to reduce token usage.

Sentiment classification is derived from AI output.

Performance Considerations

Review requests are cached to avoid redundant API calls.

Review text length is limited before sending to the AI model.

External API failures are handled gracefully to prevent UI crashes.

Future Improvements

Redis caching for API responses

Review pagination

Improved AI prompt engineering

End-to-end testing with Playwright

Advanced UI animations and micro-interactions

Author

Madhur Gupta
Full Stack Developer Intern Candidate
