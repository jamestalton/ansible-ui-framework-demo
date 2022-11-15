import { ITableColumn, TextCell } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'
import { RunningIcon } from '../../common/RunningIcon'
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
        cell: (job) => <TextCell icon={<RunningIcon />} iconSize="sm" text={job.status} />,
        sort: 'status',
      },
    ],
    []
  )
}
