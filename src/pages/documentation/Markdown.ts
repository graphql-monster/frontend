export default `
Types are similar of types in graphql <a href="https://graphql.org/learn/schema/">https://graphql.org/learn/schema/</a>

# Simple Model

\`\`\`
type Todo @model {
    name: String!
    done: Boolean!
}
\`\`\`

 __Todo__ is a GraphQL Object Type, meaning it's a type with some fields. For ProtectQL meaning is a model.
__name__ and __done__ are fields on the Character type. That means that name and done are the only fields that can appear in any part of a GraphQL query that operates on the Todo model/type.

 __String__ is one of the built-in scalar types - these are types that resolve to a single scalar object, and can't have sub-selections in the query. We'll go over scalar types more later.

String! means that the field is non-nullable, meaning that the GraphQL service promises to always give you a value when you query this field. In the type language, we'll represent those with an exclamation mark.

# Scalar types


`