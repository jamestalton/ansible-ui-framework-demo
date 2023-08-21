import { IToolbarFilter, ToolbarFilterType } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'

export function useTeamFilters() {
  return useMemo<IToolbarFilter[]>(
    () => [
      {
        key: 'name',
        label: 'Name',
        type: ToolbarFilterType.Text,
        query: 'name',
        placeholder: 'Filter by name',
        comparison: 'contains',
      },
    ],
    []
  )
}
