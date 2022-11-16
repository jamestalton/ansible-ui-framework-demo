import { RunningIcon, TextCell } from '@ansible/ansible-ui-framework'
import { BanIcon, CheckCircleIcon, ExclamationCircleIcon } from '@patternfly/react-icons'
import { JobStatus } from '../Jobs/Job'

export function JobStatusCell(props: { status: JobStatus }) {
  switch (props.status) {
    case 'Running':
      return <TextCell icon={<RunningIcon />} text={props.status} color="info" />
    case 'Successful':
      return <TextCell icon={<CheckCircleIcon />} text={props.status} color="success" />
    case 'Failed':
      return <TextCell icon={<ExclamationCircleIcon />} text={props.status} color="danger" />
    case 'Canceled':
      return <TextCell icon={<BanIcon />} text={props.status} color="disabled" />
    default:
      return <></>
  }
}
