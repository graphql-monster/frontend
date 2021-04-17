import React, { useState, useEffect, useCallback } from "react";
import * as _ from 'lodash'
import gql from "graphql-tag";

import BaseEdit from "../../components/editor/edit"
import { Form } from "react-bootstrap";
import { TControl } from "../../components/editor/control";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { USER_LIST_QUERY } from "./list";

const CREATE_MUTATION = gql`
  mutation createProject($userId: ID!, $name: String!, $models: String!) {
    createProject(userId: $userId, name: $name, models: $models) {
      id
      name
      models,
      _error
    }
  }
`;

const UPDATE_MUTATION = gql`
  mutation updateProject($id: ID!, $name: String!, $models: String!) {
    updateProject(id: $id, name: $name, models: $models) {
      id
      name
      models,
      _error
    }
  }
`;

const QUERY = gql`
  query project($id:ID){ Project(id:$id) {
      id,
      name,
      models,
      _error,
      user{id}
    }}
`;

const ProjectSchemaControl:React.FC<TControl> = ({onChange, value}) => (
  <>
   <AceEditor 
      
      width="1000px"
      value={value}
      onChange={(value)=>{
        console.log(value)
        onChange({target: {value}})
      }}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />`
    {/* <Form.Control as="textarea" rows={30} {...{onChange, value}} /> */}
    </>
)

const ProjectErrorControl:React.FC<TControl> = ({onChange, value}) => (
  <>
  {value ? <div className="alert alert-danger" role="alert">{value}</div> : ('all good')}
  </>
)

export const ProjectEdit = (data:any) => {
  const userId = localStorage.getItem('user.id')
  const projectId = _.get(data, 'match.params.projectId')
  const [error, setError] = useState('')

  const updateCache:(cache: any, data: any)=>void = (cache, {data}) => {
    const createProject = data.createProject
    
    if(createProject){
      const cacheRead = cache.readQuery({
        query: USER_LIST_QUERY,
        variables: {
          filter: {user_every: {id: userId}}
        },
      });

      cache.writeQuery({
        query: USER_LIST_QUERY,
        variables: {
          filter: {user_every: {id: userId}}
        },
        data: {
          allProjects: [
            ...cacheRead.allProjects, createProject
          ]
        }
      });

      console.log(cacheRead)
    }
    
  } 

  return (
    <>
     <> {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}</>
    <BaseEdit 
      id={projectId} 
      name={'Project'}
      fields={['name',
      {
        name:'models',
        label: 'Schema',
        control: ProjectSchemaControl
      }]}
      query={{
          CREATE_MUTATION,
          UPDATE_MUTATION,
          QUERY
      }}
      updateCache={updateCache}
    />
    </>
  );
};
