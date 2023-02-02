import { IPageAction, PageActionType } from '@ansible/ansible-ui-framework'
import { ButtonVariant } from '@patternfly/react-core'
import { BanIcon, PlusIcon, RocketIcon, TrashIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Job } from '../Job'
import { useCancelJobs } from './useCancelJobs'
import { useDeleteJobs } from './useDeleteJobs'
import { useLaunchJobs } from './useLaunchJobs'

export function useJobsActions() {
  const navigate = useNavigate()
  const cancelJobs = useCancelJobs()
  const deleteJobs = useDeleteJobs()
  const launchJobs = useLaunchJobs()
  return useMemo<IPageAction<Job>[]>(
    () => [
      {
        type: PageActionType.button,
        icon: PlusIcon,
        label: 'Create job',
        variant: ButtonVariant.primary,
        onClick: () => navigate('/jobs/create'),
      },
      {
        type: PageActionType.bulk,
        icon: RocketIcon,
        label: 'Launch selected jobs',
        onClick: launchJobs,
      },
      {
        type: PageActionType.bulk,
        icon: BanIcon,
        label: 'Cancel selected jobs',
        onClick: cancelJobs,
      },
      {
        type: PageActionType.bulk,
        icon: TrashIcon,
        label: 'Delete selected jobs',
        onClick: deleteJobs,
      },
    ],
    [cancelJobs, deleteJobs, launchJobs, navigate]
  )
}
