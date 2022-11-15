import {
  AlertToasterProps,
  ITypedAction,
  TypedActionType,
  usePageAlertToaster,
} from '@ansible/ansible-ui-framework'
import { AlertActionLink, ButtonVariant } from '@patternfly/react-core'
import { EditIcon, RocketIcon, TrashIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { RunningIcon } from '../../common/RunningIcon'
import { IJob } from './useJobs'

export function useJobActions() {
  const pageAlertToaster = usePageAlertToaster()

  return useMemo<ITypedAction<IJob>[]>(
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
          pageAlertToaster.addAlert(alertProps)
          setTimeout(() => {
            pageAlertToaster.replaceAlert(alertProps, {
              variant: 'success',
              title: `Job "${job.name}" completed`,
              timeout: 10000,
              actionLinks: alertProps.actionLinks,
            })
          }, 5000)
        },
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
