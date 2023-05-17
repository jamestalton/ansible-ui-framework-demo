import { ITableColumn, TextCell } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'
import { Team } from '../Team'

export function useTeamColumns() {
  return useMemo<ITableColumn<Team>[]>(
    () => [
      {
        header: 'ID',
        type: 'text',
        value: (team) => team.id.toString(),
        sort: 'id',
        card: 'hidden',
        list: 'hidden',
        minWidth: 0,
        enabled: false,
      },
      {
        header: 'Name',
        cell: (team) => <TextCell text={team.name} to={`/access/teams/${team.id}`} />,
        sort: 'name',
        primary: true,
        card: 'name',
        list: 'name',
        defaultSort: true,
      },
      {
        header: 'Created',
        type: 'datetime',
        value: (team) => team.created,
        defaultSortDirection: 'desc',
        sort: 'created',
        list: 'secondary',
        card: 'hidden',
      },
      {
        header: 'Modified',
        type: 'datetime',
        value: (team) => team.modified,
        defaultSortDirection: 'desc',
        sort: 'modified',
        list: 'secondary',
        card: 'hidden',
      },
    ],
    []
  )
}
