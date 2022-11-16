import { compareStrings, useBulkConfirmation } from '@ansible/ansible-ui-framework'
import { idKeyFn } from '../../common/idKeyFn'
import { Job } from '../Job'
import { useJobColumns } from './useJobColumns'
import { useLaunchJob } from './useLaunchJob'

export function useLaunchJobs() {
  const confirmationColumns = useJobColumns()
  const bulkAction = useBulkConfirmation<Job>()
  const launchJob = useLaunchJob()
  const launchJobs = (jobs: Job[]) => {
    bulkAction({
      title: jobs.length === 1 ? 'Launch job' : 'Launch jobs',
      confirmText: 'Yes, I confirm that I want to launch.',
      actionButtonText: jobs.length === 1 ? 'Launch job' : 'Launch jobs',
      items: jobs.sort((l, r) => compareStrings(l.name, r.name)),
      keyFn: idKeyFn,
      confirmationColumns,
      actionColumns: [confirmationColumns[0], confirmationColumns[1]],
      actionFn: launchJob,
    })
  }
  return launchJobs
}
