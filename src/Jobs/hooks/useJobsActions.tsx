import { ITypedAction, TypedActionType } from '@ansible/ansible-ui-framework'
import { ButtonVariant } from '@patternfly/react-core'
import { BanIcon, PlusIcon, RocketIcon, TrashIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Job } from '../Job'
import { useDeleteJobs } from './useDeleteJobs'

export function useJobsActions() {
  const navigate = useNavigate()
  const deleteJobs = useDeleteJobs()
  return useMemo<ITypedAction<Job>[]>(
    () => [
      {
        type: TypedActionType.button,
        icon: PlusIcon,
        label: 'Create job',
        variant: ButtonVariant.primary,
        onClick: () => navigate('/jobs/create'),
      },
      {
        type: TypedActionType.bulk,
        icon: RocketIcon,
        label: 'Run selected jobs',
        onClick: () => alert('TODO'),
      },
      {
        type: TypedActionType.bulk,
        icon: BanIcon,
        label: 'Cancel selected jobs',
        onClick: () => alert('TODO'),
      },
      {
        type: TypedActionType.bulk,
        icon: TrashIcon,
        label: 'Delete selected jobs',
        onClick: (jobs) => deleteJobs(jobs),
      },
    ],
    [deleteJobs, navigate]
  )
}
