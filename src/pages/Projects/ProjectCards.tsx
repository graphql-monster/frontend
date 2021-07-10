import React from 'react'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import Card from './Card'

import './ProjectCards.scss'

interface IProjectCards {
  projects?: any[]
  onRemove: (project: any) => void
}

export const ProjectCards: React.FC<IProjectCards> = ({ projects, onRemove }) => {
  if (!projects || projects.length < 1) {
    return (
      <div className="projectCards">
        <div className="alert alert-info" role="alert">
          You do not have any project created, please start with creating a project
        </div>
      </div>
    )
  }

  return (
    <div className="projectCards">
      {projects.map((project) => {
        return (
          <div className="projectSingleCard">
            <Card project={project} onRemove={onRemove} />
          </div>
        )
      })}
    </div>
  )
}

export default ProjectCards
