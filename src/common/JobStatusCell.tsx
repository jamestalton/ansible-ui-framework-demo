import { RunningIcon, TextCell } from '@ansible/ansible-ui-framework'
import { BanIcon, CheckCircleIcon, ExclamationCircleIcon } from '@patternfly/react-icons'
import { JobStatus } from '../Jobs/hooks/useJobs'

export function JobStatusCell(props: { status: JobStatus }) {
  switch (props.status) {
    case 'Running':
      return <TextCell icon={<RunningIcon />} text={props.status} />
    case 'Successful':
      return <TextCell icon={<CheckCircleIcon />} text={props.status} />
    case 'Failed':
      return <TextCell icon={<ExclamationCircleIcon />} text={props.status} />
    case 'Cancelled':
      return <TextCell icon={<BanIcon />} text={props.status} />
    default:
      return <></>
  }
}
