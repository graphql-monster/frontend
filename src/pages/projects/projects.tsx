import React, { useState, useEffect } from "react";
import FilteredList from "../../components/list/filtered-list";
import gql from 'graphql-tag';
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useUserState } from "../../contexts/userContext";
import ProjectCards from "./ProjectCards";

const USER_LIST_QUERY = gql`
  query allProjects($filter: ProjectFilter){ allProjects(filter: $filter) {
    _port
      id
      name,
      models, 
      user{
        id
      }
    }}
`;



const DELETE_MUTATION = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const GraphiqlLink: React.FC<{value:any, names?:any, item:any}> = ({value,names, item}) => {
  return <Link to={`/user/projects/${item.id}/graphiql`}>playground</Link>
}

export const Projects: React.FC<{ adminMode?: boolean}> = ({adminMode=false}) => {
    const userId = (!adminMode && localStorage.getItem('user.id')) || ''
    const history = useHistory()
    const [data, setData] = useState<any[]>()
    const user = useUserState()

    const { refetch: userRefetch, loading: userLoading } = useQuery(USER_LIST_QUERY, {
      onError: (e) => {
        console.log('onError >>> ', e.message)
        if(e.message == 'GraphQL error: Unauhorized'){
          // setUnauthorized(true)
        } else {
          // setError(e)
        }
      }, onCompleted: (d) => {
        console.log('user: onCompleted', d)
        //setLoading(false)
  
        const dataFields = Object.getOwnPropertyNames(d)
        if(dataFields.length > 0 && d[dataFields[0]].length > 0){
          setData(d[dataFields[0]])
        } else {
          setData([])
        }
        
      },
      variables: {filter:{
        user_every:{id: user.id}
      }}
    });

    const onCreateNew = () => {
      history.push('/user/projects/create' )
    }

    return (
      <>
 
            <div className="center-y relative " data-scroll-speed="4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                                <div className="col-md-12 ">
                                  
                                  <ProjectCards projects={data} />
                                  <Button onClick={onCreateNew}>Create New Project</Button>
                                </div>
                                <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
       </>
    )
}

export default Projects