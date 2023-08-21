import { PageDetailsFromColumns, PageHeader } from '@ansible/ansible-ui-framework'
import { Bullseye, Spinner } from '@patternfly/react-core'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useIdbItem } from '../common/IDBProvider'
import { useUserColumns } from './hooks/useUserColumns'

export function UserDetails() {
  const params = useParams<{ id?: string }>()
  const user = useIdbItem('users', params.id)
  const columns = useUserColumns()
  const { t } = useTranslation()

  if (!user) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    )
  }

  return (
    <>
      <PageHeader
        title={user.username}
        breadcrumbs={[{ label: 'Users', to: '/access/users' }, { label: user.username }]}
      />
      <PageDetailsFromColumns columns={columns} item={user} />
    </>
  )
}
