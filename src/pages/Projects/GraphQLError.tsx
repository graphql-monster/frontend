import * as React from 'react'
import { Alert } from 'react-bootstrap'

export const GraphQLError = ({graphQLError}:any) =>{
    return (<>
        {graphQLError.map((gqe:string)=>(<Alert variant={'danger'}>{gqe}</Alert>))}
        </>
)}