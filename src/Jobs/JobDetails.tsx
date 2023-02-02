import {
  PageActions,
  PageDetailsFromColumns,
  PageHeader,
  PageLayout,
  Scrollable,
} from '@ansible/ansible-ui-framework'
import { DropdownPosition, PageSection } from '@patternfly/react-core'
import { useParams } from 'react-router-dom'
import { useJobData } from '../common/useJobData'
import { useJobActions } from './hooks/useJobActions'
import { useJobColumns } from './hooks/useJobColumns'
import { Job } from './Job'

export function JobDetails() {
  const params = useParams<{ id: string }>()
  const id = Number(params.id)
  const { getJob } = useJobData()
  const job = getJob(id)

  const tableColumns = useJobColumns()
  const itemActions = useJobActions()

  return (
    <PageLayout>
      <PageHeader
        title={job?.name}
        breadcrumbs={[{ label: 'Jobs', to: '/jobs' }, { label: job?.name }]}
        headerActions={
          <PageActions<Job>
            actions={itemActions}
            position={DropdownPosition.right}
            selectedItem={job}
          />
        }
      />
      <Scrollable>
        <PageSection variant="light">
          <PageDetailsFromColumns item={job} columns={tableColumns} />
        </PageSection>
      </Scrollable>
    </PageLayout>
  )
}
