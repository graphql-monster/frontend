import _ from "lodash"
import React from "react"
import { Provider } from 'react-redux'
import { Playground, store, getSettings, setSettingsString, } from 'graphql-playground-react'
import { useUserState } from "../../contexts/userContext"

export const GQLPlayground: React.FC<{data: any}> = (data:any) => {
    const userState = useUserState()
    const projectId = _.get(data, 'match.params.projectId')
    const endpoint = `${process.env.REACT_APP_HOST}/client/${userState.id}/project/${projectId}/graphql`
    // const endpoint = `${process.env.REACT_APP_HOST}/graphql`
   
    console.log(userState)

    // NOTE: for some reason pass setting over `setting` properties doesn't work
    //       so it is taken this workeround
    // https://github.com/graphql/graphql-playground/issues/1037#issuecomment-559224565
    // grab the redux store
    const state = store.getState();
    // get the current settings
    const settings = getSettings(state);
    settings['editor.theme'] = 'light'
    settings['schema.polling.enable']= false
    settings['request.globalHeaders'] = {
      // hot reload
      'Authorization': `Bearer ${userState.token}`,
      'XUser': `${userState.id}`,
      'XProject': `${projectId}`

       // proxy mode works on authorization
       // 'Authorization': `Bearer ${userState.token}`,
    }
    
    store.dispatch(setSettingsString(JSON.stringify(settings, null, 2)))
    return (
        <Provider store={store}>
            <Playground endpoint={endpoint} workspaceName={projectId} platformToken={'ahojk8999333'} />
        </Provider>
    )
}

export default GQLPlayground