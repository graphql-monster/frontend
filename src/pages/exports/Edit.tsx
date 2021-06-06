import JSON5 from 'json5'
import React, { useMemo } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUser } from '../../app/reducers/userSlice'
import { CREATE_MUTATION, ExportEditType, ONE_QUERY, UPDATE_MUTATION } from '../../gen/Export/Edit'
import AceControl from './AceControl'
import BaseEditor from './BaseEditor'
import Control from './Control'
import HiddenItem from './HiddenItem'

export const ExportForm = ({ onSubmit, storedData, graphQlError, projectId }: any) => {
  const user = useSelector(selectUser) || { id: null }
  const reactForm = useForm()
  const { register, handleSubmit, formState, setValue, getValues } = reactForm

  const testVariables = getValues('testVariables')
  const testLink = useMemo(() => {
    const jsonValue = testVariables ? JSON5.stringify(JSON5.parse(testVariables)) : ''
    const escapedValue = encodeURI(jsonValue.substr(1, jsonValue.length - 2))
    return `${process.env.REACT_APP_HOST}/client/${user.id}/project/${projectId}/pdf/${storedData['id']}/${escapedValue}`
  }, [testVariables])

  const processSubmit = (data: any) => {
    onSubmit(data)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(processSubmit)}>
        <Control name={'name'} label={'name'} required={true} storedData={storedData} {...reactForm} />
        {/* <Control name={'query'} label={'query'} required={true} storedData={storedData} {...reactForm} /> */}
        {/* <Control name={'template'} label={'template'} required={true} storedData={storedData} {...reactForm} /> */}

        <AceControl name={'query'} label={'Query'} {...reactForm} storedData={storedData} />
        <AceControl name={'template'} label={'Template'} {...reactForm} storedData={storedData} />

        <hr />
        <AceControl name={'testVariables'} label={'Test Variables'} {...reactForm} storedData={storedData} />
        <HiddenItem name={'type'} value={'pdf'} {...reactForm} storedData={storedData} />
        <HiddenItem name={'projectId'} value={projectId} {...reactForm} storedData={storedData} />

        <Button type="submit">Save</Button>
      </Form>
      <span>{testLink}</span>
    </div>
  )
}

export const ExportEdit: (obj: ExportEditType) => any = ({ name, createMutation, updateMutation, oneQuery }) => {
  const params = useParams() as any

  const id = params.id !== 'create' && params.id

  return (
    <div className={`base-edit-Invoice base-edit`}>
      <BaseEditor
        externId={id}
        name={name || 'Invoices'}
        query={{
          CREATE_MUTATION: createMutation || CREATE_MUTATION,
          UPDATE_MUTATION: updateMutation || UPDATE_MUTATION,
          QUERY: oneQuery || ONE_QUERY,
        }}
      >
        {(storedData: any, onSubmit: any, errors: any) => <ExportForm storedData={storedData} onSubmit={onSubmit} graphQlError={errors} projectId={params.projectId} />}
      </BaseEditor>
    </div>
  )
}

export default ExportEdit
