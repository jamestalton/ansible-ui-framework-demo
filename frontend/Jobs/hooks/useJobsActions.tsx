import { ITypedAction, TypedActionType } from '@ansible/ansible-ui-framework'
import { ButtonVariant } from '@patternfly/react-core'
import { PlusIcon, TrashIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { IJob } from './useJobs'

export function useJobsActions() {
  return useMemo<ITypedAction<IJob>[]>(
    () => [
      {
        type: TypedActionType.button,
        icon: PlusIcon,
        label: 'Create job',
        variant: ButtonVariant.primary,
        onClick: () => alert('TODO'),
      },
      {
        type: TypedActionType.bulk,
        icon: TrashIcon,
        label: 'Delete selected jobs',
        onClick: () => alert('TODO'),
      },
    ],
    []
  )
}
