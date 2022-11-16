import { PageFramework } from '@ansible/ansible-ui-framework'
import {
  Masthead,
  MastheadMain,
  MastheadToggle,
  Nav,
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
import { BarsIcon } from '@patternfly/react-icons'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { JobsProvider } from './common/useJobData'
import { CreateJob } from './Jobs/CreateJob'
import { EditJob } from './Jobs/EditJob'
import { JobDetails } from './Jobs/JobDetails'
import { Jobs } from './Jobs/Jobs'

export function Main() {
  const navigate = useNavigate()
  return (
    <PageFramework navigate={navigate}>
      <JobsProvider>
        <Page header={<Header />} sidebar={<SideBar />}>
          <Routes>
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/create" element={<CreateJob />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/jobs/:id/edit" element={<EditJob />} />
            <Route path="/" element={<Navigate to="/jobs" />} />
          </Routes>
        </Page>
      </JobsProvider>
    </PageFramework>
  )
}

function Header() {
  // const openSettings = useSettingsDialog((t: string) => t)
  return (
    <Masthead>
      <MastheadToggle>
        <PageToggleButton variant="plain" aria-label="Global navigation" id="vertical-nav-toggle">
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadMain>
        <Title headingLevel="h1" style={{ fontWeight: 'bold', lineHeight: 1.2 }}>
          Ansible UI Framework Demo
        </Title>
      </MastheadMain>
      <Toolbar id="toolbar" style={{ padding: 0 }}>
        <ToolbarContent>
          <div style={{ flexGrow: 1 }}></div>
          <ToolbarItem>
            {/* <Button icon={<CogIcon />} variant={ButtonVariant.plain} onClick={openSettings} /> */}
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    </Masthead>
  )
}

function SideBar() {
  return (
    <PageSidebar
      id="vertical-sidebar"
      nav={
        <Nav>
          <NavList>
            <NavItem isActive>Jobs</NavItem>
          </NavList>
        </Nav>
      }
    />
  )
}
