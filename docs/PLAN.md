# Development Roadmap - Edemy (Vertical Slice Method)

*Note: This plan focuses on MVP Phases to establish the core engine. Subsequent complex features (AI Video generation, Matching) will be added as later phases.*

## Phase 1: Authentication & Core Infrastructure
**Goal:** Setup the repository, database connection, user authentication, and basic routing.

- [ ] **Task 1.1 (15m):** Initialize Next.js project with Tailwind CSS and ShadcnUI.
- [ ] **Task 1.2 (15m):** Initialize Django backend project, setup virtual environment, and configure CORS.
- [ ] **Task 1.3 (15m):** Provision NeonDB (PostgreSQL) and configure connection strings in both environments.
- [ ] **Task 1.4 (15m):** Setup Clerk Auth in Next.js and create `/sign-in` and `/sign-up` routes.
- [ ] **Task 1.5 (15m):** Implement Clerk Webhook handler in Django (or Next.js) to sync user profiles to NeonDB.
- [ ] **Task 1.6 (15m):** Create the frontend User Dashboard layout with a protected route wrapper.

**Definition of Done:** A user can sign up, log in, and view a protected dashboard. The user record is successfully synced to the Neon database.
**Test Plan:** Manually sign up with a test email. Verify the Clerk dashboard and NeonDB table for the new user record.

## Phase 2: Database Schema & AI Orchestration Setup (Inngest)
**Goal:** Define the data models for Courses and setup background job processing.

- [ ] **Task 2.1 (15m):** Define DB models for `Course`, `Chapter`, and `Lesson`. Run migrations.
- [ ] **Task 2.2 (15m):** Setup Inngest client in the backend environment to handle asynchronous tasks.
- [ ] **Task 2.3 (15m):** Create a dummy Inngest function `generate-course-test` and trigger it via a temporary API route.
- [ ] **Task 2.4 (10m):** Verify the dummy event processes successfully in the Inngest dev server.

**Definition of Done:** Database schema is ready. Inngest is configured and can successfully process a background event.
**Test Plan:** Check database schema validity. Trigger the Inngest endpoint and monitor the Inngest dev UI for success.

## Phase 3: Vertical Slice - AI Course Generation (Outline & Content)
**Goal:** End-to-end flow where a user requests a course and the AI generates the outline and basic chapters.

- [ ] **Task 3.1 (15m):** Backend - Create REST API endpoint `POST /api/courses/generate` that accepts topic and difficulty.
- [ ] **Task 3.2 (15m):** Backend - Integrate LLM in an Inngest worker to generate a structured JSON outline based on the prompt.
- [ ] **Task 3.3 (15m):** Backend - Update worker to save the generated outline to the DB `Course` and `Chapter` tables.
- [ ] **Task 3.4 (15m):** Frontend - Build the Course Generation form UI (Topic input, Difficulty select, Submit button).
- [ ] **Task 3.5 (10m):** Frontend - Connect the form to the API endpoint and handle loading states.
- [ ] **Task 3.6 (15m):** Frontend - Create a Course Detail page that fetches and displays the newly generated course structure.

**Definition of Done:** User enters a topic, the backend triggers an Inngest worker that calls an LLM, saves the result, and the UI displays the generated course.
**Test Plan:** Submit a real topic (e.g., "Introduction to SQL"). Wait for processing, verify DB records and UI rendering.

## Phase 4: Vertical Slice - Interactive Learning (Smart Flashcards)
**Goal:** End-to-end flow for generating and interacting with flashcards within a chapter.

- [ ] **Task 4.1 (10m):** Backend - Define `Flashcard` model linked to a `Chapter`. Run migrations.
- [ ] **Task 4.2 (15m):** Backend - Create an Inngest step to generate Q&A pairs for a chapter and save them.
- [ ] **Task 4.3 (15m):** Backend - Create a GET API to fetch flashcards for a specific chapter.
- [ ] **Task 4.4 (15m):** Frontend - Build the Flashcard UI component (flippable card with Front/Back).
- [ ] **Task 4.5 (15m):** Frontend - Implement Spaced Repetition logic (state management for Correct/Incorrect actions).
- [ ] **Task 4.6 (10m):** Frontend - Connect the Flashcard UI to the backend API.

**Definition of Done:** A chapter includes generated flashcards, and a user can interact with them.
**Test Plan:** Navigate to a chapter, view flashcards, mark one incorrect, and verify it reappears later in the stack.

## Phase 5: Vertical Slice - Gamification Basics
**Goal:** Implement XP tracking and basic streaks.

- [ ] **Task 5.1 (10m):** Backend - Add `xp` and `streak` fields to the User profile model.
- [ ] **Task 5.2 (10m):** Backend - Create API endpoint to increment XP upon lesson completion.
- [ ] **Task 5.3 (15m):** Frontend - Build a Top Navigation Bar component that displays current XP and Coins.
- [ ] **Task 5.4 (15m):** Frontend - Connect lesson completion UI to trigger the XP increment API.

**Definition of Done:** Completing a learning action successfully updates the user's XP in the DB and UI.
**Test Plan:** Complete a flashcard deck or quiz, verify that the XP counter in the header increases.
