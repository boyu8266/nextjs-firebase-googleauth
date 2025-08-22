# Project: Next.js with NextAuth.js for Google OAuth

This is a Next.js project configured to use NextAuth.js for handling user authentication via Google's OAuth service.

## Key Technologies

- **Framework:** Next.js 15 (with App Router)
- **Authentication:** NextAuth.js (v5)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Linting:** ESLint

## Project Structure

- `src/app/auth.ts`: The core configuration file for NextAuth.js. It sets up the Google authentication provider and exports the necessary handlers and functions (`auth`, `signIn`, `signOut`).
- `src/app/api/auth/[...nextauth]/route.ts`: The NextAuth.js API route that handles all authentication requests (e.g., sign-in, sign-out, callbacks).
- `src/app/page.tsx`: The main landing page. It is a protected route that checks for an active user session and redirects to the login page if the user is not authenticated.
- `src/app/login/page.tsx`: The public-facing login page that contains the button to initiate the Google login flow.
- `src/app/components/auth-components.tsx`: (Inferred) This file likely contains the client-side components for "Login" and "Logout" buttons.
- `src/app/components/session-provider.tsx`: (Inferred) A client-side component that wraps the application to provide the NextAuth.js session context to all pages.
- `next.config.ts`: The main configuration file for the Next.js application.
- `package.json`: Defines project scripts, dependencies, and metadata.

## Building and Running

### Prerequisites

You must create a `.env.local` file in the root of the project with the following environment variables:

```
AUTH_SECRET="your-secure-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_CLIENT_EMAIL="your-firebase-client-email"
FIREBASE_PRIVATE_KEY="your-firebase-private-key"
```

- `AUTH_SECRET`: A secret key used to sign and encrypt tokens. You can generate one using `openssl rand -base64 32`.
- `AUTH_GOOGLE_ID`: Your Google OAuth Client ID.
- `AUTH_GOOGLE_SECRET`: Your Google OAuth Client Secret.
- `FIREBASE_PROJECT_ID`: Your Firebase Project ID.
- `FIREBASE_CLIENT_EMAIL`: Your Firebase Client Email.
- `FIREBASE_PRIVATE_KEY`: Your Firebase Private Key (ensure this is properly escaped if it contains newlines).

### Commands

- **To install dependencies:**
  ```bash
  npm install
  ```
- **To run the development server:**

  ```bash
  npm run dev
  ```

  The application will be available at [http://localhost:3000](http://localhost:3000).

- **To build the application for production:**

  ```bash
  npm run build
  ```

- **To run the production server:**

  ```bash
  npm run start
  ```

- **To lint the code:**
  ```bash
  npm run lint
  ```

## Development Conventions

- **Authentication Flow:** Unauthenticated users are automatically redirected from the home page (`/`) to the `/login` page. After a successful login, they are likely redirected back to the page they originally intended to visit.
- **Session Management:** The user session is checked on the server-side in `src/app/page.tsx` using the `auth()` function from `auth.ts`.
- **Styling:** The project uses Tailwind CSS for utility-first styling.
- **Path Aliases:** The project is configured with a path alias `@/*` pointing to the `./src/*` and `./*` directories for cleaner import statements.
