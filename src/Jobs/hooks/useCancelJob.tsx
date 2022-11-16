import { useJobData } from '../../common/useJobData'
import { Job } from '../Job'

export function useCancelJob() {
  const { updateJob } = useJobData()
  return async (job: Job) => {
    await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 4000) + 1000))
    if (job.status === 'Running') {
      updateJob(job.id, { status: 'Canceled', finished: new Date(Date.now()).toISOString() })
    }
    return Promise.resolve()
  }
}
