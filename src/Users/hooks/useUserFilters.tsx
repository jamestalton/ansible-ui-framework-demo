import { IToolbarFilter } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'

export function useUserFilters() {
  return useMemo<IToolbarFilter[]>(
    () => [
      {
        key: 'username',
        label: 'Username',
        type: 'string',
        query: 'username',
        placeholder: 'Filter by username',
        comparison: 'contains',
      },
      {
        key: 'firstname',
        label: 'First name',
        type: 'string',
        query: 'firstName',
        placeholder: 'Filter by first name',
        comparison: 'contains',
      },
      {
        key: 'lastname',
        label: 'Last name',
        type: 'string',
        query: 'lastName',
        placeholder: 'Filter by last name',
        comparison: 'contains',
      },
    ],
    []
  )
}
