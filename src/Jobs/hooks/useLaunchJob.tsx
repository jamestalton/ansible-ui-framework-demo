import { Job } from '../Job'
import { useJobs } from './useJobs'

export function useLaunchJob() {
  const { updateJob } = useJobs()
  return (job: Job) => {
    if (job.status === 'Running') return Promise.resolve()
    updateJob(job.id, {
      status: 'Running',
      started: new Date(Date.now()).toISOString(),
      finished: undefined,
    })
  }
}
