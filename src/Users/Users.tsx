import { PageHeader, PageLayout, PageTable, useInMemoryView } from '@ansible/ansible-ui-framework'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '../common/dataHooks'
import { idKeyFn } from '../common/idKeyFn'
import { useUserActions } from './hooks/useUserActions'
import { useUserColumns } from './hooks/useUserColumns'
import { useUserFilters } from './hooks/useUserFilters'
import { useUsersActions } from './hooks/useUsersActions'
import { User } from './User'

export function Users() {
  const users = useQuery('users')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const toolbarFilters = useUserFilters()
  const tableColumns = useUserColumns()

  const view = useInMemoryView<User>({
    items: users,
    tableColumns: tableColumns,
    toolbarFilters: toolbarFilters,
    keyFn: idKeyFn,
  })

  const toolbarActions = useUsersActions()
  const rowActions = useUserActions()

  return (
    <PageLayout>
      <PageHeader
        // breadcrumbs={[
        //   { label: 'Home', to: '/' },
        //   { label: 'Access', to: '/access' },
        //   { label: 'Users' },
        // ]}
        title="Users"
      />
      <PageTable<User>
        toolbarFilters={toolbarFilters}
        tableColumns={tableColumns}
        toolbarActions={toolbarActions}
        rowActions={rowActions}
        {...view}
        errorStateTitle={t('Error loading users')}
        emptyStateTitle={t('No users yet')}
        emptyStateDescription={t('To get started, create a user.')}
        emptyStateButtonText={t('Create user')}
        emptyStateButtonClick={() => navigate('/ansible-ui-framework-demo/access/users/create')}
      />
    </PageLayout>
  )
}
