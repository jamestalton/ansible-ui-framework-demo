import { IPageAction, PageActionSelection, PageActionType } from '@ansible/ansible-ui-framework'
import { ButtonVariant } from '@patternfly/react-core'
import { EditIcon, TrashIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../User'
import { useDeleteUsers } from './useDeleteUsers'

export function useUserActions() {
  const deleteUsers = useDeleteUsers()

  const navigate = useNavigate()
  return useMemo<IPageAction<User>[]>(
    () => [
      {
        type: PageActionType.Button,
        selection: PageActionSelection.Single,
        icon: EditIcon,
        label: 'Edit user',
        variant: ButtonVariant.primary,
        onClick: (user) => navigate(`/access/users/${user.id}/edit`),
      },
      {
        type: PageActionType.Button,
        selection: PageActionSelection.Single,
        icon: TrashIcon,
        label: 'Delete user',
        onClick: (user) => deleteUsers([user]),
        isDanger: true,
      },
    ],
    [deleteUsers, navigate]
  )
}
