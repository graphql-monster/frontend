import React from 'react'
import Card from './Card'

import './ProjectCards.scss'

interface IProjectCards {
    projects?: any[]
}

export const ProjectCards:React.FC<IProjectCards> = ({projects}) => {
    if(!projects || projects.length < 1){
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
        {projects.map(project => {
            return (<div className="projectSingleCard">
                <Card project={project} />
                </div>)
        })}
        </div>
    )
}

export default ProjectCards