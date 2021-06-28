import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory, useLocation } from 'react-router-dom'
import _ from 'lodash'
import { Alert } from 'react-bootstrap'
import { login, UserToken } from '../../app/reducers/userSlice'
import { useAppDispatch } from '../../app/hooks'

export const tokenFromFacebookCode = async (type: string, code: string) => {
  return axios.get(`${process.env.REACT_APP_HOST}/auth/${type}/callback?code=${code}`)
}

export const PassportCallback: React.FC<{ type: string }> = ({ type }) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const codeRaw = _.get(location, 'search', '').split('?code=')
  const code = codeRaw.length > 1 ? codeRaw[1] : ''

  const history = useHistory()

  const [error, setError] = useState<string>()

  const showError = (errorMessage: string) => {
    setError(errorMessage)
    setTimeout(() => {
      history.replace('/login')
    }, 6000)
  }
  useEffect(() => {
    const request = async () => {
      try {
        const data = await tokenFromFacebookCode(type, code)
        const userToken = data.data as UserToken

        dispatch(login(userToken))
        history.replace('/user/projects')
      } catch (ex) {
        const response = JSON.parse(_.get(ex, 'request.response', '{}'))
        showError(response.error?.error || response.error?.message || ex.message)
      }
    }

    if (code) request()
    else showError('User denied')
  }, [location])

  return (
    <>
      {error && (
        <Alert variant={'danger'}>
          <h4>Login {type} Error</h4>
          <p>{error}</p>
          <i>
            You will be redirect back to <Link to="/login">Login</Link>
          </i>
        </Alert>
      )}
    </>
  )
}
