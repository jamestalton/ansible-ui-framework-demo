import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
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
  const [jobs, setJobs] = useState<Job[]>(() =>
    new Array(15).fill(0).map(() => ({
      id: ++id,
      name: `Job ${id}`,
      status: '',
      created: new Date(Date.now()).toISOString(),
    }))
  )

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

  useEffect(() => {
    function tick() {
      setJobs((jobs) => {
        let changed = false
        for (let index = 0; index < jobs.length; index++) {
          const job = { ...jobs[index] }
          switch (job.status) {
            case 'Running':
              if (job.started && Date.now() - new Date(job.started).valueOf() > 5000) {
                if (Math.random() < 0.01) {
                  if (Math.random() < 0.8) {
                    job.status = 'Successful'
                  } else {
                    job.status = 'Failed'
                  }
                  job.finished = new Date(Date.now()).toISOString()
                  jobs[index] = job
                  changed = true
                }
              }
              break
          }
        }
        if (changed) return [...jobs]
        else return jobs
      })
    }
    const timeout = setInterval(() => {
      tick()
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <JobsContext.Provider value={{ jobs, createJob, deleteJob, updateJob, getJob }}>
      {props.children}
    </JobsContext.Provider>
  )
}

let id = 0
