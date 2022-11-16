import { compareStrings, useBulkConfirmation } from '@ansible/ansible-ui-framework'
import { idKeyFn } from '../../common/idKeyFn'
import { Job } from '../Job'
import { useJobColumns } from './useJobColumns'
import { useJobs } from './useJobs'

export function useDeleteJobs() {
  const confirmationColumns = useJobColumns()
  const { deleteJob } = useJobs()
  const bulkAction = useBulkConfirmation<Job>()
  const deleteJobs = (jobs: Job[]) => {
    bulkAction({
      title: jobs.length === 1 ? 'Permanently delete job' : 'Permanently delete jobs',
      confirmText: 'Yes, I confirm that I want to delete.',
      actionButtonText: jobs.length === 1 ? 'Delete job' : 'Delete jobs',
      items: jobs.sort((l, r) => compareStrings(l.name, r.name)),
      keyFn: idKeyFn,
      isDanger: true,
      confirmationColumns,
      actionColumns: [confirmationColumns[0], confirmationColumns[1]],
      actionFn: (job: Job) => {
        deleteJob(job)
        return Promise.resolve()
      },
    })
  }
  return deleteJobs
}
