import { compareStrings, useBulkConfirmation } from '@ansible/ansible-ui-framework'
import { useIdbDeleteItem } from '../../common/IDBProvider'
import { idKeyFn } from '../../common/idKeyFn'
import { User } from '../User'
import { useUserColumns } from './useUserColumns'

export function useDeleteUsers() {
  const confirmationColumns = useUserColumns()
  const bulkAction = useBulkConfirmation<User>()
  const deleteUser = useIdbDeleteItem('users')
  const deleteUsers = (users: User[]) => {
    bulkAction({
      title: users.length === 1 ? 'Permanently delete user' : 'Permanently delete users',
      confirmText: 'Yes, I confirm that I want to delete.',
      actionButtonText: users.length === 1 ? 'Delete user' : 'Delete users',
      items: users.sort((l, r) => compareStrings(l.username, r.username)),
      keyFn: idKeyFn,
      isDanger: true,
      confirmationColumns,
      actionColumns: [confirmationColumns[0], confirmationColumns[1]],
      actionFn: async (user: User) => deleteUser(user.id),
    })
  }
  return deleteUsers
}
