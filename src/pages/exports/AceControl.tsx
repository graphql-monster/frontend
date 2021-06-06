import React, { useEffect } from 'react'
import AceEditor from 'react-ace'
import { Form, FormControl } from 'react-bootstrap'

export const AceControl = ({ name, storedData, label, required, register, placeholder, formState, setValue, getValues }: any) => {
  const { errors, touchedFields, dirtyFields } = formState
  const error = errors && errors[name]
  const touched = touchedFields && touchedFields[name]
  const dirty = dirtyFields && dirtyFields[name]

  const value = getValues(name)

  useEffect(() => {
    if (storedData && storedData[name]) setValue(name, storedData[name])
  }, [storedData])

  return (
    <React.Fragment>
      <Form.Group controlId={`form-${name}`}>
        <Form.Label>
          {label} {required && '*'}
        </Form.Label>

        <AceEditor
          width="1000px"
          value={value != null ? value : storedData && storedData[name]}
          onChange={(value) => {
            setValue(name, value)
          }}
          editorProps={{ $blockScrolling: true }}
          name={`ace-control-${name}`}
        />

        <FormControl.Feedback type="valid">Perfect!</FormControl.Feedback>
        <Form.Control.Feedback type="invalid">Please provide a valid {label}.</Form.Control.Feedback>
      </Form.Group>
    </React.Fragment>
  )
}

export default AceControl
