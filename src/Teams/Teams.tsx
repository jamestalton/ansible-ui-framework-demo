import { PageHeader, PageLayout, PageTable, useInMemoryView } from '@ansible/ansible-ui-framework'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '../common/dataHooks'
import { idKeyFn } from '../common/idKeyFn'
import { useTeamActions } from './hooks/useTeamActions'
import { useTeamColumns } from './hooks/useTeamColumns'
import { useTeamFilters } from './hooks/useTeamFilters'
import { useTeamsActions } from './hooks/useTeamsActions'
import { Team } from './Team'

export function Teams() {
  const teams = useQuery('teams')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const toolbarFilters = useTeamFilters()
  const tableColumns = useTeamColumns()

  const view = useInMemoryView<Team>({
    items: teams,
    tableColumns: tableColumns,
    toolbarFilters: toolbarFilters,
    keyFn: idKeyFn,
  })

  const toolbarActions = useTeamsActions()
  const rowActions = useTeamActions()

  return (
    <PageLayout>
      <PageHeader
        // breadcrumbs={[
        //   { label: 'Home', to: '/' },
        //   { label: 'Access', to: '/access' },
        //   { label: 'Teams' },
        // ]}
        title="Teams"
      />
      <PageTable<Team>
        toolbarFilters={toolbarFilters}
        tableColumns={tableColumns}
        toolbarActions={toolbarActions}
        rowActions={rowActions}
        {...view}
        errorStateTitle={t('Error loading teams')}
        emptyStateTitle={t('No teams yet')}
        emptyStateDescription={t('To get started, create a team.')}
        emptyStateButtonText={t('Create team')}
        emptyStateButtonClick={() => navigate('/access/teams/create')}
        defaultSubtitle="team"
        expandedRow={(team) => team.description}
      />
    </PageLayout>
  )
}
