import { IPageAction, PageActionSelection, PageActionType } from '@ansible/ansible-ui-framework'
import { ButtonVariant } from '@patternfly/react-core'
import { PlusIcon, TrashIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../User'
import { useDeleteUsers } from './useDeleteUsers'

export function useUsersActions() {
  const navigate = useNavigate()
  const deleteUsers = useDeleteUsers()
  return useMemo<IPageAction<User>[]>(
    () => [
      {
        type: PageActionType.Button,
        selection: PageActionSelection.Single,
        icon: PlusIcon,
        label: 'Create user',
        variant: ButtonVariant.primary,
        onClick: () => navigate('/ansible-ui-framework-demo/access/users/create'),
      },
      {
        type: PageActionType.Button,
        selection: PageActionSelection.Multiple,
        icon: TrashIcon,
        label: 'Delete selected users',
        onClick: deleteUsers,
        isDanger: true,
      },
    ],
    [deleteUsers, navigate]
  )
}
