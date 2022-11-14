import { useSettingsDialog } from '@ansible/ansible-ui-framework'
import {
  Button,
  ButtonVariant,
  Masthead,
  MastheadMain,
  Page,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core'
import { CogIcon } from '@patternfly/react-icons'
import { Jobs } from './Jobs/Jobs'

export default function Main() {
  const openSettings = useSettingsDialog((t: string) => t)
  return (
    <Page
      header={
        <Masthead>
          <MastheadMain>
            <Title headingLevel="h1" style={{ fontWeight: 'bold', lineHeight: 1.2 }}>
              Ansible Framework Demo
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
      }
    >
      <Jobs />
    </Page>
  )
}
