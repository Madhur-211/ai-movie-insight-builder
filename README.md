# AI Movie Insight Builder

A full-stack application that allows users to enter an IMDb movie ID and retrieve:

- Movie metadata (title, poster, release year, rating)
- Cast information
- Plot summary
- AI-generated audience sentiment summary
- Overall sentiment classification (Positive / Mixed / Negative)

## 🔹 Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes (Server-side logic)
- Axios for external API calls

### External APIs

- OMDb API (Movie metadata)
- TMDB API (Audience reviews)
- Google Gemini API (AI sentiment analysis)

### Testing

- Jest
- React Testing Library

---

## 🔹 Architecture Overview

The application follows a modular full-stack architecture:

Client (React UI)
↓
API Route (/api/movie/[id])
↓
Services Layer (lib/)
├── omdb.ts
├── tmdb.ts
├── ai.ts
├── validation.ts
↓
External APIs

### Key Design Decisions

- Separation of concerns between API route and service layer.
- In-memory caching implemented for TMDB reviews to reduce redundant calls.
- AI logic abstracted in `lib/ai.ts` to allow easy switching between providers.
- Input validation using Zod schema.
- Graceful error handling for all external API failures.

---

## 🔹 Features Implemented

- IMDb ID validation
- Fetch movie details from OMDb
- Fetch audience reviews from TMDB
- AI-generated audience sentiment summary
- Sentiment classification (Positive / Mixed / Negative)
- Responsive UI (Desktop + Mobile)
- Error handling & loading states
- Basic unit testing

## 🔹 Running Tests

npm test

Test coverage includes:

- IMDb validation
- Sentiment extraction logic
- API route logic (mocked dependencies)
- Core UI component rendering

---

## 🔹 Deployment

The application is deployed on Vercel.

Environment variables must be configured in:

Vercel Dashboard → Project Settings → Environment Variables

---

## 🔹 Assumptions

- IMDb ID follows format: `tt` + 7–8 digits.
- TMDB reviews may not always exist for all movies.
- AI summary is generated based on top 5 reviews to control token usage.
- Sentiment classification is derived from AI response.

---

## 🔹 Performance Considerations

- In-memory caching reduces redundant TMDB API calls.
- Review length truncated before sending to AI to minimize cost.
- Graceful fallback when external APIs fail.

---

## 🔹 Future Improvements

- Add persistent caching (Redis).
- Add review pagination.
- Improve AI prompt engineering for structured JSON output.
- Add E2E testing (Playwright).
- Add loading skeleton animations.

---

## 🔹 Tech Stack Rationale

- **Next.js** provides seamless full-stack capabilities with API routes.
- **TypeScript** ensures type safety and maintainability.
- **Zod** used for runtime validation.
- **Gemini API** used for AI summarization with free-tier compatibility.
- **Jest + React Testing Library** chosen for lightweight unit testing.

The stack aligns with scalable modern web development practices.

---

## 🔹 Author

Madhur Gupta  
Full Stack Developer Intern Candidate
