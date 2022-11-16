import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { Job } from '../Job'

export type Jobs = {
  jobs: Job[]
  createJob: (job: { name: string }) => void
  deleteJob: (job: Job) => void
  updateJob: (id: number, job: Partial<Job>) => void
  getJob: (id: number) => Job | undefined
}

export const JobsContext = createContext<Jobs>({
  jobs: [],
  createJob: () => null,
  deleteJob: () => null,
  updateJob: () => null,
  getJob: () => undefined,
})

export function useJobs() {
  return useContext(JobsContext)
}

export function JobsProvider(props: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([])

  const createJob = useCallback((job: { name: string }) => {
    setJobs((jobs) => {
      return [
        ...jobs,
        {
          id: ++id,
          name: job.name,
          status: '',
          created: new Date(Date.now()).toISOString(),
        },
      ]
    })
  }, [])

  const deleteJob = useCallback((job: Job) => {
    setJobs((jobs) => jobs.filter((j) => j.id !== job.id))
  }, [])

  const updateJob = useCallback((id: number, update: Partial<Job>) => {
    setJobs((jobs) => {
      const jobIndex = jobs.findIndex((job) => job.id === id)
      if (jobIndex !== -1) {
        jobs[jobIndex] = { ...jobs[jobIndex], ...update }
        return [...jobs]
      }
      return jobs
    })
  }, [])

  const getJob = (id: number) => {
    // await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 4000) + 1000))
    return jobs.find((job) => job.id === id)
  }

  return (
    <JobsContext.Provider value={{ jobs, createJob, deleteJob, updateJob, getJob }}>
      {props.children}
    </JobsContext.Provider>
  )
}

let id = 0
