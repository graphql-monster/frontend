# GraphQL Monster frontend

React 18 application built with Vite, TypeScript and Dart Sass.
Use Node.js 24 or newer and Yarn 1. The setup was verified with Node.js 24.11.1.

```sh
yarn install --frozen-lockfile
yarn start
```

The development server runs at http://localhost:3000 with React Fast Refresh.

## Checks and production build

```sh
yarn typecheck
yarn test:run
yarn build
yarn preview
```

`yarn test` runs Vitest in watch mode. Tests use jsdom and Testing Library.
`yarn build` checks TypeScript and writes the production site to `build/`,
preserving the output directory used by the existing deploy scripts.
`yarn preview` serves that production build locally.

## Configuration

The backend URL stays in `REACT_APP_HOST` in `.env` and `.env.production`.
Read it in application code with `import.meta.env.REACT_APP_HOST`.
Vite exposes only variables prefixed with `REACT_APP_` or `VITE_`; all such
variables are public and are embedded at build time. Local overrides can use
`.env.local` or `.env.production.local`.

GraphQL documents use direct `.gql` imports. The GraphQL plugin resolves
`#import` fragment references for both the dev server and production builds.
Bootstrap Sass imports use package paths without Webpack's `~` prefix.

The prebuild step generates documentation from Markdown. When the sibling
`../builder` repository is unavailable, it keeps the generated Login and Schema
documentation committed here.

## Hosting

Deploy the contents of `build/` at the domain root. The server must serve
`index.html` for application routes, such as `/login` and `/user/projects`.
The existing GitHub Pages redirect page and custom domain file remain in
`public/` and are copied to the build.

## Known limitations

Legacy GraphQL Playground, Google Analytics and Markdown dependencies still
report peer dependency warnings. Full browser behavior with the backend needs
manual verification. Registration has an existing nested form warning.
