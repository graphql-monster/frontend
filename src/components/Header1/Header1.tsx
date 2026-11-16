import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useHistory } from 'react-router-dom'
import { logout, selectUser } from '../../app/reducers/userSlice'
import AdminHeader from './AdminHeader'
import PublicHeader from './PublicHeader'
import UserHeader from './UserHeader'
import ReactGA from 'react-ga'

export const Header: React.FC = () => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const history = useHistory()
  useEffect(
    () =>
      history.listen((location) => {
        ReactGA.set({ page: location.pathname })
        ReactGA.pageview(location.pathname)
      }),
    [history],
  )

  const onLogout = () => {
    dispatch(logout())
  }

  if (user && user.token) {
    if (user.roles.find((r) => r.name === 'admin')) return <AdminHeader user={user} onLogout={onLogout} />
    else return <UserHeader user={user} onLogout={onLogout} />
  }

  return <PublicHeader />
}

export default Header
