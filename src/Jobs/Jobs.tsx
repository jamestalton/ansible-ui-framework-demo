import { PageHeader, PageLayout, PageTable, useInMemoryView } from '@ansible/ansible-ui-framework'
import { useNavigate } from 'react-router-dom'
import { idKeyFn } from '../common/idKeyFn'
import { useJobData } from '../common/useJobData'
import { useJobActions } from './hooks/useJobActions'
import { useJobColumns } from './hooks/useJobColumns'
import { useJobFilters } from './hooks/useJobFilters'
import { useJobsActions } from './hooks/useJobsActions'
import { Job } from './Job'

export function Jobs() {
  const { jobs } = useJobData()
  const navigate = useNavigate()

  const toolbarFilters = useJobFilters()
  const tableColumns = useJobColumns()

  const view = useInMemoryView<Job>({
    items: jobs,
    tableColumns: tableColumns,
    toolbarFilters: toolbarFilters,
    keyFn: idKeyFn,
  })

  const toolbarActions = useJobsActions()
  const rowActions = useJobActions()

  return (
    <PageLayout>
      <PageHeader title="Jobs" />
      <PageTable<Job>
        toolbarFilters={toolbarFilters}
        tableColumns={tableColumns}
        toolbarActions={toolbarActions}
        rowActions={rowActions}
        {...view}
        errorStateTitle={'Error loading jobs'}
        emptyStateTitle={'No jobs yet'}
        emptyStateDescription={'To get started, create a job.'}
        emptyStateButtonText={'Create job'}
        emptyStateButtonClick={() => navigate('/jobs/create')}
      />
    </PageLayout>
  )
}
