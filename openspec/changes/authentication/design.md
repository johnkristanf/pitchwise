# Design

## Context

The PitchWise client is built with React Router v7 (`@react-router/dev`, `@react-router/node`), React 19, Vite, and Tailwind CSS v4 in `client/`. The user requires integrating Supabase Auth for authentication with a dedicated login page. Crucially, legacy Supabase keys (`SUPABASE_ANON_KEY` / `service_role` JWTs) must be avoided in favor of modern Supabase API conventions (`VITE_SUPABASE_PUBLISHABLE_KEY` and modern JWT token handling). Environment variable keys must be referenced in code and provided in `.env.example`, allowing the developer to supply their own secrets in `.env`.

See `proposal.md` for overall motivation and `specs/user-auth/spec.md` for behavioral requirements.

## Goals / Non-Goals

**Goals:**

- Provide a clean, resilient Supabase client module utilizing `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Provide an `AuthContext` and `useAuth()` hook for managing user sessions, login, registration, and sign-out across the app.
- Build an aesthetic, accessible, and responsive `/login` route with tabbed Sign In / Sign Up modes, loading states, and error alerts.
- Create `client/.env.example` documenting the exact environment variable keys.
- Add an `AuthGuard` or protected route redirection mechanism for views requiring an active session.

**Non-Goals:**

- Multi-factor authentication (MFA/TOTP), OAuth social logins (Google/GitHub), or Enterprise SAML SSO in this initial change (can be added incrementally).
- Server-side database tables or webhook handlers in the FastAPI backend (FastAPI JWT bearer token validation will be addressed in a separate change).
- Supplying real Supabase credentials (the user will enter their own values into `.env`).

## Decisions

### 1. Modern Supabase Client Configuration

- **Decision**: Initialize the client via `createClient(supabaseUrl, supabasePublishableKey)` in `client/app/lib/supabase.ts`, reading from `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY`.
- **Rationale**: Complies with Supabase's modern API key architecture (Publishable keys replacing legacy static anon keys). If variables are unconfigured or placeholder strings, the module exports a safe stub or emits actionable diagnostics rather than throwing unhandled runtime exceptions.
- **Alternatives Considered**: Using legacy `VITE_SUPABASE_ANON_KEY` (rejected per explicit requirement).

### 2. React Context State & Real-time Session Sync

- **Decision**: Mount an `AuthProvider` in `client/app/root.tsx` utilizing `supabase.auth.onAuthStateChange` and `supabase.auth.getSession()`.
- **Rationale**: Ensures immediate reactivity on login, logout, and token auto-refresh. The active JWT and user profile are accessible anywhere in the component tree via `useAuth()`.
- **Alternatives Considered**: Redux / Zustand store (unnecessary bloat for standard auth sessions; React Context + Supabase listener is minimal and standard).

### 3. UI Component Architecture for `/login`
- **Decision**: Place the login route at `client/app/routes/login.tsx` and register it in `client/app/routes.ts`. Build the UI with **shadcn/ui** design patterns and Tailwind CSS v4, styled in the project theme of **`slate-900`** and **`white`**. The interface features a sleek card container (`bg-slate-900` / high-contrast borders), tabbed Sign In / Sign Up modes, email/password fields, clean error banners, and accessible loading states.
- **Rationale**: Technical founders appreciate a clean, developer-focused, high-contrast aesthetic that feels reliable and distraction-free.

### 4. Route Protection Strategy

- **Decision**: Create a lightweight `ProtectedRoute` wrapper component (`client/app/components/protected-route.tsx`) that checks `useAuth()`. If unauthenticated, it redirects to `/login`.
- **Rationale**: Simple, modular, and works cleanly within React Router's route hierarchy.

## Risks / Trade-offs

- **[Unconfigured .env at first launch]** → The client might fail API requests if keys are missing.
  - _Mitigation_: Supabase helper checks for missing or placeholder keys and surfaces a friendly developer-mode warning badge or console explanation with `.env.example` guidance.
- **[Supabase Project Email Confirmation Requirement]** → If email confirmation is enabled in Supabase, sign-up will not immediately authenticate the session.
  - _Mitigation_: The registration flow checks for an unconfirmed session and displays a clear "Check your inbox for a confirmation link" message.
- **[SSR Hydration Flickering]** → In React Router SSR, initial auth status on the server is unauthenticated until the browser hydrates.
  - _Mitigation_: Provide an `isLoading` indicator in `AuthContext` so route guards render a subtle loading state instead of prematurely redirecting during hydration.

## Migration Plan

1. Install `@supabase/supabase-js` into `client/`.
2. Add `client/.env.example`.
3. Add Supabase client initializer `client/app/lib/supabase.ts`.
4. Add `client/app/context/auth-context.tsx`.
5. Add `client/app/routes/login.tsx` and register in `client/app/routes.ts`.
6. Add protected route helper and test sign-in, registration, and sign-out flows.
