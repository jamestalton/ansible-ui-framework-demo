import { usePageNavigate } from '@ansible/ansible-ui-framework'
import {
  Button,
  EmptyState,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  EmptyStateVariant,
  Page,
  Stack,
  Title,
} from '@patternfly/react-core'
import { ExclamationCircleIcon } from '@patternfly/react-icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function PageNotFound() {
  const { t } = useTranslation()
  const navigate = usePageNavigate()
  return (
    <Page>
      <EmptyState variant={EmptyStateVariant.small} style={{ paddingTop: 48 }}>
        <EmptyStateIcon icon={ExclamationCircleIcon} />
        <Title headingLevel="h2" size="lg">
          {t('We could not find that page')}
        </Title>
        {/* <EmptyStateBody>{error.message}</EmptyStateBody> */}
        <EmptyStateSecondaryActions>
          <Stack hasGutter>
            <Button onClick={() => navigate(-1)}>{t('Return to previous page')}</Button>
            <Button component={(props) => <Link to={'/'} {...props} />}>
              {t('Navigate to Home')}
            </Button>
          </Stack>
        </EmptyStateSecondaryActions>
      </EmptyState>
    </Page>
  )
}
