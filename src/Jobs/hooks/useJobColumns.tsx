import { ITableColumn, RunningIcon, TextCell } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'
import { IJob } from './useJobs'

export function useJobColumns() {
  return useMemo<ITableColumn<IJob>[]>(
    () => [
      {
        header: 'ID',
        cell: (job) => <TextCell text={job.id.toString()} />,
        sort: 'id',
      },
      {
        header: 'Name',
        cell: (job) => <TextCell text={job.name} />,
        sort: 'name',
      },
      {
        header: 'Status',
        cell: (job) => <TextCell icon={<RunningIcon />} iconSize="sm" text={job.status} />,
        sort: 'status',
      },
    ],
    []
  )
}
