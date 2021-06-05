import React from "react";
import FilteredList from "../../components/list/filtered-list";
import gql from 'graphql-tag';
import { useUserState } from "../../contexts/userContext";
import { useHistory, useParams } from "react-router";

const USER_LIST_QUERY = gql`
  query allExport($filter: ExportFilter){ allExport(filter: $filter) {
      id,
      type
    }}
`;

const ADMIN_LIST_QUERY = gql`
  query allExport($filter: ExportFilter){ allExport(filter: $filter) {
      id,
      type
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteExport($id: ID!) {
    deleteExport(id: $id) {
      id
    }
  }
`;


export const UserList: React.FC<{userId?: string, adminMode?: boolean}> = ({userId, adminMode=false}) => {
  const user = useUserState()
  const history = useHistory()
  const params = useParams() as any

  const onCreate = () => {
    history.push(`/user/projects/${params.projectId}/exports/create`)
  }

  const onEdit = (item: any) => {
    history.push(`/user/projects/${params.projectId}/exports/${item.id}`)
  }

    return (
        <div>
            <FilteredList 
                name={'Exports'}
                fields={['id']}
                userId={user.id} 
                adminMode={adminMode}
                queries={{USER_LIST_QUERY, ADMIN_LIST_QUERY, DELETE_MUTATION}}
                filter={{project_every: {id: params.projectId}}} 
                onCreate={onCreate}
                onEdit={onEdit}
                />
        </div>
    )
}

export default UserList