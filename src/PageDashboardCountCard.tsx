import { PageDashboardCard } from '@ansible/ansible-ui-framework'
import { CardBody, Flex } from '@patternfly/react-core'

export type PageDashboardCountCardProps = {
  title: string
  linkText?: string
  to?: string
  count: number
}

export function PageDashboardCountCard(props: PageDashboardCountCardProps) {
  return (
    <PageDashboardCard width="xs" height="xs" {...props}>
      <CardBody>
        <Flex
          direction={{ default: 'column' }}
          spaceItems={{ default: 'spaceItemsNone' }}
          alignItems={{ default: 'alignItemsCenter' }}
        >
          <span style={{ fontSize: 'xxx-large', lineHeight: 1.1 }}>{props.count}</span>
          <span style={{ fontSize: 'x-large', opacity: 0.7 }}>{props.title}</span>
        </Flex>
      </CardBody>
    </PageDashboardCard>
  )
}
