import React from 'react'
import { useParams } from 'react-router-dom'
import Playground from 'graphql-playground-react/lib/components/MiddlewareApp'
import type { ISettings } from 'graphql-playground-react/lib/types'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/reducers/userSlice'

function GQLPlayground() {
  const user = useAppSelector(selectUser)
  const { projectId } = useParams<{ projectId: string }>()
  const endpoint = `${import.meta.env.REACT_APP_HOST}/client/${user?.id ?? null}/project/${projectId}/graphql`

  const settings: Partial<ISettings> = {
    'editor.theme': 'light',
    'schema.polling.enable': false,
    'request.globalHeaders': {
      Authorization: `Bearer ${localStorage.getItem('user.token')}`,
      XUser: `${user?.id ?? null}`,
      XProject: projectId,
    },
  }

  // The vendor wrapper owns its legacy Provider and merges partial settings with
  // persisted defaults, although its published props require a complete ISettings.
  return <Playground endpoint={endpoint} workspaceName={projectId} settings={settings as ISettings} />
}

export default GQLPlayground
