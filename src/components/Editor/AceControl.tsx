import React, { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import { Form, FormControl } from 'react-bootstrap'
import { Resizable } from 'react-resizable'

export const AceControl = ({ name, defaultValue, storedData, label, required, register, placeholder, formState, setValue, getValues, defaultHight }: any) => {
  const { errors, touchedFields, dirtyFields } = formState
  const error = errors && errors[name]
  const touched = touchedFields && touchedFields[name]
  const dirty = dirtyFields && dirtyFields[name]
  const [height, setHeight] = useState(defaultHight || 300)

  const value = getValues(name)

  useEffect(() => {
    if (storedData && storedData[name]) setValue(name, storedData[name])
    else if (defaultValue || defaultValue === '') setValue(name, defaultValue)
  }, [storedData, defaultValue])

  const onResize = (_: unknown, { size }: any) => {
    setHeight(size.height)
  }

  return (
    <React.Fragment>
      <Form.Group controlId={`form-${name}`}>
        <Form.Label>
          {label} {required && '*'}
        </Form.Label>

        <Resizable width={1000} height={height} resizeHandles={['s']} onResize={onResize} minConstraints={[100, 100]}>
          <div style={{ height: `${height}px` }}>
            <AceEditor
              width={`100%`}
              height={`${height - 15}px`}
              value={value || (storedData && storedData[name]) || defaultValue}
              onChange={(value) => {
                setValue(name, value)
              }}
              editorProps={{ $blockScrolling: true }}
              name={`ace-control-${name}`}
            />
          </div>
        </Resizable>

        <FormControl.Feedback type="valid">Perfect!</FormControl.Feedback>
        <Form.Control.Feedback type="invalid">Please provide a valid {label}.</Form.Control.Feedback>
      </Form.Group>
    </React.Fragment>
  )
}

export default AceControl
