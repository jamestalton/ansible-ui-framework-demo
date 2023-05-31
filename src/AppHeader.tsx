import { PageMasthead, useSettingsDialog } from '@ansible/ansible-ui-framework'
import { Button, ButtonVariant } from '@patternfly/react-core'
import { CogIcon } from '@patternfly/react-icons'
import { useTranslation } from 'react-i18next'

export function AppHeader() {
  const { t } = useTranslation()
  const openSettings = useSettingsDialog(t)
  return (
    <PageMasthead title={t('Ansible UI Framework Demo')}>
      <Button icon={<CogIcon />} variant={ButtonVariant.plain} onClick={openSettings} />
    </PageMasthead>
  )
}
