import { TablePage, useInMemoryView } from '@ansible/ansible-ui-framework'
import { idKeyFn } from '../common/idKeyFn'
import { useJobActions } from './hooks/useJobActions'
import { useJobColumns } from './hooks/useJobColumns'
import { useJobFilters } from './hooks/useJobFilters'
import { IJob, useJobs } from './hooks/useJobs'
import { useJobsActions } from './hooks/useJobsActions'

export function Jobs() {
  const { jobs } = useJobs(1000, 10 * 1000)

  const toolbarFilters = useJobFilters()
  const tableColumns = useJobColumns()

  const view = useInMemoryView<IJob>({
    items: jobs,
    tableColumns: tableColumns,
    toolbarFilters: toolbarFilters,
    keyFn: idKeyFn,
  })

  const toolbarActions = useJobsActions()
  const rowActions = useJobActions()

  return (
    <TablePage<IJob>
      title="Jobs"
      toolbarFilters={toolbarFilters}
      tableColumns={tableColumns}
      toolbarActions={toolbarActions}
      rowActions={rowActions}
      {...view}
      errorStateTitle={'Error loading jobs'}
      emptyStateTitle={'No jobs yet'}
      emptyStateDescription={'To get started, create a job.'}
      emptyStateButtonText={'Create job'}
    />
  )
}