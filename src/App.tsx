import { PageFramework, useSettingsDialog } from '@ansible/ansible-ui-framework'
import {
  Button,
  ButtonVariant,
  Masthead,
  MastheadMain,
  MastheadToggle,
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  Page,
  PageSidebar,
  PageToggleButton,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core'
import { BarsIcon, CogIcon } from '@patternfly/react-icons'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Debug } from './Debug/Debug'
import { TeamDetails } from './Teams/TeamDetails'
import { CreateTeam, EditTeam } from './Teams/TeamForm'
import { Teams } from './Teams/Teams'
import { UserDetails } from './Users/UserDetails'
import { CreateUser, EditUser } from './Users/UserForm'
import { Users } from './Users/Users'

const pageNavigationItems: IPageNavigationItem[] = [
  {
    title: 'Access',
    route: 'access',
    items: [
      { title: 'Users', route: 'users', element: <Users /> },
      { title: 'Teams', route: 'teams', element: <Teams /> },
    ],
  },
  { title: 'Debug', route: 'debug', element: <Debug /> },
]

export function App() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(() => localStorage.getItem('nav-open') === 'true')
  const base = '/ansible-ui-framework-demo'

  return (
    <PageFramework navigate={navigate}>
      <Page
        header={<Header setSidebarOpen={setSidebarOpen} />}
        sidebar={<SideBar sidebarOpen={sidebarOpen} base={base} />}
      >
        <AppRoutes />
      </Page>
    </PageFramework>
  )
}

function AppRoutes() {
  const base = '/ansible-ui-framework-demo'

  const routes = useMemo(() => {
    const routes: IPageRoute[] = []
    addPageNavigationRoutes(pageNavigationItems, base, routes)
    return routes
  }, [])

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path={`${base}/access/users/create`} element={<CreateUser />} />
      <Route path={`${base}/access/users/:id/edit`} element={<EditUser />} />
      <Route path={`${base}/access/users/:id`} element={<UserDetails />} />
      <Route path={`${base}/access/teams/create`} element={<CreateTeam />} />
      <Route path={`${base}/access/teams/:id/edit`} element={<EditTeam />} />
      <Route path={`${base}/access/teams/:id`} element={<TeamDetails />} />
      <Route path="*" element={<Navigate to={`${base}/access/users`} />} />
    </Routes>
  )
}

function Header(props: { setSidebarOpen: Dispatch<SetStateAction<boolean>> }) {
  const { t } = useTranslation()
  const openSettings = useSettingsDialog(t)
  return (
    <Masthead>
      <MastheadToggle>
        <PageToggleButton
          variant="plain"
          aria-label="Global navigation"
          id="vertical-nav-toggle"
          onClick={() =>
            props.setSidebarOpen((open) => {
              if (open) {
                localStorage.setItem('nav-open', 'false')
                return false
              } else {
                localStorage.setItem('nav-open', 'true')
                return true
              }
            })
          }
        >
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadMain>
        <Title headingLevel="h1" style={{ fontWeight: 'bold', lineHeight: 1.2 }}>
          {t('Ansible UI Framework Demo')}
        </Title>
      </MastheadMain>
      <Toolbar id="toolbar" style={{ padding: 0 }}>
        <ToolbarContent>
          <div style={{ flexGrow: 1 }}></div>
          <ToolbarItem>
            <Button icon={<CogIcon />} variant={ButtonVariant.plain} onClick={openSettings} />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    </Masthead>
  )
}

function SideBar(props: { sidebarOpen: boolean; base: string }) {
  return (
    <PageSidebar
      isNavOpen={props.sidebarOpen}
      nav={
        <>
          <Nav>
            <NavList>
              <PageNavigationItems baseRoute={props.base} items={pageNavigationItems} />
            </NavList>
          </Nav>
        </>
      }
    />
  )
}

interface IPageNavigationGroup {
  route: string
  title: string
  items: IPageNavigationItem[]
}

interface IPageNavigationComponent {
  route: string
  title: string
  element: JSX.Element
}

type IPageNavigationItem = IPageNavigationGroup | IPageNavigationComponent

function PageNavigationItems(props: { items: IPageNavigationItem[]; baseRoute: string }) {
  return (
    <>
      {props.items.map((item) => (
        <PageNavigationItem key={item.title} item={item} baseRoute={props.baseRoute} />
      ))}
    </>
  )
}

function PageNavigationItem(props: { item: IPageNavigationItem; baseRoute: string }) {
  const navigate = useNavigate()
  const { item } = props
  const route = props.baseRoute + '/' + item.route
  if ('items' in item) {
    return (
      <NavExpandable title={item.title} isActive={location.pathname.startsWith(route)} isExpanded>
        <PageNavigationItems items={item.items} baseRoute={route} />
      </NavExpandable>
    )
  }
  return (
    <NavItem isActive={location.pathname.startsWith(route)} onClick={() => navigate(route)}>
      {item.title}
    </NavItem>
  )
}

interface IPageRoute {
  path: string
  element: JSX.Element
}

function addPageNavigationRoutes(
  items: IPageNavigationItem[],
  basePath: string,
  routes: IPageRoute[]
) {
  for (const item of items) {
    addPageNavigationRoute(item, basePath, routes)
  }
}

function addPageNavigationRoute(item: IPageNavigationItem, basePath: string, routes: IPageRoute[]) {
  const path = basePath + '/' + item.route
  if ('items' in item) {
    addPageNavigationRoutes(item.items, path, routes)
  } else {
    routes.push({ path, element: item.element })
  }
}
