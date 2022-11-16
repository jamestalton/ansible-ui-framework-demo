import { Job } from '../Job'
import { useJobs } from './useJobs'

export function useCancelJob() {
  const { updateJob } = useJobs()
  return (job: Job) => {
    if (job.status === 'Running') {
      updateJob(job.id, { status: 'Cancelled', finished: new Date(Date.now()).toISOString() })
    }
    return Promise.resolve()
  }
}
