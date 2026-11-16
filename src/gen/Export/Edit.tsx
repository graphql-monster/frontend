import React from "react";
import { useParams } from "react-router-dom";
import BaseEdit from "../../components/EditorEx/Edit";


import CREATE_MUTATION from './graphql/create.gql'
import UPDATE_MUTATION from './graphql/update.gql'
import ONE_QUERY from './graphql/one.gql'
import ALL_QUERY from './graphql/all.gql'

export { CREATE_MUTATION, UPDATE_MUTATION, ONE_QUERY, ALL_QUERY }

export const FIELDS = [
	{name: 'name', label:'Name', required: true},
	{name: 'type', label:'Type', required: true},
	{name: 'template', label:'Template', required: true},
	{name: 'query', label:'Query', required: true}
]

export type ExportEditType = {
    name?: string, 
    fields?: any
    createMutation?: any,
    updateMutation?: any,
    oneQuery?: any
  }

export const ExportEdit:(obj:ExportEditType)=>any = ({name, fields, createMutation, updateMutation, oneQuery }) => {
  const params = useParams() as any;
  
  const id = params.id !== 'create' &&  params.id

  const updateCache:(cache: any, data: any)=>void = (cache, {data}) => {
    const userId = localStorage.getItem('user.id')
    const mutated = data.mutated
    
    if(userId && mutated){
      const cacheRead = cache.readQuery({
        query: ALL_QUERY,
        variables: {
          filter: createDefaultFilter(userId)
        },
      });

      cache.writeQuery({
        query: ALL_QUERY,
        variables: {
          filter: createDefaultFilter(userId)
        },
        data: {
          all: [
            ...cacheRead.all, mutated
          ]
        }
      });
    }
  }
  
  return (<div className={`base-edit-Export base-edit`}>
      <BaseEdit 
        id={id} 
        name={name || 'Exports'}
        fields={fields || FIELDS}
        query={{
            CREATE_MUTATION: createMutation || CREATE_MUTATION,
            UPDATE_MUTATION: updateMutation || UPDATE_MUTATION,
            QUERY: oneQuery || ONE_QUERY
        }}
        updateCache={updateCache}
      />
      </div>
  );
};

export default ExportEdit

function createDefaultFilter(userId: string) {
  throw new Error("Function not implemented.");
}
