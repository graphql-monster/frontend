import React, { useEffect, useMemo, useState } from 'react'
import FilteredList from '../../components/List1/FilteredList'
import gql from 'graphql-tag'
import { useHistory, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { selectUser } from '../../app/reducers/userSlice'
import { Link } from 'react-router-dom'
import { Button, Tab, Table, Tabs } from 'react-bootstrap'
import { SelectCallback } from 'react-bootstrap/esm/helpers'
import axios from 'axios'
import { map } from 'lodash'

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

async function clientGQL(clientUrl: string, query: string, variables: any = {}, headers: any = {}) {
  headers['Content-Type'] = 'application/json'

  return await axios.post(
    clientUrl,
    {
      query,
      variables,
    },
    {
      headers,
    },
  )
}

export const ProjectFilesList: React.FC<{ userId?: string; adminMode?: boolean }> = ({ userId, adminMode = false }) => {
  const [fileList, setFileList] = useState([])
  const user = useSelector(selectUser) || { id: null, token: '' }
  const history = useHistory()
  const params = useParams() as any
  const URL = useMemo(() => `${process.env.REACT_APP_HOST}/client/${user.id}/project/${params?.projectId}`, [user.id, params?.projectId])

  const loadFilesFromClient = async () => {
    const localFiles = await clientGQL(
      `${URL}/graphql`,
      `
    query{ allFile{id, name, type, size, publicKey, user{id}}
  }`,
      {},
      {
        Authorization: `Bearer ${localStorage.getItem('user.token')}`,
        xuser: user.id,
        xproject: params?.projectId,
      } as any,
    )

    setFileList(localFiles?.data?.data?.allFile)
  }

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const files = event.currentTarget?.files || []
    const file = files[0]

    const data = new FormData()
    data.append('file', file)
    new Promise(async (resolve, reject) => {
      const event = await axios.post(`${URL}/upload`, data, {
        // authorization: Bearer
        headers: {
          Authorization: `Bearer ${user.token}`,
          xuser: user.id,
          xproject: params?.projectId,
        },
      })
      console.log(event)
      loadFilesFromClient()
      resolve(event)
      // receive two    parameter endpoint url ,form data
    })

    // history.push(`/user/projects/${params.projectId}/exports/create`)
  }

  if (!user) return <></>

  useEffect(() => {
    if (URL && user.token) loadFilesFromClient()
  }, [URL, user.token])

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
            <ListFiles fileList={fileList} />
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

function ListFiles({ fileList }: any) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Type</th>
          <th>Size</th>
          <th>Public Key</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {fileList.map((file: any) => (
          <tr>
            <td className="id">{file.id}</td>
            <td>{file.name}</td>
            <td>{file.type}</td>
            <td>{file.size}</td>
            <td>
              {' '}
              <form>
                <div className="input-group">
                  <input type="text" className="form-control" value={file.publicKey} placeholder="Project connect link" id="copy-input" />
                  <div className="input-group-append">
                    <Button
                      className="btn btn-default"
                      onClick={() => {
                        navigator.clipboard.writeText(file.publicKey)
                      }}
                      title="Copy to clipboard"
                    >
                      Copy
                    </Button>
                    <Button
                      className="btn btn-default"
                      onClick={() => {
                        navigator.clipboard.writeText(file.publicKey)
                      }}
                      title="Download"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ProjectFilesList
