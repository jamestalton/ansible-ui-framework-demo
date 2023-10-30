import {
  PageMasthead,
  PageSettingsIcon,
  PageThemeSwitcher,
  useSettingsDialog,
} from '@ansible/ansible-ui-framework'
import { ToolbarGroup, ToolbarItem } from '@patternfly/react-core'
import { useTranslation } from 'react-i18next'

export function AppMasthead() {
  const { t } = useTranslation()
  const openSettings = useSettingsDialog(t)
  return (
    <PageMasthead title={t('UI Framework Demo')} brand="Ansible">
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
