import { PageDetailsFromColumns, PageHeader } from '@ansible/ansible-ui-framework'
import { Bullseye, Spinner } from '@patternfly/react-core'
import { useParams } from 'react-router-dom'
import { useIdbItem } from '../common/IDBProvider'
import { useTeamColumns } from './hooks/useTeamColumns'

export function TeamDetails() {
  const params = useParams<{ id?: string }>()
  const id = Number(params.id)
  const team = useIdbItem('teams', id)
  const columns = useTeamColumns()
  if (!team) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    )
  }

  return (
    <>
      <PageHeader
        title={team.name}
        breadcrumbs={[{ label: 'Teams', to: '/access/teams' }, { label: team.name }]}
      />
      <PageDetailsFromColumns columns={columns} item={team} />
    </>
  )
}
