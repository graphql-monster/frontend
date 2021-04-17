export const DEFAULT_SCHEMA = `

type Todo @model {
    id: ID! @isUnique
    name: String!
}

`