import {
  PageHeader,
  PageLayout,
  Scrollable,
  TableDetails,
  TypedActions,
} from '@ansible/ansible-ui-framework'
import { DropdownPosition, PageSection } from '@patternfly/react-core'
import { useParams } from 'react-router-dom'
import { useJobActions } from './hooks/useJobActions'
import { useJobColumns } from './hooks/useJobColumns'
import { useJobs } from './hooks/useJobs'
import { Job } from './Job'

export function JobDetails() {
  const params = useParams<{ id: string }>()
  const id = Number(params.id)
  const { getJob } = useJobs()
  const job = getJob(id)

  const tableColumns = useJobColumns()
  const itemActions = useJobActions()

  return (
    <PageLayout>
      <PageHeader
        title={job?.name}
        breadcrumbs={[{ label: 'Jobs', to: '/jobs' }, { label: job?.name }]}
        headerActions={
          <TypedActions<Job>
            actions={itemActions}
            position={DropdownPosition.right}
            selectedItem={job}
          />
        }
      />
      <Scrollable>
        <PageSection variant="light">
          <TableDetails item={job} columns={tableColumns} />
        </PageSection>
      </Scrollable>
    </PageLayout>
  )
}
