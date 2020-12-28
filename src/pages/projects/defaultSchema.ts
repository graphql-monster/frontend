export const DEFAULT_SCHEMA = `

####################################
# start type your models here
#

type Todo @model {
    id: ID! @isUnique
    name: String!
}

#####################################
# DEFAULT MODELS
#####################################
type File @model {
    contentType: String!
    createdAt: DateTime!
    id: ID! @isUnique
    name: String!
    secret: String! @isUnique
    size: Int!
    updatedAt: DateTime!
    url: String! @isUnique
}

@create("public") 
type User @model {
    createdAt: DateTime!
    id: ID! @isUnique
    updatedAt: DateTime!
    email: String @isUnique
    password: String
    token: String
    refreshToken: String
    roles: [UserRole] @relation(name: "RoleOnUser")
}

type UserRole @model {
    id: ID! @isUnique
    role: String @isUnique
    users: [User] @relation(name: "RoleOnUser")
}
`