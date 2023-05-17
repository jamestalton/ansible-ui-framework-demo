import { IPageAction, PageActionSelection, PageActionType } from '@ansible/ansible-ui-framework'
import { ButtonVariant } from '@patternfly/react-core'
import { EditIcon, TrashIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Team } from '../Team'
import { useDeleteTeams } from './useDeleteTeams'

export function useTeamActions() {
  const deleteTeams = useDeleteTeams()

  const navigate = useNavigate()
  return useMemo<IPageAction<Team>[]>(
    () => [
      {
        type: PageActionType.Button,
        selection: PageActionSelection.Single,
        icon: EditIcon,
        label: 'Edit team',
        variant: ButtonVariant.primary,
        onClick: (team) => navigate(`/ansible-ui-framework-demo/access/teams/${team.id}/edit`),
      },
      {
        type: PageActionType.Button,
        selection: PageActionSelection.Single,
        icon: TrashIcon,
        label: 'Delete team',
        onClick: (team) => deleteTeams([team]),
        isDanger: true,
      },
    ],
    [deleteTeams, navigate]
  )
}
