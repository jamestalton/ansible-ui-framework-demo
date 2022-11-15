import {
  AlertToasterProps,
  ITypedAction,
  RunningIcon,
  TypedActionType,
  usePageAlertToaster,
} from '@ansible/ansible-ui-framework'
import { AlertActionLink, ButtonVariant } from '@patternfly/react-core'
import { BanIcon, EditIcon, RocketIcon, TrashIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { Job, JobStatus } from '../Job'

export function useJobActions(setJobStatus: (id: number, status: JobStatus) => void) {
  const pageAlertToaster = usePageAlertToaster()

  return useMemo<ITypedAction<Job>[]>(
    () => [
      {
        type: TypedActionType.single,
        icon: RocketIcon,
        label: 'Launch job',
        variant: ButtonVariant.primary,
        onClick: (job) => {
          const alertProps: AlertToasterProps = {
            variant: 'success',
            customIcon: <RunningIcon />,
            title: `Job "${job.name}" running`,
            actionLinks: (
              <AlertActionLink onClick={() => alert('Clicked on View details')}>
                View details
              </AlertActionLink>
            ),
          }
          setJobStatus(job.id, 'Running')
          pageAlertToaster.addAlert(alertProps)
          setTimeout(() => {
            if (Math.random() < 0.5) {
              pageAlertToaster.replaceAlert(alertProps, {
                variant: 'success',
                title: `Job "${job.name}" successful`,
                timeout: 10000,
                actionLinks: alertProps.actionLinks,
              })
              setJobStatus(job.id, 'Successful')
            } else {
              pageAlertToaster.replaceAlert(alertProps, {
                variant: 'danger',
                title: `Job "${job.name}" failed`,
                actionLinks: alertProps.actionLinks,
              })
              setJobStatus(job.id, 'Failed')
            }
          }, 5000)
        },
      },
      {
        type: TypedActionType.bulk,
        icon: BanIcon,
        label: 'Cancel job',
        onClick: () => alert('TODO'),
      },
      {
        type: TypedActionType.single,
        icon: EditIcon,
        label: 'Edit job',
        variant: ButtonVariant.primary,
        onClick: () => alert('TODO'),
      },
      {
        type: TypedActionType.single,
        icon: TrashIcon,
        label: 'Delete job',
        onClick: () => alert('TODO'),
      },
    ],
    []
  )
}
