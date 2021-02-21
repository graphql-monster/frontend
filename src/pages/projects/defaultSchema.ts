export const DEFAULT_SCHEMA = `

####################################
# start type your models here
#

type Todo @model {
    id: ID! @isUnique
    name: String!
}

`