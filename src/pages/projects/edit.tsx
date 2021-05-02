import React, { useState, useEffect, useCallback } from "react";
import * as _ from 'lodash'
import gql from "graphql-tag";
import { loader } from 'graphql.macro';

import BaseEdit from "../../components/editor/edit"
import { Form, Tab, Tabs } from "react-bootstrap";
import { TControl, TField } from "../../components/editor/control";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { USER_LIST_QUERY } from "./list";
import { useHistory } from "react-router";

const CREATE_MUTATION = loader('./graphql/create.gql')
const UPDATE_MUTATION = loader('./graphql/update.gql')
const QUERY = loader('./graphql/query.gql');

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

const SchemaTab = ['name','domain',
{
  name:'models',
  label: 'Schema',
  control: ProjectSchemaControl
}]

const EmailTab:TField[] = [
  {label: 'Email from', name: 'email', placeholder: 'info@your-service.domain'},
  {label: 'Welcome Email Title', name: 'emailWelcomeTitle', placeholder: 'info@your-service.domain'},
  {label: 'Welcome Email Message', name: 'emailWelcomeMessage', placeholder: 'info@your-service.domain'},
  {label: 'Reset Password Email Title', name: 'emailForgottenPasswordTitle', placeholder: 'info@your-service.domain'},
  {label: 'Reset Password Email Message', name: 'emailForgottenPasswordMessage', placeholder: 'info@your-service.domain'}
]

const LoginTab = [
  'emailToken',
  'emailToken'
]

export const ProjectEdit = (data:any) => {
  const userId = localStorage.getItem('user.id')
  const projectId = _.get(data, 'match.params.projectId')
  const [key, setKey] = useState<string>('home');

  const [error, setError] = useState('')
  const history = useHistory()

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

  const renameError = (error: string) => {
    const dupkeyRegEx = /index: name_1_user_1 dup key: { name: "(.*?)"/
   
    const dupkeyMatch = error.match(dupkeyRegEx)
    if(dupkeyMatch){
      return `Field project name have to be unique, you want '${dupkeyMatch[1]}' what is already in your project list`
    }

    const pathNameRegEx = /validation failed: name: Path `name` is required./
    const pathNameMatch = error.match(pathNameRegEx)
    if(pathNameMatch){
      return `Field project name can't be empty`
    }

    return error;
  }

  const onCompleted = () => {
    history.push('/user/projects')
  }


  return (
    <div>
     
      <> {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}</>
      <BaseEdit 
          id={projectId} 
          name={'Project'}
          fields={{'Schema':SchemaTab, 'Email':EmailTab, 'Login':LoginTab}}
          query={{
              CREATE_MUTATION,
              UPDATE_MUTATION,
              QUERY
          }}
          updateCache={updateCache}
          renameError={renameError}
          onCompleted={onCompleted}
        />
    
    </div>
  );
};
