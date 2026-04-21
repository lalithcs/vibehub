# CareerQuest — Complete Project Documentation

Last updated: March 13, 2026

## 1) Project Summary

CareerQuest is a React + TypeScript social platform focused on:
- Account sign-up/sign-in via Appwrite
- Public feed and explore/search flows
- User profiles and saved posts
- Placement material links and a placement dashboard screen
- PWA support (installable web app)

The app uses:
- React 18, React Router v6
- TanStack Query for async data/cache
- Appwrite SDK for auth/database/storage
- Tailwind + shadcn/ui components
- Vite build tool

---

## 2) Runtime and Build

### Package scripts
- `npm run dev` → start Vite dev server
- `npm run build` → TypeScript compile + production bundle
- `npm run lint` → ESLint
- `npm run preview` → preview production build

### Main dependencies (high impact)
- `react`, `react-dom`, `react-router-dom`
- `@tanstack/react-query`
- `appwrite`
- `react-hook-form`, `zod`, `@hookform/resolvers`
- `tailwindcss`, `tailwind-merge`, `class-variance-authority`
- `react-intersection-observer`, `react-dropzone`, `recharts`

---

## 3) Architecture Overview

### App bootstrap chain
1. `src/main.tsx` mounts app
2. `BrowserRouter` wraps app
3. `QueryProvider` injects React Query client
4. `AuthProvider` manages auth/session state
5. `App.tsx` handles route-level guards and page rendering

### State layers
- **Auth/session state:** React Context (`AuthContext`)
- **Server/cache state:** React Query hooks (`queriesAndMutations.ts`)
- **Form state:** React Hook Form + Zod schemas

### Backend services
Appwrite services used:
- Account (session/auth)
- Databases (users/posts/saves)
- Avatars (initials-based avatar URL)

---

## 4) Route Map (as implemented)

Defined in `src/App.tsx`:

### Public routes
- `/disclaimer`
- `/sign-in`
- `/sign-up`

### Protected routes (also gated by disclaimer flag)
- `/`
- `/explore`
- `/saved`
- `/saved-posts`
- `/all-users`
- `/create-post`
- `/update-post/:id`
- `/posts/:id`
- `/profile/:id/*`
- `/profile/:id/saved`
- `/update-profile/:id`
- `/placement-dashboard`

### Guard logic detail
Protected routes require:
- `isAuthenticated === true`
- `localStorage.disclaimerAgreed === "true"`

If auth context is pending, a full-screen loading state is rendered.

---

## 5) Data Model (inferred from Appwrite API usage)

### Users collection
Fields used:
- `accountId`
- `name`
- `email`
- `username`
- `imageUrl`
- `bio` (optional in usage)

### Posts collection
Fields used:
- `caption`
- `location`
- `tags` (array)
- `creator` (relationship/id)
- `likes` (array)

### Saves collection
Fields used:
- `user`
- `post`

---

## 6) Known Current Behavior / Gaps

Implemented behavior in code today:
- `UpdateProfile` page is currently a placeholder component.
- `LikedPosts` page is currently a placeholder component.
- `RootLayout` imports `RightSidebar` but currently comments it out.
- `AuthLayout` currently hardcodes `isAuthenticated = false`.
- `PostDetails` delete handler exists but is not implemented.
- `TopCreators` and `GridUsersList` “Follow” uses temporary `alert()` behavior.

These are documented to match actual implementation state.

---

## 7) Complete Code File Documentation

This section documents every code/config file in the repository (excluding binary/static image and icon assets).

## Root-Level Files

### `.eslintrc.cjs`
ESLint configuration for TypeScript/React lint rules.

### `.gitignore`
Git ignore patterns (build artifacts, dependencies, env files, etc.).

### `capacitor.config.ts`
Capacitor config for mobile packaging/runtime behavior.

### `components.json`
shadcn/ui component generator/configuration metadata.

### `index.html`
Vite HTML entry template containing app mount node.

### `package.json`
Project metadata, scripts, dependencies, devDependencies.

### `postcss.config.js`
PostCSS plugin setup (Tailwind + autoprefixer pipeline).

### `tailwind.config.js`
Tailwind theme/content configuration.

### `tsconfig.json`
Main TypeScript compiler settings for app source.

### `tsconfig.node.json`
TypeScript settings for Node-side config/build files.

### `vite.config.ts`
Vite configuration:
- React plugin
- `vite-plugin-pwa` manifest/register settings
- `@` alias to `src`

### `.github/workflows/deploy.yml`
GitHub Actions workflow for deployment automation.

### `PROJECT_DOCUMENTATION.md`
Extended project documentation file (synced with this README).

---

## `src` Entry + Shell

### `src/main.tsx`
App entrypoint; mounts app with Router + QueryProvider + AuthProvider.

### `src/App.tsx`
Primary route table and navigation guard logic.

### `src/globals.css`
Global styling, Tailwind layer usage, utility classes.

### `src/vite-env.d.ts`
Vite type declarations.

---

## `src/_auth`

### `src/_auth/AuthLayout.tsx`
Auth page shell with two-pane responsive layout; renders nested auth routes.

### `src/_auth/forms/SigninForm.tsx`
Sign-in form:
- React Hook Form + Zod resolver
- Calls `useSignInAccount`
- Calls auth context `checkAuthUser`
- Navigates to `/` on success

### `src/_auth/forms/SignupForm.tsx`
Sign-up form:
- Validation via `SignupValidation`
- Creates account then signs in
- Calls `checkAuthUser`
- Navigates to `/` on success

---

## `src/_root`

### `src/_root/RootLayout.tsx`
Authenticated layout shell:
- `Topbar`, `LeftSidebar`, `Bottombar`, route `Outlet`
- `RightSidebar` currently commented out

### `src/_root/pages/index.ts`
Barrel export for page modules.

### `src/_root/pages/Home.tsx`
Home feed page showing recent posts from `useGetRecentPosts`.

### `src/_root/pages/Explore.tsx`
Explore/search page:
- Infinite query list
- Debounced search
- IntersectionObserver-triggered pagination

### `src/_root/pages/AllUsers.tsx`
Displays creators list using `useGetTopCreators` and skeleton loading.

### `src/_root/pages/CreatePost.tsx`
Create post screen embedding `PostForm` in `create` mode.

### `src/_root/pages/EditPost.tsx`
Edit post screen:
- Fetches post by route param
- Renders `PostForm` in `update` mode

### `src/_root/pages/PostDetails.tsx`
Post detail view with author block, tags, and `PostStats` controls.

### `src/_root/pages/Profile.tsx`
Profile page:
- Loads user, user posts, saved posts
- Tabbed view via route path (`/saved` branch)

### `src/_root/pages/Saved.tsx`
Placement material resource page with collapsible company-wise Drive links.

### `src/_root/pages/SavedPosts.tsx`
Shows current user’s saved posts via `useGetSavedPosts`.

### `src/_root/pages/Disclaimer.tsx`
Terms/disclaimer acceptance page:
- Requires checkbox acceptance
- Stores `disclaimerAgreed` in localStorage
- Includes optional feedback form

### `src/_root/pages/PlacementDashboard.tsx`
Placement dashboard page using placement statistics query/chart.

### `src/_root/pages/UpdateProfile.tsx`
Placeholder page; currently returns an empty wrapper.

### `src/_root/pages/LikedPosts.tsx`
Placeholder page; currently returns an empty wrapper.

---

## `src/components/forms`

### `src/components/forms/PostForm.tsx`
Shared post form component used for both create and update flows.

### `src/components/forms/PlacementStatisticsChart.tsx`
Chart rendering component used by placement dashboard.

---

## `src/components/shared`

### `src/components/shared/Topbar.tsx`
Top navigation for smaller layouts, profile shortcut, sign-out action.

### `src/components/shared/LeftSidebar.tsx`
Desktop sidebar navigation:
- Uses `sidebarLinks`
- Shows current user summary
- Handles sign-out and redirect

### `src/components/shared/RightSidebar.tsx`
Home-only right sidebar showing top creators (not currently mounted in layout).

### `src/components/shared/Bottombar.tsx`
Mobile bottom navigation using `bottombarLinks`.

### `src/components/shared/PostCard.tsx`
Card view of a post in feed contexts.

### `src/components/shared/PostStats.tsx`
Like/save interactive controls and counts.

### `src/components/shared/GridPostList.tsx`
Reusable grid renderer for post lists.

### `src/components/shared/GridUsersList.tsx`
Reusable grid renderer for creator/user cards.

### `src/components/shared/UserCard.tsx`
Single user card representation.

### `src/components/shared/SearchResults.tsx`
Search result container for explore queries.

### `src/components/shared/TopCreators.tsx`
Top creator card used by `RightSidebar`.

### `src/components/shared/FileUploader.tsx`
File upload helper UI (drop/select behavior).

### `src/components/shared/Loader.tsx`
Spinner/loading indicator component.

---

## `src/components/ui` (shadcn primitives + wrappers)

### `src/components/ui/button.tsx`
Button primitive with variant styling.

### `src/components/ui/card.tsx`
Card primitive family (`Card`, `CardHeader`, etc.).

### `src/components/ui/chart.tsx`
Chart wrapper/helpers for chart composition.

### `src/components/ui/collapsible.tsx`
Collapsible primitive wrapper.

### `src/components/ui/form.tsx`
React Hook Form-bound UI helpers.

### `src/components/ui/input.tsx`
Input primitive component.

### `src/components/ui/label.tsx`
Label primitive component.

### `src/components/ui/skeleton.tsx`
Skeleton loading placeholder.

### `src/components/ui/textarea.tsx`
Textarea primitive component.

### `src/components/ui/toast.tsx`
Toast primitives and structure.

### `src/components/ui/toaster.tsx`
Toaster host/portal component.

### `src/components/ui/use-toast.ts`
Toast hook and dispatch helper.

---

## `src/constants`

### `src/constants/index.ts`
Navigation constant sets:
- `sidebarLinks`
- `bottombarLinks`

---

## `src/context`

### `src/context/AuthContext.tsx`
Global auth context/provider:
- User object state
- `isAuthenticated`, `isPending`
- `checkAuthUser`, `logoutUser`
- Periodic auth re-check logic

---

## `src/hooks`

### `src/hooks/useDebounce.ts`
Value debouncing hook used by explore search input.

---

## `src/lib`

### `src/lib/utils.ts`
General utility helpers (e.g., class merging, date formatting usage points).

### `src/lib/utils/assets.ts`
Asset-related helper exports.

### `src/lib/validation/index.ts`
Zod schemas:
- `SignupValidation`
- `SigninValidation`
- `PostValidation`

### `src/lib/appwrite/config.ts`
Appwrite client initialization and env-driven config object.

### `src/lib/appwrite/api.ts`
All backend interaction methods:
- auth/session calls
- user document operations
- post create/read/update/delete
- likes/saves/search/infinite fetch
- top creators and profile fetch
- placement statistics fetch (currently static data)

### `src/lib/react-query/QueryProvider.tsx`
Creates and provides the React Query client.

### `src/lib/react-query/queryKeys.ts`
Centralized enum of query keys.

### `src/lib/react-query/queriesAndMutations.ts`
Custom query/mutation hooks wrapping `api.ts` functions.

### `src/lib/react-query/types.ts`
React Query-related shared types (including placement data shape).

---

## `src/types`

### `src/types/index.ts`
Core domain/typescript types:
- `IContextType`, `IUser`, `INewUser`, `INewPost`, `IUpdatePost`, `INavLink`, etc.

### `src/types/dompurify.d.ts`
Type declaration shim for DOMPurify integration.

---

## 8) Static Asset Structure

### `public/assets/icons`
Icon set used across nav/actions/loading.

### `public/assets/images`
Branding and visual assets:
- Logo variants
- PWA icon sizes
- Profile placeholder and other static images

---

## 9) Environment Variables

Expected by Appwrite config:
- `VITE_APPWRITE_URL`
- `VITE_APPWRITE_PROJECT_ID`
- `VITE_APPWRITE_DATABASE_ID`
- `VITE_APPWRITE_STORAGE_ID`
- `VITE_APPWRITE_USERS_COLLECTION_ID`
- `VITE_APPWRITE_POSTS_COLLECTION_ID`
- `VITE_APPWRITE_SAVES_COLLECTION_ID`

---

## 10) Setup Guide

1. Install dependencies
   - `npm install`
2. Create `.env` with variables listed above
3. Start development
   - `npm run dev`
4. Build production
   - `npm run build`
5. Preview production build
   - `npm run preview`

---

## 11) Documentation Notes

This documentation intentionally reflects the **current code state**, including partial/stubbed screens and commented layout sections, so it can be used both as onboarding material and as a technical backlog reference.
