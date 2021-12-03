import React, { useState } from 'react'
import { Alert, Button, Form, Tab, Tabs } from 'react-bootstrap'
import { SelectCallback } from 'react-bootstrap/esm/helpers'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectUser } from '../../app/reducers/userSlice'
import AceControl from '../../components/Editor/AceControl'
import Control from '../../components/Editor/Control'
import { GraphQLError } from './GraphQLError'

export const ProjectEditForm = ({ onSubmit, storedData, graphQlError, projectId }: any) => {
  const user = useSelector(selectUser) || { id: null }
  const history = useHistory()

  const [selectedTab, setSelectedTab] = useState('main')
  const reactForm = useForm()
  const { register, handleSubmit, formState, setValue, getValues, watch } = reactForm

  const processSubmit = (data: any) => {
    onSubmit(data)
  }

  const onTabSelect: SelectCallback = (tabKey) => {
    if (tabKey === 'exports') {
      history.replace(`/user/projects/${projectId}/exports`)
    }

    if (tabKey === 'files') {
      history.replace(`/user/projects/${projectId}/files`)
    }

    setSelectedTab(tabKey || '')
  }

  return (
    <Tabs className="base-edit-tabs" activeKey={selectedTab} onSelect={onTabSelect}>
      <Tab eventKey={'main'} title={'Main'}>
        <Form onSubmit={handleSubmit(processSubmit)}>
          <Control name={'name'} label={'Service name (SERVICE_NAME)'} required={true} storedData={storedData} {...reactForm} />
          {graphQlError?.length > 0 && <GraphQLError graphQLError={graphQlError} />}
          <AceControl name={'models'} label={'Models'} {...reactForm} defaultValue={''} storedData={storedData} />
          <hr />
          <Button type="submit">Save</Button>
        </Form>
      </Tab>
      <Tab eventKey={'email'} title={'Email'}>
        <Form onSubmit={handleSubmit(processSubmit)}>
          <Control name={'emailWelcomeTitle'} label={'Welcome Email Title'} storedData={storedData} {...reactForm} placeholder={'Wellcome in {{SERVICE_NAME}}'} />
          <AceControl
            name={'emailWelcomeMessage'}
            label={'Welcome Email Message'}
            {...reactForm}
            storedData={storedData}
            placeholder={
              'Please verify your email by click to this <a href="{{SERVICE_URL}}/email/${user.__verifyToken}/verify">{{SERVICE_URL}}/email/${user.__verifyToken}/verify</a>'
            }
          />
          <Control
            name={'emailForgottenPasswordTitle'}
            label={'Reset Password Email Title'}
            storedData={storedData}
            {...reactForm}
            placeholder={'Change password request for {{SERVICE_NAME}}'}
          />
          <AceControl
            name={'emailForgottenPasswordMessage'}
            label={'Change password request for {{SERVICE_NAME}}'}
            {...reactForm}
            storedData={storedData}
            placeholder={
              'We recaive request about reset Your password. If is not your action, please ignore this message. If you want reset your password follow instruction on this link <a href="{{SERVICE_URL}}/forgotten-password/${user.__resetPasswordToken}">{{SERVICE_URL}}/forgotten-password/${user.__resetPasswordToken}</a>'
            }
          />
          <hr />
          <Button type="submit">Save</Button>
        </Form>
      </Tab>
      <Tab eventKey={'login'} title={'Login'}>
        <Form onSubmit={handleSubmit(processSubmit)}>
          <h2>Github</h2>
          <Control name={'loginGithubId'} label={'ID'} storedData={storedData} {...reactForm} />
          <Control name={'loginGithubSecret'} label={'Secret'} storedData={storedData} {...reactForm} />
          <Control name={'loginGithubCallbackURL'} label={'CallbackURL'} storedData={storedData} {...reactForm} />
          <hr />
          <h2>Google</h2>
          <Control name={'loginGmailId'} label={'ID'} storedData={storedData} {...reactForm} />
          <Control name={'loginGmailSecret'} label={'Secret'} storedData={storedData} {...reactForm} />
          <Control name={'loginGmailCallbackURL'} label={'CallbackURL'} storedData={storedData} {...reactForm} />
          <hr />
          <h2>Facebook</h2>
          <Control name={'loginFacebookId'} label={'ID'} storedData={storedData} {...reactForm} />
          <Control name={'loginFacebookSecret'} label={'Secret'} storedData={storedData} {...reactForm} />
          <Control name={'loginFacebookCallbackURL'} label={'CallbackURL'} storedData={storedData} {...reactForm} />
          <hr />
          <Button type="submit">Save</Button>
        </Form>
      </Tab>
      <Tab eventKey={'exports'} title={'Exports'} disabled={!projectId}></Tab>
      <Tab eventKey={'files'} title={'Files'} disabled={!projectId}></Tab>
    </Tabs>
  )
}
