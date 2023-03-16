import { IToolbarFilter } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'

export function useTeamFilters() {
  return useMemo<IToolbarFilter[]>(
    () => [
      {
        key: 'teamname',
        label: 'Teamname',
        type: 'string',
        query: 'teamname',
        placeholder: 'Filter by teamname',
      },
      {
        key: 'firstname',
        label: 'First name',
        type: 'string',
        query: 'firstName',
        placeholder: 'Filter by first name',
      },
      {
        key: 'lastname',
        label: 'Last name',
        type: 'string',
        query: 'lastName',
        placeholder: 'Filter by last name',
      },
    ],
    []
  )
}
