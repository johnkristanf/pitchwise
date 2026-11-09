# Proposal

## Why

PitchWise requires secure user authentication to enable technical founders to create accounts, sign in, and persist their personalized pitch training and discovery questioning practice sessions. Implementing authentication with modern Supabase Auth APIs and JWT handling ensures secure, standards-compliant session management while avoiding deprecated Supabase legacy keys.

## What Changes

- Add a dedicated, responsive authentication page at `/login` supporting email/password sign-in and sign-up with error handling and validation states.
- Initialize the Supabase client in the frontend using modern Supabase API key conventions (`VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`) rather than legacy anon/service keys.
- Add an environment variable configuration template (`client/.env.example`) and code-level environment variable readers, leaving the actual secret values for the user to configure.
- Implement client authentication state management (session persistence, user profile access, sign-out functionality).
- Provide route guards or redirection logic to protect authenticated routes and prevent unauthenticated access.

## Capabilities

### New Capabilities
- `user-auth`: Covers user registration, authentication (sign-in/sign-up), JWT session lifecycle management, and route access protection using Supabase Auth.

### Modified Capabilities
*(None - this is a new capability in a greenfield project)*

## Impact

- **Frontend (`client/`)**:
  - Adds dependency `@supabase/supabase-js`.
  - Adds authentication route (`/login`) in `client/app/routes/login.tsx` and route registration in `client/app/routes.ts`.
  - Adds Supabase client configuration module (`client/app/lib/supabase.ts`).
  - Adds Auth context/provider and hooks (`client/app/context/auth-context.tsx`).
  - Adds `client/.env.example` defining required environment variable keys.
- **Backend / APIs**:
  - Prepares foundation for JWT bearer token validation on protected FastAPI endpoints in future changes.

