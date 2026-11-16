/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.gql' {
  import type { DocumentNode } from 'graphql'
  const document: DocumentNode
  export default document
}
