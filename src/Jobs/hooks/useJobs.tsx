import { useCallback, useEffect, useState } from 'react'
import { Job, JobStatus } from '../Job'

let id = 0

export function useJobs(initialCount: number, interval: number) {
  const [jobs, setJobs] = useState<Job[]>([])

  const createJob = useCallback(() => {
    setJobs((jobs) => {
      id++
      return [
        ...jobs,
        {
          id: id,
          name: `Job ${id.toString().padStart(4, '0')}`,
          status: '',
          created: new Date(Date.now()).toISOString(),
        },
      ]
    })
  }, [])

  const deleteJob = useCallback((id: number) => {
    setJobs((jobs) => jobs.filter((job) => job.id !== id))
  }, [])

  const setJobStatus = useCallback((id: number, status: JobStatus) => {
    setJobs((jobs) => {
      const job = jobs.find((job) => job.id === id)
      if (job) {
        switch (status) {
          case 'Running':
            job.modified = new Date(Date.now()).toISOString()
            job.started = new Date(Date.now()).toISOString()
            break
          case 'Successful':
          case 'Failed':
            job.finished = new Date(Date.now()).toISOString()
            break
        }
        job.status = status
        return [...jobs]
      }
      return jobs
    })
  }, [])

  useEffect(() => {
    for (let i = 0; i < initialCount; i++) {
      createJob()
    }
    const timeout = setInterval(() => {
      createJob()
    }, interval)
    return () => clearInterval(timeout)
  }, [createJob, initialCount, interval])

  return {
    jobs,
    createJob,
    deleteJob,
    setJobStatus,
  }
}
