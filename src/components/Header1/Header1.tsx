import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout, selectUser } from '../../app/reducers/userSlice'
import AdminHeader from './AdminHeader'
import PublicHeader from './PublicHeader'
import UserHeader from './UserHeader'
import ReactGA from 'react-ga';

export const Header: React.FC = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const history = useHistory()
  history.listen((location, action) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

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
