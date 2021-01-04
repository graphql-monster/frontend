import React, { useState, useEffect } from "react";
import FilteredList from "../../components/list/filtered-list";
import gql from 'graphql-tag';
import { Link } from "react-router-dom";

const USER_LIST_QUERY = gql`
  query allSubscribes($filter: SubscribeFilter){ allSubscribes(filter: $filter) {
    id,
    email,
    message
    }}
`;

const ADMIN_LIST_QUERY = gql`
  query allSubscribes($filter: SubscribeFilter){ allSubscribes(filter: $filter) {
    id,
    email,
    message
    }}
`;

const DELETE_MUTATION = gql`
  mutation deleteSubsribe($id: ID!) {
    deleteSubscribe(id: $id) {
      id
    }
  }
`;

const GraphiqlLink: React.FC<{value:any, names?:any, item:any}> = ({value,names, item}) => {
  return <Link to={`/user/projects/${item.id}/graphiql`}>playground</Link>
}

export const SubscibesListPage: React.FC<{userId?: string, adminMode?: boolean}> = ({userId, adminMode=false}) => {
    return (
      <>
 
            <div className="center-y relative text-center" data-scroll-speed="4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                                <div className="col-md-12 text-center">
                                    
            <FilteredList 
                name={'Subsribe'}
                fields={[
                  'email',
                  'message']}
                userId={userId} 
                adminMode={adminMode}
                queries={{USER_LIST_QUERY, ADMIN_LIST_QUERY, DELETE_MUTATION}} 
                />
        </div>
                  
                                <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
       </>
    )
}

export default SubscibesListPage