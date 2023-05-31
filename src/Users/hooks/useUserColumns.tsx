import { ITableColumn, TextCell } from '@ansible/ansible-ui-framework'
import { useMemo } from 'react'
import { User } from '../User'

export function useUserColumns() {
  return useMemo<ITableColumn<User>[]>(
    () => [
      {
        header: 'ID',
        type: 'text',
        value: (user) => user.id.toString(),
        sort: 'id',
        card: 'hidden',
        list: 'hidden',
        minWidth: 0,
        enabled: false,
      },
      {
        header: 'Username',
        cell: (user: User) => <TextCell text={user.username} to={`/access/users/${user.id}`} />,
        sort: 'username',
        primary: true,
        card: 'name',
        list: 'name',
        defaultSort: true,
      },
      {
        header: 'Type',
        cell: (user) => user.userType,
        sort: 'username',
        card: 'subtitle',
        list: 'subtitle',
      },
      {
        header: 'First name',
        type: 'text',
        value: (user) => user.firstName,
        sort: 'firstName',
      },
      {
        header: 'Last name',
        type: 'text',
        value: (user) => user.lastName,
        sort: 'lastName',
      },
      {
        header: 'Created',
        type: 'datetime',
        value: (user) => user.created,
        defaultSortDirection: 'desc',
        sort: 'created',
        list: 'secondary',
        card: 'hidden',
      },
      {
        header: 'Modified',
        type: 'datetime',
        value: (user) => user.modified,
        defaultSortDirection: 'desc',
        sort: 'modified',
        list: 'secondary',
        card: 'hidden',
      },
    ],
    []
  )
}
