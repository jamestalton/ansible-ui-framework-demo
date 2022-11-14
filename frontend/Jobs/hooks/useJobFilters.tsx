import { IToolbarFilter } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'

export function useJobFilters() {
  return useMemo<IToolbarFilter[]>(
    () => [
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        query: 'name',
        placeholder: 'Filter by name',
      },
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        query: 'status',
        options: ['Successful', 'Failed', 'Running'].map((o) => ({ label: o, value: o })),
        placeholder: 'Filter by status',
      },
    ],
    []
  )
}
