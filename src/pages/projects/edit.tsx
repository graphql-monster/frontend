import React, { useState, useEffect, useCallback } from "react";
import * as _ from 'lodash'
import gql from "graphql-tag";
import { loader } from 'graphql.macro';

import BaseEdit from "../../components/EditorEx/Edit"
import { Form, Tab, Tabs } from "react-bootstrap";
import { TControl, TField } from "../../components/EditorEx/Control";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { USER_LIST_QUERY } from "./List";
import { useHistory } from "react-router";

const CREATE_MUTATION = loader('./graphql/create.gql')
const UPDATE_MUTATION = loader('./graphql/update.gql')
const QUERY = loader('./graphql/query.gql');

const ProjectSchemaControl:React.FC<TControl> = ({onChange, value}) => (
  <React.Fragment>
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
    </React.Fragment>
)

const TextEditControl:React.FC<TControl> = ({onChange, value, placeholder}) => (
  <React.Fragment>
    <Form.Control as="textarea" rows={3} {...{onChange, value}} placeholder={placeholder} />
  </React.Fragment>
)

const ProjectErrorControl:React.FC<TControl> = ({onChange, value}) => (
  <>
  {value ? <div className="alert alert-danger" role="alert">{value}</div> : ('all good')}
  </>
)

const SchemaTab = [ 
  {label: 'Service name (SERVICE_NAME)', name: 'name', placeholder: 'your-service-name'},
  {name:'models', label: 'Schema',control: ProjectSchemaControl}
]

const EmailTab:TField[] = [
  // {label: 'Service name (same as project name)', name: 'name', placeholder: 'service name'},
  {label: 'Service url (SERVICE_URL)', name: 'domain', placeholder: 'http(s)://your-service.domain'},
  {label: 'Email from', name: 'email', placeholder: 'info@your-service.domain'},
  {label: 'Welcome Email Title', name: 'emailWelcomeTitle', placeholder: 'Wellcome in {{SERVICE_NAME}}'},
  {label: 'Welcome Email Message', name: 'emailWelcomeMessage', control: TextEditControl, placeholder: 'Please verify your email by click to this <a href="{{SERVICE_URL}}/email/${user.__verifyToken}/verify">{{SERVICE_URL}}/email/${user.__verifyToken}/verify</a>'},
  {label: 'Reset Password Email Title', name: 'emailForgottenPasswordTitle', placeholder: 'Change password request for {{SERVICE_NAME}}'},
  {label: 'Reset Password Email Message', name: 'emailForgottenPasswordMessage', control: TextEditControl, placeholder: 'We recaive request about reset Your password. If is not your action, please ignore this message. If you want reset your password follow instruction on this link <a href="{{SERVICE_URL}}/forgotten-password/${user.__resetPasswordToken}">{{SERVICE_URL}}/forgotten-password/${user.__resetPasswordToken}</a>'}
]

const LoginTab = [
  {label: 'Facebook:ID', name: 'loginFacebookId'},
  {label: 'Facebook:SECRET', name: 'loginFacebookSecret'},
  {label: 'Facebook:CallbackURL', name: 'loginFacebookCallbackURL'},
  
  {label: 'Github:Id', name: 'loginGithubId'},
  {label: 'Github:Secret', name: 'loginGithubSecret'},
  {label: 'Github:CallbackURL', name: 'loginGithubCallbackURL'},

  {label: 'Gmail:ID', name: 'loginGmailId'},
  {label: 'Gmail:Secret', name: 'loginGmailSecret'},
  {label: 'Gmail:CallbackURL', name: 'loginGmailCallbackURL'},
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
    <div className="row-table container">
     
      <> {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}</>
      <BaseEdit 
          id={projectId} 
          name={'Project'}
          fields={{'Schema':SchemaTab, 'Email':EmailTab, 'Auth':LoginTab}}
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
