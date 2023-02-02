import { IPageAction, PageActionType } from '@ansible/ansible-ui-framework'
import { ButtonVariant } from '@patternfly/react-core'
import { BanIcon, EditIcon, RocketIcon, TrashIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Job } from '../Job'
import { useCancelJob } from './useCancelJob'
import { useDeleteJobs } from './useDeleteJobs'
import { useLaunchJob } from './useLaunchJob'

export function useJobActions() {
  const deleteJobs = useDeleteJobs()
  const launchJob = useLaunchJob()
  const cancelJob = useCancelJob()

  const navigate = useNavigate()
  return useMemo<IPageAction<Job>[]>(
    () => [
      {
        type: PageActionType.single,
        icon: RocketIcon,
        label: 'Launch job',
        variant: ButtonVariant.primary,
        onClick: (job) => void launchJob(job),
      },
      {
        type: PageActionType.single,
        icon: BanIcon,
        label: 'Cancel job',
        onClick: (job) => void cancelJob(job),
      },
      {
        type: PageActionType.single,
        icon: EditIcon,
        label: 'Edit job',
        variant: ButtonVariant.primary,
        onClick: (job) => navigate(`/jobs/${job.id}/edit`),
      },
      {
        type: PageActionType.single,
        icon: TrashIcon,
        label: 'Delete job',
        onClick: (job) => deleteJobs([job]),
      },
    ],
    [cancelJob, deleteJobs, launchJob, navigate]
  )
}
