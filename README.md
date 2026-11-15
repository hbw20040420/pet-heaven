# Pet Heaven — React SPA

A frontend-only pet adoption and rescue website built for Assignment 3.

## Live Demo
https://pet-heaven1.vercel.app

## Features
- React single-page application with React Router navigation
- Home, pet directory, About Us, Mission/Purpose, Pet Care, Community and Contact
- Dog/cat directory with search, type and age filters
- Pet detail modal and saved/favourite pets
- Adoption and pet release forms with browser validation
- Login and sign-up demonstration UI
- Community reviews and feedback submission (local React state)
- Pet-care tips accordion and links to educational video searches
- Responsive layout, dark mode and Framer Motion transitions
- Hardcoded sample data; no database or backend

## Run locally
1. Install Node.js (LTS).
2. Extract this project folder.
3. Open a terminal in the project folder.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL shown by Vite (usually http://localhost:5173).

## Build
Run `npm run build`. The production files will be generated in `dist/`.

## Deployment
Import the project into Vercel or Netlify. For a Vite project, use:
- Build command: `npm run build`
- Output directory: `dist`

## Important demo limitations
- Authentication is simulated in the browser only. It does not verify credentials or store accounts.
- Forms and feedback are frontend demonstrations; submissions are not sent to an organisation.
- Contact information and pet profiles are sample content. Replace them with verified institution details before submission.
- Pet photos are loaded from Unsplash and require an internet connection.
