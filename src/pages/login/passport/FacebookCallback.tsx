import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { User, USER_LOGIN, useUserDispatch } from '../../../contexts/userContext'
import _ from 'lodash'
import { Alert } from 'react-bootstrap'

export const tokenFromFacebookCode = async (code: string) => {
    return axios.get(`${process.env.REACT_APP_HOST}/auth/facebook/callback?code=${code}`)
}

export const FacebookCallback: React.FC<any> = ({match}) => {
    const location = useLocation()
    const codeRaw = _.get(location, 'search', '').split('?code=')
    const code = codeRaw.length > 1 ? codeRaw[1] : ''


    const history = useHistory()
    const dispatch = useUserDispatch()

    const [error, setError] = useState()

    useEffect(()=>{
        const request = async () => {
            try {
                const data = await tokenFromFacebookCode(code)
                dispatch({
                    type: USER_LOGIN,
                    userToken: data.data as User
                })
                history.replace('/user/projects')
            } catch(ex) {
                const response = JSON.parse(_.get(ex, 'request.response', '{}'))
                setError(response.error?.message || ex.message)

                setTimeout(()=>{
                    history.replace('/login')
                }, 4000)
            }
            
           
        }


        request()
    }, [match.params])

    return (<>
        {error && <Alert variant={'danger'}>Facebook login isn't work due "{error}" You will be redirect back to <Link to="/login">Login</Link>?</Alert>}
    </>)
}
