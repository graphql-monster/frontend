import React from 'react'
import FilteredList from '../../components/List/FilteredList'
import gql from 'graphql-tag'
import { useHistory, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { selectUser } from '../../app/reducers/userSlice'
import { Link } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'
import { SelectCallback } from 'react-bootstrap/esm/helpers'

const USER_LIST_QUERY = gql`
  query allExport($filter: ExportFilter) {
    allExport(filter: $filter) {
      id
      type
      name
    }
  }
`

const ADMIN_LIST_QUERY = gql`
  query allExport($filter: ExportFilter) {
    allExport(filter: $filter) {
      id
      type
      name
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deleteExport($id: ID!) {
    deleteExport(id: $id) {
      id
    }
  }
`

export const UserList: React.FC<{ userId?: string; adminMode?: boolean }> = ({ userId, adminMode = false }) => {
  const user = useSelector(selectUser)
  const history = useHistory()
  const params = useParams() as any

  const onCreate = () => {
    history.push(`/user/projects/${params.projectId}/exports/create`)
  }

  const getEditLink = (item: any) => `/user/projects/${params.projectId}/exports/${item.id}`

  if (!user) return <></>

  const onTabSelect: SelectCallback = (tabKey) => {
    if (tabKey !== 'exports') {
      history.replace(`/user/projects/${params.projectId}`)
      // history
    }
  }

  return (
    <div className="base-edit">
      <Tabs className="base-edit-tabs" activeKey={'exports'} onSelect={onTabSelect}>
        <Tab eventKey={'main'} title={'Main'}></Tab>
        <Tab eventKey={'email'} title={'Emails'}></Tab>
        <Tab eventKey={'login'} title={'Logins'}></Tab>
        <Tab eventKey={'exports'} title={'Exports'}>
          <FilteredList
            name={'Exports'}
            fields={['id', 'name', 'type']}
            userId={user.id}
            adminMode={adminMode}
            queries={{ USER_LIST_QUERY, ADMIN_LIST_QUERY, DELETE_MUTATION }}
            filter={{ project_every: { id: params.projectId } }}
            onCreate={onCreate}
            // onEdit={onEdit}
            getEditLink={getEditLink}
          />
        </Tab>
      </Tabs>
    </div>
  )
}

export default UserList
