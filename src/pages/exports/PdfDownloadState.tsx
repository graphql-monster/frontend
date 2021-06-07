import React from 'react'
import { Alert } from 'react-bootstrap'

export type TPdfDownloadState = { ok?: Boolean; error?: unknown }

export const PdfDownloadState: (state: TPdfDownloadState) => any = ({ ok, error }) => {
  if (ok) {
    return <Alert variant="success">Configuration seems ok</Alert>
  }

  if (error) {
    return (
      <Alert variant="warning">
        <code>{JSON.stringify(error)}</code>
      </Alert>
    )
  }
}
