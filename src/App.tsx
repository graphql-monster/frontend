import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import { ProjectEdit } from './pages/Projects/Edit'
import ProjectList, { ProjectAdminList } from './pages/Projects/List'
import ExportList from './pages/exports/List'
import UserList from './pages/Users/List'
import { Header } from './components/Header/Header'

import apolloClient from './app/apolloClient'
import UserRoleList from './pages/UserRoles/List'
import UserRoleEdit from './pages/UserRoles/Edit'
import GQLPlayground from './pages/Projects/GQLPlayground'
import Home from './pages/home/home'
import { Register } from './pages/login/Register'
import Login from './pages/login/Login'
import { PricingPage } from './pages/pricing/pricing'
import SubscribePage from './pages/pricing/subsribe'
import Documentation from './pages/documentation/Documentation'
import SubscibesListPage from './pages/pricing/subsribe-list'
import VerifyUser from './pages/login/VerifyUser'
import UserInfo from './pages/login/UserInfo'
import ForgottenPassword from './pages/login/ForgottenPassword'
import ForgottenPasswordReset from './pages/login/ForgottenPasswordReset'
import { PassportCallback } from './pages/login/PassportCallback'
import ExportEdit from './pages/exports/Edit'
import { Provider } from 'react-redux'
import { store } from './app/store'

import './App.css'

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Router>
          <div>
            <Header />
            {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route path="/login/facebook">
                <PassportCallback type={'facebook'} />
              </Route>
              <Route path="/login/github">
                <PassportCallback type={'github'} />
              </Route>
              <Route path="/login/google">
                <PassportCallback type={'google'} />
              </Route>
              <Route path="/register">
                <Register />
              </Route>

              <Route path="/forgotten-password/:token" component={ForgottenPasswordReset} />
              <Route exact path="/forgotten-password">
                <ForgottenPassword />
              </Route>

              <Route path="/verify-user/:verifyToken" component={VerifyUser} />
              <Route path="/pricing">
                <PricingPage />
              </Route>
              <Route path="/subscribe">
                <SubscribePage />
              </Route>
              <Route path="/documentation">
                <Documentation />
              </Route>
              <Route path="/user/projects/create" component={ProjectEdit} />
              <Route path="/user/projects/:projectId/graphiql" component={GQLPlayground} />
              <Route path="/user/projects/:projectId/exports/:id" component={ExportEdit} />
              <Route path="/user/projects/:projectId/exports" component={ExportList} />
              <Route path="/user/projects/:projectId" component={ProjectEdit} />
              <Route path="/user/projects">
                <ProjectList />
              </Route>

              <Route path="/user/info">
                <UserInfo />
              </Route>
              <Route path="/admin/projects">
                <ProjectAdminList />
              </Route>
              <Route path="/admin/users">
                <UserList adminMode={true} />
              </Route>
              <Route path="/admin/roles">
                <UserRoleList adminMode={true} />
              </Route>
              <Route path="/admin/subsribes">
                <SubscibesListPage adminMode={true} />
              </Route>
              <Route path="/user/roles/create" component={UserRoleEdit} />
              <Route path="/user/roles/:id" component={UserRoleEdit} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    </Provider>
  )
}
