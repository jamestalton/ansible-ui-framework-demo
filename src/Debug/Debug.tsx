import { PageHeader, PageLayout } from '@ansible/ansible-ui-framework'
import { Button } from '@patternfly/react-core'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { UserType } from '../Users/User'
import { useCreate } from '../common/dataHooks'

export function Debug() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const createUser = useCreate('users')
  const createUsers = useCallback(() => {
    void fetch('https://hp-api.onrender.com/api/characters/students').then((response) => {
      if (response.ok) {
        void response.json().then((students: { name: string }[]) => {
          for (const student of students) {
            void createUser({
              username: student.name,
              userType: UserType.Member,
            })
          }
        })
      }
    })
    navigate('/ansible-ui-framework-demo/access/users')
  }, [createUser, navigate])

  return (
    <PageLayout>
      <PageHeader title="Debug" />
      <Button onClick={createUsers}>{t('Create users')}</Button>
    </PageLayout>
  )
}
