# Next.js App

Productivity app for managing your tasks.

## Project Overview

this project uses `yarn` as package manager

## Available Scripts

In the project directory, you can run:

```bash
yarn - installs dependencies.
yarn dev - runs the app in the development mode.
yarn build - builds the app for production to the .next folder.
yarn start - starts the production server.
yarn lint - runs eslint.
yarn lint:fix - runs eslint with fix.
yarn test - runs jest.
yarn test:ci - runs jest in ci mode.
yarn generate-schema - generates prisma schema.
yarn storybook - runs storybook.
yarn build-storybook - builds storybook.
yarn cypress:open - runs cypress in interactive mode.
yarn cypress:run - runs cypress in headless mode.
```

## Getting Started

### Add environment variables to `.env`:

```dotenv
DATABASE_URL - link to your database
JWT_SECRET - secret key for JWT
COOKIE_NAME - name of how token will be stored in cookie
```

```bash
First, run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed
on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited
in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated
as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
