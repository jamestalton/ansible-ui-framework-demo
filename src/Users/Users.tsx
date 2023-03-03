import { PageHeader, PageLayout, PageTable, useInMemoryView } from '@ansible/ansible-ui-framework'
import { useNavigate } from 'react-router-dom'
import { idKeyFn } from '../common/idKeyFn'
import { useUserActions } from './hooks/useUserActions'
import { useUserColumns } from './hooks/useUserColumns'
import { useUserFilters } from './hooks/useUserFilters'
import { useItems } from './hooks/useUsers'
import { useUsersActions } from './hooks/useUsersActions'
import { User } from './User'

export function Users() {
  const { users, loading } = useItems<User>('users')
  const navigate = useNavigate()

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
        title="Ansible Wisdom"
        description="This group contains all the users assigned Ansible Wisdom seats within your organization"
        headerActions="Seats avaiable 10 of 10"
      />
      <PageTable<User>
        toolbarFilters={toolbarFilters}
        tableColumns={tableColumns}
        toolbarActions={toolbarActions}
        rowActions={rowActions}
        {...view}
        errorStateTitle={'Something went wrong'}
        emptyStateTitle={
          'There are currently no users in your organization assigned to Ansible Wisdom seats.'
        }
        emptyStateDescription={'To get started, create a user.'}
        emptyStateButtonText={'Create user'}
        emptyStateButtonClick={() => navigate('/users/create')}
      />
    </PageLayout>
  )
}
