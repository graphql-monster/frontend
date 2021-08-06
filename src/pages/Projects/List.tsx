import React, { useState, useEffect } from 'react'
import FilteredList from '../../components/List1/FilteredList'
import gql from 'graphql-tag'
import { Link, useHistory } from 'react-router-dom'
import ProjectCards from './ProjectCards'
import { Button } from 'react-bootstrap'
import { useMutation, useQuery } from '@apollo/client'
import { selectUser } from '../../app/reducers/userSlice'
import { useSelector } from 'react-redux'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import ReactGA from 'react-ga';

export const USER_LIST_QUERY = gql`
  query allProjects1($filter: ProjectFilter) {
    allProject(filter: $filter) {
      id
      name
      models
      modelsInfo
      user {
        id
        email
      }
    }
  }
`

const ADMIN_LIST_QUERY = gql`
  query allProjects($filter: ProjectFilter) {
    allProject(filter: $filter) {
      id
      name
      models
      user {
        id
        email
      }
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deleteProject($id: ID!) {
    removeProject(id: $id) {
      id
    }
  }
`

const GraphiqlLink: React.FC<{ value: any; names?: any; item: any }> = ({ value, names, item }) => {
  return <Link to={`/user/projects/${item.id}/graphiql`}>playground</Link>
}

export const ProjectList: React.FC<{ adminMode?: boolean }> = ({ adminMode = false }) => {
  const history = useHistory()
  const [data, setData] = useState<any[]>()
  const user = useSelector(selectUser) || { id: null }

  const [projectForRemove, setProjectForRemove] = useState<any>(null)

  const onHideDidaloDelete = () => {
    setProjectForRemove(null)
  }

  const onRemove = (project: any) => {
    ReactGA.event({
      category: 'Project',
      action: 'On remove'
    });
    setProjectForRemove(project)
  }

  const doRemove = async () => {
    ReactGA.event({
      category: 'Project',
      action: 'Do remove'
    });
    setProjectForRemove(null)
    await removeMutation({ variables: { id: projectForRemove.id } })
  }

  const { refetch, loading: userLoading } = useQuery(USER_LIST_QUERY, {
    onError: (e) => {
      console.log('onError >>> ', e.message)
      if (e.message == 'GraphQL error: Unauhorized') {
        // setUnauthorized(true)
      } else {
        // setError(e)
      }
    },
    onCompleted: (d) => {
      console.log('user: onCompleted', d)
      //setLoading(false)

      const dataFields = Object.getOwnPropertyNames(d)
      if (dataFields.length > 0 && d[dataFields[0]].length > 0) {
        setData(d[dataFields[0]])
      } else {
        setData([])
      }
    },
    variables: {
      filter: {
        user_every: { id: user.id },
      },
    },
  })

  const [removeMutation] = useMutation(DELETE_MUTATION, {
    errorPolicy: 'none',
    update: (cache, { data }) => {
      const removeProject = data.removeProject

      if (removeProject) {
        const cacheRead = cache.readQuery({
          query: USER_LIST_QUERY,
          variables: {
            filter: { user_every: { id: user.id } },
          },
        }) as any

        cache.writeQuery({
          query: USER_LIST_QUERY,
          variables: {
            filter: { user_every: { id: user.id } },
          },
          data: {
            allProject: cacheRead.allProject.filter((project: any) => project.id !== removeProject.id),
          },
        })
        refetch()
        console.log(data)
      }
    },
  })

  const onCreateNew = () => {
    ReactGA.event({
      category: 'Project',
      action: 'Create'
    });
    history.push('/user/projects/create')
  }

  return (
    <>
      <div className="center-y relative " data-scroll-speed="4">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="col-md-12 ">
                <ProjectCards projects={data} onRemove={onRemove} />
                <Button onClick={onCreateNew}>Create New Project</Button>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal show={!!projectForRemove} onHide={onHideDidaloDelete} onDelete={doRemove} category={'project'} deleteObject={projectForRemove} />
    </>
  )
}

export const ProjectAdminList: React.FC<{ adminMode?: boolean }> = () => {
  const userId = localStorage.getItem('user.id') || ''
  return (
    <>
      <div className="center-y relative text-center" data-scroll-speed="4">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="col-md-12 text-center">
                {
                  <FilteredList
                    name={'Projects'}
                    fields={['name', { name: 'id', title: 'playground', component: GraphiqlLink }]}
                    userId={userId}
                    adminMode={true}
                    queries={{ USER_LIST_QUERY, ADMIN_LIST_QUERY, DELETE_MUTATION }}
                  />
                }
              </div>

              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectList
