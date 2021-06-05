import React from "react";
import { loader } from "graphql.macro";

import { useSelector } from "react-redux";



export const USER_LIST_QUERY = loader('./graphql/all.gql')
export const DELETE_MUTATION = loader('./graphql/delete.gql')
export const ADMIN_LIST_QUERY = USER_LIST_QUERY

export const FIELDS = [{name: 'name', title:'Name'},
{name: 'type', title:'Type'},
{name: 'template', title:'Template'},
{name: 'query', title:'Query'}]


export type ExportListType = {
  adminMode?: boolean, 
  name?: string, 
  fields?: any
  allQuery?: any,
  adminQuery?: any,
  deleteMutation?: any
}

export const ExportList: React.FC<ExportListType> = ({adminMode=false, name, fields, allQuery, adminQuery, deleteMutation}) => {
  return <></>
}

export default ExportList