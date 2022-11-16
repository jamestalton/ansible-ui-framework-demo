import { useJobData } from '../../common/useJobData'
import { Job } from '../Job'

export function useLaunchJob() {
  const { updateJob } = useJobData()
  return async (job: Job) => {
    await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 4000) + 1000))
    if (job.status === 'Running') return Promise.resolve()
    updateJob(job.id, {
      status: 'Running',
      started: new Date(Date.now()).toISOString(),
      finished: undefined,
    })
    return Promise.resolve()
  }
}
