import { ITypedAction, TypedActionType } from '@ansible/ansible-ui-framework'
import { ButtonVariant } from '@patternfly/react-core'
import { EditIcon, RocketIcon, TrashIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { IJob } from './useJobs'

export function useJobActions() {
  return useMemo<ITypedAction<IJob>[]>(
    () => [
      {
        type: TypedActionType.single,
        icon: RocketIcon,
        label: 'Launch job',
        variant: ButtonVariant.primary,
        onClick: () => alert('TODO'),
      },
      {
        type: TypedActionType.single,
        icon: EditIcon,
        label: 'Edit job',
        variant: ButtonVariant.primary,
        onClick: () => alert('TODO'),
      },
      {
        type: TypedActionType.single,
        icon: TrashIcon,
        label: 'Delete job',
        onClick: () => alert('TODO'),
      },
    ],
    []
  )
}
