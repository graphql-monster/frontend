import React, { useState, useEffect } from 'react'
import FilteredList from '../../components/List1/FilteredList'
import gql from 'graphql-tag'

const USER_LIST_QUERY = gql`
  query allUser($filter: UserFilter) {
    allUsers(filter: $filter) {
      id
      name
      models
    }
  }
`

const ADMIN_LIST_QUERY = gql`
  query allUserRole($filter: UserRoleFilter) {
    allUserRole(filter: $filter) {
      id
      name
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deleteUserRole($id: ID!) {
    deleteUserRole(id: $id) {
      id
    }
  }
`

export const UserRoleList: React.FC<{ userId?: string; adminMode?: boolean }> = ({ userId, adminMode = false }) => {
  return (
    <div>
      <FilteredList name={'Roles'} fields={['role']} userId={userId} adminMode={adminMode} queries={{ USER_LIST_QUERY, ADMIN_LIST_QUERY, DELETE_MUTATION }} />
    </div>
  )
}

export default UserRoleList
