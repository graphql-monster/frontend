import JSON5 from 'json5'
import React, { useCallback, useMemo, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUser } from '../../app/reducers/userSlice'
import { CREATE_MUTATION, ExportEditType, ONE_QUERY, UPDATE_MUTATION } from '../../gen/Export/Edit'
import AceControl from './AceControl'
import BaseEditor from './BaseEditor'
import Control from './Control'
import HiddenItem from './HiddenItem'
import { PdfDownloadState, TPdfDownloadState } from './PdfDownloadState'
import './Edit.css'

const mutationOptaionToken = `// optain user token via graphql
mutation{
  login_v1(email:"type-user-email", password:"type-user-pass"){
      token
  }
}`

async function downloadPDF(setStatus: (a: TPdfDownloadState) => void, url: string, filename = 'download.pdf', token = '') {
  let headers = new Headers()
  if (token) headers.append('Authorization', `Bearer ${token}`)
  setStatus({})
  try {
    const data = await fetch(url, {
      method: 'GET',
      headers: headers,
    })
    const blob = await data.blob()
    if (data.ok) {
      // It is necessary to create a new blob object with mime-type explicitly set for all browsers except Chrome, but it works for Chrome too.
      const newBlob = new Blob([blob], { type: 'application/pdf' })

      // MS Edge and IE don't allow using a blob object directly as link href, instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob)
      } else {
        // For other browsers: create a link pointing to the ObjectURL containing the blob.
        const objUrl = window.URL.createObjectURL(newBlob)

        let link = document.createElement('a')
        link.href = objUrl
        link.download = filename
        link.click()

        // For Firefox it is necessary to delay revoking the ObjectURL.
        setTimeout(() => {
          window.URL.revokeObjectURL(objUrl)
        }, 250)

        setStatus({ ok: true })
      }
    } else {
      let b = new Blob([blob], { type: 'application/json' })
      const fr = new FileReader()

      fr.onload = function (data1) {
        setStatus({ error: this.result })
        console.log(JSON.parse(this.result as any))
      }

      fr.readAsText(b)
    }
  } catch (ex) {
    setStatus({ error: ex })
    console.log(ex)
  }
}

export const ExportForm = ({ onSubmit, storedData, graphQlError, projectId }: any) => {
  const user = useSelector(selectUser) || { id: null }
  const reactForm = useForm()
  const { register, handleSubmit, formState, setValue, getValues, watch } = reactForm

  const [pdfDownloadState, setPdfDownloadState] = useState<TPdfDownloadState>({})
  const name = watch('name')
  const testVariables = watch('testVariables')
  const testToken = watch('testToken')

  const testLink = useMemo(() => {
    const jsonValue = testVariables ? JSON5.stringify(JSON5.parse(testVariables)) : ''
    const escapedValue = encodeURI(jsonValue.substr(1, jsonValue.length - 2))
    return `${process.env.REACT_APP_HOST}/client/${user.id}/project/${projectId}/pdf/${storedData['id']}/${escapedValue}`
  }, [testVariables])

  const onTestDownload = useCallback(() => {
    downloadPDF(setPdfDownloadState, testLink, `test-download-${name}`, testToken)
  }, [testLink, testToken, name])

  const processSubmit = (data: any) => {
    onSubmit(data)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(processSubmit)}>
        <h2>Config</h2>
        <Control name={'name'} label={'name'} required={true} storedData={storedData} {...reactForm} />
        {/* <Control name={'query'} label={'query'} required={true} storedData={storedData} {...reactForm} /> */}
        {/* <Control name={'template'} label={'template'} required={true} storedData={storedData} {...reactForm} /> */}

        <AceControl name={'query'} label={'Query'} {...reactForm} storedData={storedData} />
        <AceControl name={'template'} label={'Template'} {...reactForm} storedData={storedData} />
        <HiddenItem name={'type'} value={'pdf'} {...reactForm} storedData={storedData} />
        <HiddenItem name={'projectId'} value={projectId} {...reactForm} storedData={storedData} />

        <hr />
        <h2>Test environment</h2>
        <AceControl name={'testVariables'} label={'Test Variables'} {...reactForm} storedData={storedData} defaultHight={100} />
        {/* <AceControl name={'testTokenQuery'} label={'Optain Token'} {...reactForm} storedData={storedData} defaultHight={100} /> */}

        <div className=".my-documentation">
          <h3>Optaining user token</h3>
          <pre>
            <code>{mutationOptaionToken}</code>
          </pre>
          <Control name={'testToken'} label={'Test Token'} storedData={storedData} {...reactForm} />

          {pdfDownloadState.ok || (pdfDownloadState.error && <PdfDownloadState {...pdfDownloadState} />)}

          <div className="input-group">
            <input type="text" className="form-control" value={testLink} placeholder="Project connect link" id="copy-input" />
            <div className="input-group-append">
              <Button className="btn btn-default" onClick={onTestDownload} title="Copy to clipboard">
                Test Download
              </Button>
              <Button
                className="btn btn-default"
                onClick={() => {
                  navigator.clipboard.writeText(testLink)
                }}
                title="Copy to clipboard"
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
        <hr />

        <Button type="submit">Save</Button>
      </Form>

      <form></form>
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
