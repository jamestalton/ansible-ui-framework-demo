import { IToolbarFilter, ToolbarFilterType } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'

export function useUserFilters() {
  return useMemo<IToolbarFilter[]>(
    () => [
      {
        key: 'username',
        label: 'Username',
        type: ToolbarFilterType.MultiText,
        query: 'username',
        placeholder: 'Filter by username',
        comparison: 'contains',
      },
      {
        key: 'firstname',
        label: 'First name',
        type: ToolbarFilterType.MultiText,
        query: 'firstName',
        placeholder: 'Filter by first name',
        comparison: 'contains',
      },
      {
        key: 'lastname',
        label: 'Last name',
        type: ToolbarFilterType.MultiText,
        query: 'lastName',
        placeholder: 'Filter by last name',
        comparison: 'contains',
      },
    ],
    []
  )
}
