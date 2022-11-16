import { AlertToasterProps, RunningIcon, usePageAlertToaster } from '@ansible/ansible-ui-framework'
import { AlertActionLink } from '@patternfly/react-core'
import { useNavigate } from 'react-router-dom'
import { Job } from '../Job'
import { useJobs } from './useJobs'

export function useLaunchJob() {
  const { updateJob } = useJobs()
  const { addAlert, replaceAlert } = usePageAlertToaster()
  const navigate = useNavigate()
  return (job: Job) => {
    const alertProps: AlertToasterProps = {
      variant: 'success',
      customIcon: <RunningIcon />,
      title: `Job "${job.name}" running`,
      actionLinks: (
        <AlertActionLink onClick={() => navigate(`/jobs/${job.id}`, { replace: true })}>
          View details
        </AlertActionLink>
      ),
    }
    addAlert(alertProps)
    updateJob(job.id, {
      status: 'Running',
      modified: new Date(Date.now()).toISOString(),
      started: new Date(Date.now()).toISOString(),
    })
    setTimeout(() => {
      if (Math.random() < 0.5) {
        replaceAlert(alertProps, {
          variant: 'success',
          title: `Job "${job.name}" successful`,
          timeout: 10000,
          actionLinks: alertProps.actionLinks,
        })
        updateJob(job.id, { status: 'Successful', finished: new Date(Date.now()).toISOString() })
      } else {
        replaceAlert(alertProps, {
          variant: 'danger',
          title: `Job "${job.name}" failed`,
          actionLinks: alertProps.actionLinks,
        })
        updateJob(job.id, { status: 'Failed', finished: new Date(Date.now()).toISOString() })
      }
    }, 5000)
  }
}
