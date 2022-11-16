import { ElapsedTimeCell, ITableColumn, SinceCell, TextCell } from '@ansible/ansible-ui-framework'
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
        list: 'secondary',
      },
      {
        header: 'Name',
        cell: (job) => <TextCell text={job.name} to={`/jobs/${job.id}`} />,
        sort: 'name',
        primary: true,
      },
      {
        header: 'Status',
        cell: (job) => job.status && <JobStatusCell status={job.status} />,
        sort: 'status',
        // hideLabel: true,
      },
      {
        header: 'Duration',
        cell: (job) => job.started && <ElapsedTimeCell start={job.started} finish={job.finished} />,
      },
      {
        header: 'Started',
        cell: (job) => job.started && <SinceCell value={job.started} />,
        sort: 'status',
        list: 'secondary',
      },
      // {
      //   header: 'Finished',
      //   cell: (job) => job.finished && <SinceCell value={job.finished} />,
      //   sort: 'status',
      //   list: 'secondary',
      // },
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
