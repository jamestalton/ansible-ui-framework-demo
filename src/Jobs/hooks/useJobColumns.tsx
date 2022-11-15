import { ITableColumn, SinceCell, TextCell } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'
import { JobStatusCell } from '../../common/JobStatusCell'
import { Job } from '../Job'

export function useJobColumns() {
  return useMemo<ITableColumn<Job>[]>(
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
        cell: (job) => job.status && <JobStatusCell status={job.status} />,
        sort: 'status',
      },
      {
        header: 'Started',
        cell: (job) => job.started && <SinceCell value={job.started} />,
        sort: 'status',
        list: 'secondary',
      },
      {
        header: 'Finished',
        cell: (job) => job.finished && <SinceCell value={job.finished} />,
        sort: 'status',
        list: 'secondary',
      },
      {
        header: 'Created',
        cell: (job) => job.created && <SinceCell value={job.created} />,
        sort: 'status',
        list: 'secondary',
        card: 'hidden',
      },
      {
        header: 'Modified',
        cell: (job) => job.modified && <SinceCell value={job.modified} />,
        sort: 'status',
        list: 'secondary',
        card: 'hidden',
      },
    ],
    []
  )
}
