import _ from "lodash"
import React from "react"
import { Provider } from 'react-redux'
import { Playground, store } from 'graphql-playground-react'
import { useUserState } from "../../contexts/userContext"

export const GQLPlayground: React.FC<{data: any}> = (data:any) => {
    const userState = useUserState()
    const projectId = _.get(data, 'match.params.projectId')
    const endpoint = `${process.env.REACT_APP_HOST}/client/${userState.id}/project/${projectId}/graphql`
    // const endpoint = `${process.env.REACT_APP_HOST}/graphql`
    const settings = {
        'schema.polling.enable': false,
        'schema.polling.interval': 12000,
        'request.globalHeaders' : {
            'Authorization': `Bearer ${userState.token}`
        }
        }
    const header = {
        Authorization: `Bearer ${userState.token}`
    }
    console.log(userState)
    return (
        <Provider store={store}>
            AHOOOOOJ GraphiQL
            <Playground endpoint={endpoint} headers={header} settings={settings} workspaceName={projectId} />
        </Provider>
    )
}

export default GQLPlayground