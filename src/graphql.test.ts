import { Kind, visit } from 'graphql'
import project from './pages/Projects/graphql/query.gql'
import createProject from './pages/Projects/graphql/create.gql'
import updateProject from './pages/Projects/graphql/update.gql'
import oneExport from './gen/Export/graphql/one.gql'
import allExports from './gen/Export/graphql/all.gql'
import createExport from './gen/Export/graphql/create.gql'
import updateExport from './gen/Export/graphql/update.gql'

test.each([project, createProject, updateProject, oneExport, allExports, createExport, updateExport])('resolves imported fragments in GraphQL documents', (document) => {
  const fragments = document.definitions.flatMap((definition) => (definition.kind === Kind.FRAGMENT_DEFINITION ? [definition.name.value] : []))
  expect(fragments.length).toBeGreaterThan(0)
  visit(document, {
    FragmentSpread(node) {
      expect(fragments).toContain(node.name.value)
    },
  })
})
