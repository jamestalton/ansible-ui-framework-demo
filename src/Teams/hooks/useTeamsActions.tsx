import { IPageAction, PageActionSelection, PageActionType } from '@ansible/ansible-ui-framework'
import { ButtonVariant } from '@patternfly/react-core'
import { PlusIcon, TrashIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Team } from '../Team'
import { useDeleteTeams } from './useDeleteTeams'

export function useTeamsActions() {
  const navigate = useNavigate()
  const deleteTeams = useDeleteTeams()
  return useMemo<IPageAction<Team>[]>(
    () => [
      {
        type: PageActionType.Button,
        selection: PageActionSelection.None,
        icon: PlusIcon,
        label: 'Create team',
        variant: ButtonVariant.primary,
        onClick: () => navigate('/access/teams/create'),
      },
      {
        type: PageActionType.Button,
        selection: PageActionSelection.Multiple,
        icon: TrashIcon,
        label: 'Delete selected teams',
        onClick: deleteTeams,
        isDanger: true,
      },
    ],
    [deleteTeams, navigate]
  )
}
