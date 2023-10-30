import { PageApp, PageNavigationItem } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet } from 'react-router-dom'
import { AppMasthead } from './AppMasthead'
import { Dashboard } from './Dashboard/Dashboard'
import { Debug } from './Debug/Debug'
import { PageNotFound } from './PageNotFound'
import { TeamDetails } from './Teams/TeamDetails'
import { CreateTeam, EditTeam } from './Teams/TeamForm'
import { Teams } from './Teams/Teams'
import { UserDetails } from './Users/UserDetails'
import { CreateUser, EditUser } from './Users/UserForm'
import { Users } from './Users/Users'

export function App() {
  const { t } = useTranslation()

  const navigationItems = useMemo<PageNavigationItem[]>(
    () => [
      {
        // DASHBOARD
        label: t('Dashboard'),
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        // ACCESS
        label: t('Access'),
        path: 'access',
        children: [
          {
            // TEAMS
            label: t('Teams'),
            path: 'teams',
            children: [
              { path: 'create', element: <CreateTeam /> },
              {
                path: ':id',
                children: [
                  { path: 'edit', element: <EditTeam /> },
                  { path: '', element: <TeamDetails /> },
                ],
              },
              { path: '', element: <Teams /> },
            ],
          },
          {
            // USERS
            label: t('Users'),
            path: 'users',
            children: [
              { path: 'create', element: <CreateUser /> },
              {
                path: ':id',
                children: [
                  { path: 'edit', element: <EditUser /> },
                  { path: '', element: <UserDetails /> },
                ],
              },
              { path: '', element: <Users /> },
            ],
          },
        ],
      },
      {
        // DEBUG
        label: t('Debug'),
        path: 'debug',
        element: <Debug />,
      },
      { path: '/', element: <Navigate to="dashboard" /> },
      { path: '*', element: <PageNotFound /> },
    ],
    [t]
  )

  return (
    <PageApp
      login={<></>}
      root={<Outlet />}
      masthead={<AppMasthead />}
      navigation={navigationItems}
      // basename="/ansible-ui-framework-demo"
    />
  )
}
