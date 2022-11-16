import { compareStrings, useBulkConfirmation } from '@ansible/ansible-ui-framework'
import { idKeyFn } from '../../common/idKeyFn'
import { useJobData } from '../../common/useJobData'
import { Job } from '../Job'
import { useJobColumns } from './useJobColumns'

export function useDeleteJobs() {
  const confirmationColumns = useJobColumns()
  const { deleteJob } = useJobData()
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
      actionFn: async (job: Job) => {
        await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 4000) + 1000))
        deleteJob(job)
        return Promise.resolve()
      },
    })
  }
  return deleteJobs
}
