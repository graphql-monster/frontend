import React, { Children, useCallback, useEffect, useState } from "react";
import { loader } from 'graphql.macro';
import { useParams } from "react-router-dom";
import * as _ from 'lodash'
import { CREATE_MUTATION, FIELDS as GEN_FIELDS, ExportEditType, ONE_QUERY, UPDATE_MUTATION } from "../../gen/Export/Edit";
import StoreItem from "./StoreItem";
import BaseEditor from "./BaseEditor";
import Control from "./Control";
import { Button, Form, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import HiddenItem from "./HiddenItem"
import AceEditor from "react-ace"
import AceControl from "./AceControl";

export const ExportForm = ({onSubmit, storedData, graphQlError, projectId}:any) => {
  
  const reactForm = useForm()
  const { register, handleSubmit, formState, setValue, getValues } = reactForm;

  const formDataQuery = getValues('query')
  const template = getValues('template')

  const processSubmit = (data:any) => {
    onSubmit(data)
  }

  return (<Form onSubmit={handleSubmit(processSubmit)}>
      <Control name={'name'} label={'name'} required={true} storedData={storedData} {...reactForm} />
      {/* <Control name={'query'} label={'query'} required={true} storedData={storedData} {...reactForm} /> */}
      {/* <Control name={'template'} label={'template'} required={true} storedData={storedData} {...reactForm} /> */}

      <AceControl name={'query'} label={'Query'}  {...reactForm} storedData={storedData} />
      <AceControl name={'template'} label={'Template'} {...reactForm} storedData={storedData} />

      <HiddenItem name={'type'} value={'pdf'} {...reactForm} storedData={storedData} />
      <HiddenItem name={'projectId'} value={projectId} {...reactForm} storedData={storedData} />

      <Button type="submit">Save</Button>
  </Form>)
}

export const ExportEdit:(obj:ExportEditType)=>any = ({name, createMutation, updateMutation, oneQuery }) => {
  let params = useParams() as any;

  const id = params.id !== 'create' &&  params.id

  return (
  <div className={`base-edit-Invoice base-edit`}>
      <BaseEditor 
          externId={id} 
          name={name || 'Invoices'}
          query={{
              CREATE_MUTATION: createMutation || CREATE_MUTATION,
              UPDATE_MUTATION: updateMutation || UPDATE_MUTATION,
              QUERY: oneQuery || ONE_QUERY
          }}
        >{(storedData:any, onSubmit:any, errors:any) => (
          <ExportForm storedData={storedData} onSubmit={onSubmit} graphQlError={errors} projectId={params.projectId} />
        )}
        </BaseEditor>
      </div>
  );
};

export default ExportEdit

