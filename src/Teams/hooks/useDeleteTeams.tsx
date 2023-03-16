import { compareStrings, useBulkConfirmation } from '@ansible/ansible-ui-framework'
import { useDelete } from '../../common/dataHooks'
import { idKeyFn } from '../../common/idKeyFn'
import { Team } from '../Team'
import { useTeamColumns } from './useTeamColumns'

export function useDeleteTeams() {
  const confirmationColumns = useTeamColumns()
  const bulkAction = useBulkConfirmation<Team>()
  const deleteTeam = useDelete('teams')
  const deleteTeams = (teams: Team[]) => {
    bulkAction({
      title: teams.length === 1 ? 'Permanently delete team' : 'Permanently delete teams',
      confirmText: 'Yes, I confirm that I want to delete.',
      actionButtonText: teams.length === 1 ? 'Delete team' : 'Delete teams',
      items: teams.sort((l, r) => compareStrings(l.teamname, r.teamname)),
      keyFn: idKeyFn,
      isDanger: true,
      confirmationColumns,
      actionColumns: [confirmationColumns[0], confirmationColumns[1]],
      actionFn: async (team: Team) => deleteTeam(team.id),
    })
  }
  return deleteTeams
}
