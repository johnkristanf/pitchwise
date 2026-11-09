# Tasks

## 1. Environment & Dependencies Setup

- [ ] 1.1 Install `@supabase/supabase-js` in `client/` and verify that `client/package.json` reflects the new dependency.
- [ ] 1.2 Create `client/.env.example` defining `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` with developer setup notes, and verify the file exists.

## 2. Supabase Client & Authentication Core

- [ ] 2.1 Create `client/app/lib/supabase.ts` initializing Supabase with `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`, including diagnostic warnings for missing variables and modern JWT conventions; verify via `npm run typecheck` in `client/`.
- [ ] 2.2 Create `client/app/context/auth-context.tsx` implementing `AuthProvider` and the `useAuth()` hook with `supabase.auth.onAuthStateChange`, session persistence, sign-in, sign-up, and sign-out helpers; verify via `npm run typecheck` in `client/`.
- [ ] 2.3 Wrap the application layout in `client/app/root.tsx` with `AuthProvider` and verify the client compiles cleanly.

## 3. Login UI & Route Integration

- [ ] 3.1 Create `client/app/routes/login.tsx` providing a responsive authentication card using shadcn/ui patterns and the project theme (`slate-900` and `white`), supporting email/password sign-in and sign-up switching, validation feedback, and error alerts; verify component renders cleanly.
- [ ] 3.2 Register the `/login` route in `client/app/routes.ts` and verify route resolution.
- [ ] 3.3 Create `client/app/components/protected-route.tsx` for route access protection with loading fallback during session hydration; verify route guard redirection logic.

## 4. Verification & Build Validation

- [ ] 4.1 Run `npm run typecheck` and `npm run build` in `client/` to verify zero TypeScript or bundler errors.
- [ ] 4.2 Verify graceful developer feedback when environment variables are not yet populated in `.env`.

