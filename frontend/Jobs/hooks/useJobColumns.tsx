import { ITableColumn, TextCell } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'
import { IJob } from './useJobs'

export function useJobColumns() {
  return useMemo<ITableColumn<IJob>[]>(
    () => [
      {
        header: 'Name',
        cell: (job) => <TextCell text={job.name} />,
        sort: 'name',
      },
      {
        header: 'Status',
        cell: (job) => <TextCell text={job.status} />,
        sort: 'status',
      },
    ],
    []
  )
}
