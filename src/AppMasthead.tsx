import { PageMasthead, PageSettingsIcon, PageThemeSwitcher } from '@ansible/ansible-ui-framework'
import { Title, ToolbarGroup, ToolbarItem } from '@patternfly/react-core'
import { useTranslation } from 'react-i18next'

export function AppMasthead() {
  const { t } = useTranslation()
  return (
    <PageMasthead brand={<Title headingLevel="h1">{t('Ansible UI Framework Demo')}</Title>}>
      <span style={{ flexGrow: 1 }} />
      <ToolbarGroup variant="icon-button-group">
        <ToolbarItem>
          <PageThemeSwitcher />
        </ToolbarItem>
        <ToolbarItem>
          <PageSettingsIcon />
        </ToolbarItem>
      </ToolbarGroup>
    </PageMasthead>
  )
}
