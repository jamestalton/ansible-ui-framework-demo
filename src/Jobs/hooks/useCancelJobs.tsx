import { compareStrings, useBulkConfirmation } from '@ansible/ansible-ui-framework'
import { idKeyFn } from '../../common/idKeyFn'
import { Job } from '../Job'
import { useCancelJob } from './useCancelJob'
import { useJobColumns } from './useJobColumns'

export function useCancelJobs() {
  const confirmationColumns = useJobColumns()
  const bulkAction = useBulkConfirmation<Job>()
  const cancelJob = useCancelJob()
  const cancelJobs = (jobs: Job[]) => {
    bulkAction({
      title: jobs.length === 1 ? 'Cancel job' : 'Cancel jobs',
      confirmText: 'Yes, I confirm that I want to cancel.',
      actionButtonText: jobs.length === 1 ? 'Cancel job' : 'Cancel jobs',
      items: jobs.sort((l, r) => compareStrings(l.name, r.name)),
      keyFn: idKeyFn,
      confirmationColumns,
      actionColumns: confirmationColumns,
      actionFn: cancelJob,
    })
  }
  return cancelJobs
}
