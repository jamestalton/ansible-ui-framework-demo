import { ITypedAction, TypedActionType } from '@ansible/ansible-ui-framework'
import { ButtonVariant } from '@patternfly/react-core'
import { BanIcon, EditIcon, RocketIcon, TrashIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Job } from '../Job'
import { useDeleteJobs } from './useDeleteJobs'
import { useJobs } from './useJobs'
import { useLaunchJob } from './useLaunchJob'

export function useJobActions() {
  const launchJob = useLaunchJob()
  const { updateJob } = useJobs()
  const deleteJobs = useDeleteJobs()
  const navigate = useNavigate()
  return useMemo<ITypedAction<Job>[]>(
    () => [
      {
        type: TypedActionType.single,
        icon: RocketIcon,
        label: 'Launch job',
        variant: ButtonVariant.primary,
        onClick: launchJob,
      },
      {
        type: TypedActionType.single,
        icon: BanIcon,
        label: 'Cancel job',
        onClick: (job) => {
          void updateJob(job.id, { status: 'Cancelled' })
        },
      },
      {
        type: TypedActionType.single,
        icon: EditIcon,
        label: 'Edit job',
        variant: ButtonVariant.primary,
        onClick: (job) => navigate(`/jobs/${job.id}/edit`),
      },
      {
        type: TypedActionType.single,
        icon: TrashIcon,
        label: 'Delete job',
        onClick: (job) => deleteJobs([job]),
      },
    ],
    [deleteJobs, launchJob, navigate, updateJob]
  )
}
