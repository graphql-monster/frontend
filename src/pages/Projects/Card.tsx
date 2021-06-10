import React from 'react'
import { useHistory } from 'react-router-dom'

import './Card.scss'
import logo from './3.png'
import { Alert, Button } from 'react-bootstrap'

interface ICards {
  project: any
}

export const Card: React.FC<ICards> = ({ project }) => {
  const history = useHistory()

  const projectConnectLink = `https://protectql.com/client/${project.user.id}/project/${project.id}/graphql`

  const onEdit = () => {
    history.push('/user/projects/' + project.id)
  }

  const onExports = () => {
    history.push(`/user/projects/${project.id}/exports`)
  }

  const onFiles = () => {
    history.push(`/user/projects/${project.id}/files`)
  }

  const onPlayground = () => {
    history.push(`/user/projects/${project.id}/graphiql`)
  }

  return (
    <div className="projectCard">
      <div>
        <img className="projectCardImg" src={logo} alt="..." />
      </div>
      <div className="">
        <div>
          <h4 className="projectCardName">{`${project.name} (basic)`}</h4>
          <h5>{project.domain}</h5>
          <Alert variant="warning">Be aware system is in beta mode, not store any importand data without back-up. This is only for demostration or study purposes</Alert>
          <form>
            <div className="input-group">
              <input type="text" className="form-control" value={projectConnectLink} placeholder="Project connect link" id="copy-input" />
              <span className="input-group-btn">
                <Button
                  className="btn btn-default"
                  onClick={() => {
                    navigator.clipboard.writeText(projectConnectLink)
                  }}
                  title="Copy to clipboard"
                >
                  Copy
                </Button>
              </span>
            </div>
          </form>
        </div>

        <div className="projectCardButtons">
          <button type="button" className="btn btn-sm btn-primary projectCardButtons" onClick={onEdit}>
            Configuration
          </button>
          <button type="button" className="btn btn-sm btn-primary projectCardButtons" onClick={onExports}>
            Exports
          </button>
          <button type="button" className="btn btn-sm btn-primary projectCardButtons" onClick={onFiles}>
            Files
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary projectCardButtons"
            onClick={onPlayground}
            title="In Admin Playground button you will connect to GraphQL playground with admin rights"
          >
            Admin Playground
          </button>
          <button type="button" className="btn btn-sm btn-danger projectCardButtons">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
