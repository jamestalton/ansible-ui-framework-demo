import { BulkActionDialog, compareStrings, usePageDialog } from '@ansible/ansible-ui-framework'
import { idKeyFn } from '../../common/idKeyFn'
import { Job } from '../Job'
import { useJobColumns } from './useJobColumns'
import { useJobs } from './useJobs'

export function useDeleteJobs() {
  const [_, setDialog] = usePageDialog()
  const columns = useJobColumns()
  const errorColumns = columns
  const { deleteJob } = useJobs()
  const deleteJobs = (items: Job[]) => {
    setDialog(
      <BulkActionDialog<Job>
        title={'Permanently delete jobs'}
        confirmText={'Yes, I confirm that I want to delete these {{count}} jobs.'}
        submitText={'Delete jobs'}
        submitting={'Deleting jobs'}
        submittingTitle={'Deleting {{count}} jobs'}
        error={'There were errors deleting jobs'}
        items={items.sort((l, r) => compareStrings(l.name, r.name))}
        keyFn={idKeyFn}
        isDanger
        columns={columns}
        errorColumns={errorColumns}
        action={(job: Job) => {
          deleteJob(job)
          return Promise.resolve()
        }}
      />
    )
  }
  return deleteJobs
}
