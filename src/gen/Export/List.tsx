import React from 'react'

import { useAppSelector } from '../../app/hooks'

import USER_LIST_QUERY from './graphql/all.gql'
export { USER_LIST_QUERY }
import DELETE_MUTATION from './graphql/delete.gql'
export { DELETE_MUTATION }
export const ADMIN_LIST_QUERY = USER_LIST_QUERY

export const FIELDS = [
  { name: 'name', title: 'Name' },
  { name: 'type', title: 'Type' },
  { name: 'template', title: 'Template' },
  { name: 'query', title: 'Query' },
]

export type ExportListType = {
  adminMode?: boolean
  name?: string
  fields?: any
  allQuery?: any
  adminQuery?: any
  deleteMutation?: any
}

export const ExportList: React.FC<ExportListType> = ({ adminMode = false, name, fields, allQuery, adminQuery, deleteMutation }) => {
  return <></>
}

export default ExportList
