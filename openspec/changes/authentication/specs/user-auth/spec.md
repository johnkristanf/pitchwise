# Spec Delta

## Purpose

Provides secure authentication, session management, and route protection for PitchWise users via modern Supabase Auth APIs and JSON Web Tokens.

## ADDED Requirements

### Requirement: User Sign-In and Registration

The system SHALL provide an authentication interface enabling users to sign in and register with their email address and password using Supabase Auth.

#### Scenario: Successful user sign-in

- **WHEN** an existing user enters valid email and password credentials on the login page and submits
- **THEN** the system authenticates the user, stores the session JWT, and redirects the user to the application home

#### Scenario: Failed sign-in with invalid credentials

- **WHEN** a user enters invalid credentials or an unregistered email address and submits
- **THEN** the system displays a clear error message and keeps the user on the login page

#### Scenario: New user registration

- **WHEN** a new user provides an email and password in registration mode and submits
- **THEN** the system creates the account in Supabase Auth and prompts the user to verify email or signs them in directly based on project settings

### Requirement: Modern Supabase Client Configuration

The system SHALL initialize the Supabase client using modern publishable API key and URL environment variables without relying on deprecated legacy keys.

#### Scenario: Environment configuration loaded

- **WHEN** the application starts with valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` configured
- **THEN** the client connects to the Supabase Auth instance using modern JWT token conventions

#### Scenario: Missing environment variables warning

- **WHEN** the application starts without required Supabase environment keys defined
- **THEN** the application provides a descriptive console or UI notice informing the developer to configure `.env` variables from `.env.example`

### Requirement: Session Lifecycle and Persistence

The system SHALL maintain user session state across page reloads and provide real-time updates upon sign-in, token refresh, and sign-out.

#### Scenario: Automatic session restoration

- **WHEN** an authenticated user refreshes or reopens the browser
- **THEN** the system restores the active session and user profile without prompting for re-login

#### Scenario: User sign-out

- **WHEN** an authenticated user triggers the sign-out action
- **THEN** the system clears the local authentication tokens and redirects the user to the login page

### Requirement: Route Access Protection

The system SHALL protect authenticated application views and redirect unauthenticated users to the login screen.

#### Scenario: Unauthenticated visitor accessing protected route

- **WHEN** an unauthenticated visitor attempts to navigate to a protected route
- **THEN** the system redirects the visitor to `/login` preserving the intended destination

#### Scenario: Authenticated user visiting login page

- **WHEN** an already authenticated user navigates to `/login`
- **THEN** the system redirects the user to the home dashboard
