import {
  PageDashboard,
  PageDashboardDonutCard,
  PageHeader,
  pfSuccess,
} from '@ansible/ansible-ui-framework'
import { useTranslation } from 'react-i18next'
import { PageDashboardCountCard } from '../PageDashboardCountCard'
import { useIdbItems } from '../common/IDBProvider'

export function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <PageDashboard>
        <UsersCard />
        <TeamsCard />
      </PageDashboard>
      <PageDashboard>
        <UsersCountCard />
        <TeamsCountCard />
      </PageDashboard>
    </>
  )
}

function UsersCard() {
  const { t } = useTranslation()
  const users = useIdbItems('users')
  return (
    <PageDashboardDonutCard
      title={t('Users')}
      linkText={t('Go to Users')}
      to="/access/users"
      items={[{ label: t('Users'), count: users?.length ?? 0, color: pfSuccess }]}
    />
  )
}

function UsersCountCard() {
  const { t } = useTranslation()
  const users = useIdbItems('users')
  return (
    <PageDashboardCountCard
      title={t('Users')}
      linkText={t('Go to Users')}
      to="/access/users"
      count={users?.length ?? 0}
    />
  )
}

function TeamsCard() {
  const { t } = useTranslation()
  const teams = useIdbItems('teams')
  return (
    <PageDashboardDonutCard
      title={t('Teams')}
      linkText={t('Go to Teams')}
      to="/access/teams"
      items={[{ label: t('Teams'), count: teams?.length ?? 0, color: pfSuccess }]}
    />
  )
}

function TeamsCountCard() {
  const { t } = useTranslation()
  const teams = useIdbItems('teams')
  return (
    <PageDashboardCountCard
      title={t('Teams')}
      linkText={t('Go to Teams')}
      to="/access/teams"
      count={teams?.length ?? 0}
    />
  )
}
