import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { AppHeader } from './AppHeader'
import { Dashboard } from './Dashboard/Dashboard'
import { Debug } from './Debug/Debug'
import { PageApp } from './PageApp'
import { PageNavigation, PageNavigationItems } from './PageNavigation'
import { PageNotFound } from './PageNotFound'
import { TeamDetails } from './Teams/TeamDetails'
import { CreateTeam, EditTeam } from './Teams/TeamForm'
import { Teams } from './Teams/Teams'
import { UserDetails } from './Users/UserDetails'
import { CreateUser, EditUser } from './Users/UserForm'
import { Users } from './Users/Users'

export function App() {
  const { t } = useTranslation()

  const navigationItems = useMemo<PageNavigationItems>(
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
          // TEAMS
          { path: 'teams/create', element: <CreateTeam /> },
          { path: 'teams/:id/edit', element: <EditTeam /> },
          { path: 'teams/:id', element: <TeamDetails /> },
          { label: t('Teams'), path: 'teams', element: <Teams /> },

          // USERS
          { path: 'users/create', element: <CreateUser /> },
          { path: 'users/:id/edit', element: <EditUser /> },
          { path: 'users/:id', element: <UserDetails /> },
          { label: t('Users'), path: 'users', element: <Users /> },
        ],
      },
      { label: t('Debug'), path: 'debug', element: <Debug /> },
      { path: '/', element: <Navigate to="dashboard" /> },
      { path: '*', element: <PageNotFound /> },
    ],
    [t]
  )

  return (
    <PageApp
      header={<AppHeader />}
      sidebar={<PageNavigation navigationItems={navigationItems} />}
      navigationItems={navigationItems}
      basename="/ansible-ui-framework-demo"
    />
  )
}
