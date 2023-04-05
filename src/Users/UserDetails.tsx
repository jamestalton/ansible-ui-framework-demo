import { PageDetail, PageDetails, PageHeader, PageLayout } from '@ansible/ansible-ui-framework'
import { Bullseye, Spinner } from '@patternfly/react-core'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useGet } from '../common/dataHooks'

export function UserDetails() {
  const params = useParams<{ id?: string }>()
  const id = Number(params.id)
  const user = useGet('users', id)
  const { t } = useTranslation()

  if (!user) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    )
  }

  return (
    <PageLayout>
      <PageHeader
        title={user.username}
        breadcrumbs={[{ label: 'Users', to: '/access/users' }, { label: user.username }]}
      />
      <PageDetails>
        <PageDetail label={t('Username') ?? ''}>{user.username}</PageDetail>
        <PageDetail label={t('First name') ?? ''}>{user.firstName}</PageDetail>
        <PageDetail label={t('Last name') ?? ''}>{user.lastName}</PageDetail>
      </PageDetails>
    </PageLayout>
  )
}