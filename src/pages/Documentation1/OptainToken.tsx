import React from 'react'
import Typed from 'react-typed'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import markdown from './markdowns/OptainToken'
import './Documentation.scss'

export const DocumentationOptainToken = () => {
    return (
        <div className="container">
            <div className="my-documentation">
                <ReactMarkdown plugins={[gfm]} children={markdown} allowDangerousHtml={true} />
            </div>
        </div>
    )
}

export default DocumentationOptainToken