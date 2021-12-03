import React from 'react'
import { useHistory } from 'react-router-dom'
import ReactGA from 'react-ga';
import './Card.scss'
import logo from './3.png'
import { Alert, Button } from 'react-bootstrap'

interface ICards {
  project: any
  onRemove: (project: any) => void
}

export const Card: React.FC<ICards> = ({ project, onRemove }) => {
  const history = useHistory()

  const projectConnectLink = `https://graphql.monster/client/${project.user.id}/project/${project.id}/graphql`

  const onEdit = () => {
    ReactGA.event({
      category: 'Project',
      action: 'Edit'
    });
    history.push('/user/projects/' + project.id)
  }

  const onExports = () => {
    ReactGA.event({
      category: 'Project',
      action: 'Export'
    });
    history.push(`/user/projects/${project.id}/exports`)
  }

  const onFiles = () => {
    ReactGA.event({
      category: 'Project',
      action: 'File'
    });
    history.push(`/user/projects/${project.id}/files`)
  }

  const onPlayground = () => {
    ReactGA.event({
      category: 'Project',
      action: 'AdminPlayground'
    });
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
          <button
            type="button"
            className="btn btn-sm btn-danger projectCardButtons"
            onClick={() => {
              onRemove(project)
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
