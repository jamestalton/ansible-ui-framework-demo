import { IPageAction, PageActionType } from '@ansible/ansible-ui-framework'
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
        type: PageActionType.button,
        icon: PlusIcon,
        label: 'Create team',
        variant: ButtonVariant.primary,
        onClick: () => navigate('/access/teams/create'),
      },
      {
        type: PageActionType.bulk,
        icon: TrashIcon,
        label: 'Delete selected teams',
        onClick: deleteTeams,
        isDanger: true,
      },
    ],
    [deleteTeams, navigate]
  )
}