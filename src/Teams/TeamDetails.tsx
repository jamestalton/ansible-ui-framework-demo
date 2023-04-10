import { PageDetail, PageDetails, PageHeader, PageLayout } from '@ansible/ansible-ui-framework'
import { Bullseye, Spinner } from '@patternfly/react-core'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useGet } from '../common/dataHooks'

export function TeamDetails() {
  const params = useParams<{ id?: string }>()
  const id = Number(params.id)
  const team = useGet('teams', id)
  const { t } = useTranslation()

  if (!team) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    )
  }

  return (
    <PageLayout>
      <PageHeader
        title={team.name}
        breadcrumbs={[{ label: 'Teams', to '/ansible-ui-framework-demo/access/teams' }, { label: team.name }]}
      />
      <PageDetails>
        <PageDetail label={t('Name') ?? ''}>{team.name}</PageDetail>
        <PageDetail label={t('Description') ?? ''}>{team.description}</PageDetail>
      </PageDetails>
    </PageLayout>
  )
}
