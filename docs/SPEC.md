# Product Specification Document (PRD) - Edemy

## 1. Vision & Problem Statement
**Problem:** The educational landscape is fragmented. Learners struggle to find tailored, engaging, and interactive content, while educators face high friction in creating high-quality, multimedia courses. 
**Vision:** Edemy aims to be the ultimate AI-powered Learning platform that democratizes education. It empowers users to generate fully realized, interactive, and gamified courses on any topic instantly using AI, while providing a rich marketplace for educators and a highly engaging, peer-supported environment for learners.

## 2. Core User Stories & Acceptance Criteria

### Feature 1: AI-Powered Course Generation
**Story:** As a user, I want to generate a course by entering a topic and difficulty so that I can learn about a specific subject instantly.
- **GIVEN** a user is on the course creation page, 
- **WHEN** they enter a topic (e.g., "Python Basics"), select a difficulty, and click "Generate", 
- **THEN** the system triggers a background worker to create a structured outline, chapters, and embedded media, redirecting the user to the generated course page upon completion.

### Feature 2: Interactive Learning (Smart Flashcards)
**Story:** As a student, I want to practice with AI-generated flashcards that adapt to my learning pace.
- **GIVEN** a user is reviewing a chapter,
- **WHEN** they mark a flashcard as "incorrect",
- **THEN** the system dynamically places the card a few steps back in the active stack for spaced repetition.

### Feature 3: Push-to-Talk AI Voice Agent
**Story:** As a language learner, I want to practice speaking with a low-latency AI tutor.
- **GIVEN** the user is in a conversational scenario,
- **WHEN** they press and hold the microphone button,
- **THEN** the AI tutor's audio stream is paused, and the system records the user's speech, providing corrective feedback and an instant transcript.

### Feature 4: Gamification & Progression
**Story:** As a learner, I want to be rewarded for my consistency to stay motivated.
- **GIVEN** the user completes a daily lesson,
- **WHEN** they finish the final quiz,
- **THEN** the system awards XP, updates their activity heatmap, and increments their daily streak.

## 3. 3-Layer Boundaries System

### ALWAYS (Must always do)
- **Always** write automated tests (unit and integration) for critical paths (Auth, Payments, Course Generation).
- **Always** run typechecks (TypeScript) and linters before confirming completion of a task.
- **Always** use semantic HTML and accessible UI components (ShadcnUI).
- **Always** validate incoming API payloads and database inputs.

### ASK FIRST (Must ask before doing)
- **Ask first** before installing any new external npm or pip library.
- **Ask first** before modifying the Database Schema or running unapproved migrations.
- **Ask first** before making significant architectural changes or deviating from the UI/UX flow.
- **Ask first** before choosing or switching external API providers (e.g., LLMs, Voice providers).

### NEVER (Absolutely must not do)
- **Never** hardcode API keys, database credentials, or sensitive information in the codebase.
- **Never** commit `.env` files or secrets to version control.
- **Never** bypass authentication or authorization checks on API routes.
- **Never** write massive, un-chunked PRs; always follow the Vertical Slice phase plan.

## 4. Non-Functional Requirements
- **Security:** Secure JWT/session validation via Clerk. Rate limiting on AI generation endpoints to prevent abuse.
- **Performance:** Core pages must load rapidly. Heavy AI generation tasks must be completely decoupled and offloaded to Inngest background workers to prevent HTTP timeouts.
- **Mobile-Responsive UI:** The frontend must be fully responsive, prioritizing a mobile-first design for the student learning experience.
- **Scalability:** Leverage Next.js edge/serverless infrastructure and managed database (Neon) to handle concurrent users gracefully.
