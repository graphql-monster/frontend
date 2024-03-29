import React, { useState, useEffect, useCallback } from "react";

import { BaseForm, TBaseForm } from "./Form";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { DEFAULT_SCHEMA } from "../../pages/Projects/defaultSchema";
import * as _ from 'lodash'
import { Alert, Button } from 'react-bootstrap'
import Unauthorized from '../Unauthorized/Unauthorized'
import Loading from '../Loading/Loading'
import { TField, TControlField } from "./Control";
import EditTabs from "./Tabs";

export const getDataFromRaw = (rawData: any) => {
  const rawName = Object.keys(rawData)[0]
  return rawData[rawName]
}

export type TBaseEditUpdateCacheFn = (cache: any, data: any) => void
export type TBaseEdiRenameErrorFn = (error: string) => string
export type TBaseEdiOnCompletedFn = (data: any) => void

export type TTabFields = {[key:string]: TBaseForm['fields']}

export type TBaseEdit = {
  id: string
  name: string
  query: any
  fields: TBaseForm['fields'] | TTabFields
  onUpdated? : (data:any) => void
  updateCache?: TBaseEditUpdateCacheFn
  renameError?: TBaseEdiRenameErrorFn
  onCompleted?: TBaseEdiOnCompletedFn
}

export const BaseEdit:React.FC<TBaseEdit> = ({id: externId, query, name, fields, onUpdated, updateCache, renameError, onCompleted}) => {
  const [localId, setLocalId] = useState(externId);
  const [unauthorized, setUnauthorized] = useState(false);
  const [errors, setErrors] = useState<string[]|null>([])

  // if the fields is not ust simle array
  // we consider is it a object defined tabs 
  const haveTabs = Object.keys(fields).some((k)=>isNaN(+k))

  const [model, setModel] = useState({
    name: "Project A",
    models: DEFAULT_SCHEMA
  });

  const handleError = (incommingError:{message: string}) => {
    let incomingErrors = incommingError.message.split('\n')
    if(renameError) {
      incomingErrors = incomingErrors.map(error=>renameError(error))
    }
    setErrors(incomingErrors)
  }

  const updateDataFromLoaded = (loadedDataRaw: any) => {
    if(!loadedDataRaw){
      return
    }
    
    const loadedData = getDataFromRaw(loadedDataRaw)

    if(loadedData){
      // const np = fields.reduce((o:any, field: TField)=> {
      //   const fieldName = (field as TControlField).name ? (field as TControlField).name : field as string
      //   o[fieldName] = loadedData[fieldName]
      //   return o
      // }, {})

      setModel({...loadedData})
    } else {
      setUnauthorized(true)
    }

    if(onUpdated) onUpdated(loadedData)
  }

  const skipLoading = !externId
  const { loading, error } = useQuery(query.QUERY, {
    variables: {id: externId},
    skip: skipLoading,
    onCompleted: (loadedDataRaw: any) =>{
      console.log('loadedDataRaw', loadedDataRaw, skipLoading)
      updateDataFromLoaded(loadedDataRaw)
      
    }, onError: (e) => {
      console.log('onError >>> ', e.message)
      if(e.message == 'GraphQL error: Unauhorized'){
        setUnauthorized(true)
      }
      setModel({name:'', models: ''})
      
    }
  });

  const [
    createProjectMutation,
    { loading: createLoading, data: createData, error: createError }
  ] = useMutation(query.CREATE_MUTATION, {
    errorPolicy: "none",
    onCompleted: (raw: any) => {
      const data = getDataFromRaw(raw)
      setLocalId(data.id);

      setErrors(null)

      if(onCompleted) onCompleted(raw)
      if(onUpdated) onUpdated(raw)
      // updateDataFromLoaded(raw)
    },
    update: updateCache,
    onError: handleError
  });

  const [updateProjectMutation, { loading:updateLoading, data: updateData, error:updateError }] = useMutation(
    query.UPDATE_MUTATION,
    {
      errorPolicy: "none",
      onCompleted: (data: any) => { 
        
        const raw =  getDataFromRaw(data)
        console.log("UPDATED", data, raw);
        setLocalId(raw.id);

        setErrors(null)

        if(onCompleted) onCompleted(raw)
        if(onUpdated) onUpdated(raw)
        // updateDataFromLoaded(raw)
      },
      update: updateCache,
      onError: handleError
    }
  );

  const onUpdate = useCallback(() => {
    console.log('onUpdate >>> ', localId, model)
    if(localId){
        updateProjectMutation({
            variables: {
              id:localId,
              ...model
            }
          });
    } else {
        createProjectMutation({
            variables: {
              userId: localStorage.getItem("user.id"),
              ...model
            }
          });
    }
    
  }, [localId, model]);

  if(unauthorized) {
    return (<Unauthorized where={`${name} edit`} />)
  }

  if(loading) {
    return (<Loading what={name}/>)
  }

  return (
    <div style={{margin:'15px'}}>
      {externId ? <h3>{name} Edit ({externId}) <Button onClick={onUpdate}>{externId ? 'Update' : 'Create'}</Button></h3> : <h3>{name} create <Button onClick={onUpdate}>{externId ? 'Update' : 'Create'}</Button></h3>}
      {error && <Alert variant={'danger'}>`${error.message}`</Alert>}
      {errors && errors.length > 0 && errors.map((e)=>(<Alert variant={'danger'}>{e}</Alert>))}
      {haveTabs ? <EditTabs fields={fields as TTabFields} model={model} doUpdate={onUpdate} edit={Boolean(localId)} /> : <BaseForm model={model} doUpdate={onUpdate} edit={Boolean(localId)} fields={fields as TField[]} />}
    </div>
  );
};

export default BaseEdit

