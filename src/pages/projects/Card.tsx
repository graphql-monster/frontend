import React from 'react'
import { useHistory } from 'react-router-dom'

import './Card.scss'
import logo from './3.png'

interface ICards {
    project: any
}



export const Card:React.FC<ICards> = ({project}) => {
    const history = useHistory()

    const onEdit = () => {
        history.push('/user/projects/' +project.id )
    }

    const onPlayground = () => {
        history.push('/user/projects/' +project.id + '/graphiql')
    }

    return (
        <div className="projectCard" >
            <div><img className="projectCardImg" src={logo} alt="..." /></div>
            <div className="">
                <div>
                <div className="projectCardName">{`${project.name} (basic)`}</div>
                <div >{`https://protectql.com/client/${project.user.id}/project/${project.id}/graphql`}</div>
                <p className="card-text">In Playground button you will connect to GraphQL playground with admin rights</p>
                </div>
                <div className="projectCardButtons">
                    <button type="button" className="btn btn-sm btn-primary projectCardButtons" onClick={onEdit}>Edit Schema</button>
                    <button type="button" className="btn btn-sm btn-primary projectCardButtons" onClick={onPlayground}>Playground</button>
                    <button type="button" className="btn btn-sm btn-danger projectCardButtons">Delete</button>
                </div>
            </div>
               
        </div>
    )
}

export default Card