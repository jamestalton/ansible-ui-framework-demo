import { compareStrings, useBulkConfirmation } from '@ansible/ansible-ui-framework'
import { useIdbDeleteItem } from '../../common/IDBProvider'
import { idKeyFn } from '../../common/idKeyFn'
import { Team } from '../Team'
import { useTeamColumns } from './useTeamColumns'

export function useDeleteTeams() {
  const confirmationColumns = useTeamColumns()
  const bulkAction = useBulkConfirmation<Team>()
  const deleteTeam = useIdbDeleteItem('teams')
  const deleteTeams = (teams: Team[]) => {
    bulkAction({
      title: teams.length === 1 ? 'Permanently delete team' : 'Permanently delete teams',
      confirmText: 'Yes, I confirm that I want to delete.',
      actionButtonText: teams.length === 1 ? 'Delete team' : 'Delete teams',
      items: teams.sort((l, r) => compareStrings(l.name, r.name)),
      keyFn: idKeyFn,
      isDanger: true,
      confirmationColumns,
      actionColumns: [confirmationColumns[0], confirmationColumns[1]],
      actionFn: async (team: Team) => deleteTeam(team.id),
    })
  }
  return deleteTeams
}
