import {
  PageDashboard,
  PageDashboardCard,
  PageDashboardChart,
  PageDashboardDonutCard,
  PageHeader,
  PageLayout,
  pfSuccess,
} from '@ansible/ansible-ui-framework'
import { CardBody } from '@patternfly/react-core'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useIdbItems } from '../common/IDBProvider'

export function Dashboard() {
  const users = useIdbItems('users')

  // chart data for last 30 days when user was created
  const userData: {
    color: string
    values: {
      label: string
      value: number
    }[]
  }[] = useMemo(() => {
    const data: {
      color: string
      values: {
        label: string
        value: number
      }[]
    }[] = []
    data.push({
      color: pfSuccess,
      values: new Array(30)
        .fill(0)
        .map((_, i) => {
          const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
          return {
            label: date.toISOString().split('T')[0],
            value:
              users?.filter(
                (user) => user.created?.split('T')[0] === date.toISOString().split('T')[0]
              ).length ?? 1,
          }
        })
        .reverse(),
    })
    return data
  }, [users])

  return (
    <PageLayout>
      <PageHeader title="Dashboard" />
      <PageDashboard>
        <UsersCard />
        <TeamsCard />
        <PageDashboardCard height="sm" width="xxl" title="Users Created - Last 30 days">
          <CardBody>
            <PageDashboardChart groups={userData} />
          </CardBody>
        </PageDashboardCard>
      </PageDashboard>
    </PageLayout>
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
