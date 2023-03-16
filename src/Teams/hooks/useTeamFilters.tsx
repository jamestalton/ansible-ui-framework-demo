import { IToolbarFilter } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'

export function useTeamFilters() {
  return useMemo<IToolbarFilter[]>(
    () => [
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        query: 'name',
        placeholder: 'Filter by name',
      },
    ],
    []
  )
}
