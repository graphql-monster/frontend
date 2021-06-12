import React from 'react'
import FilteredList from '../../components/List1/FilteredList'
import gql from 'graphql-tag'
import { useHistory, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { selectUser } from '../../app/reducers/userSlice'
import { Link } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'
import { SelectCallback } from 'react-bootstrap/esm/helpers'
import axios from 'axios'

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

export const ProjectFilesList: React.FC<{ userId?: string; adminMode?: boolean }> = ({ userId, adminMode = false }) => {
  const user = useSelector(selectUser) || { id: null, token: '' }
  const history = useHistory()
  const params = useParams() as any

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const files = event.currentTarget?.files || []
    const file = files[0]

    const data = new FormData()
    data.append('file', file)
    new Promise(async (resolve, reject) => {
      const event = await axios.post(`${process.env.REACT_APP_HOST}/client/${user.id}/project/${params?.projectId}/upload`, data, {
        // authorization: Bearer
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      console.log(event)
      resolve(event)
      // receive two    parameter endpoint url ,form data
    })

    // history.push(`/user/projects/${params.projectId}/exports/create`)
  }

  if (!user) return <></>

  const onTabSelect: SelectCallback = (tabKey) => {
    if (tabKey !== 'exports') {
      history.replace(`/user/projects/${params.projectId}`)
      // history
    }
    if (tabKey === 'exports') {
      history.replace(`/user/projects/${params.projectId}/exports`)
      // history
    }
  }

  return (
    <div className="base-edit">
      <Tabs className="base-edit-tabs" activeKey={'files'} onSelect={onTabSelect}>
        <Tab eventKey={'main'} title={'Main'}></Tab>
        <Tab eventKey={'email'} title={'Emails'}></Tab>
        <Tab eventKey={'login'} title={'Logins'}></Tab>
        <Tab eventKey={'exports'} title={'Exports'}></Tab>
        <Tab eventKey={'files'} title={'Files'}>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
            <label className="custom-file-label">Choose file</label>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default ProjectFilesList
