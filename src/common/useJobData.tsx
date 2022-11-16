/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { Job } from '../Jobs/Job'

export type Jobs = {
  jobs: Job[] | undefined
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

export function useJobData() {
  return useContext(JobsContext)
}

export function JobsProvider(props: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>()

  const createJob = useCallback((job: { name: string }) => {
    setJobs((jobs) => {
      jobs = jobs ? [...jobs] : []
      jobs?.push({
        id: ++id,
        name: job.name,
        status: '',
        created: new Date(Date.now()).toISOString(),
      })
      return jobs
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      createJob({ name: 'Job A' })
      createJob({ name: 'Job B' })
      createJob({ name: 'Job C' })
      createJob({ name: 'Job D' })
      createJob({ name: 'Job E' })
      createJob({ name: 'Job F' })
      createJob({ name: 'Job G' })
      createJob({ name: 'Job H' })
      createJob({ name: 'Job I' })
      createJob({ name: 'Job J' })
      createJob({ name: 'Job K' })
      createJob({ name: 'Job L' })
    }, 1000)
  }, [createJob])

  const deleteJob = useCallback((job: Job) => {
    setJobs((jobs) => jobs?.filter((j) => j.id !== job.id))
  }, [])

  const updateJob = useCallback((id: number, update: Partial<Job>) => {
    setJobs((jobs) => {
      const jobIndex = jobs?.findIndex((job) => job.id === id)
      if (jobIndex !== undefined && jobIndex !== -1) {
        jobs![jobIndex] = { ...jobs![jobIndex], ...update }
        return [...jobs!]
      }
      return jobs
    })
  }, [])

  const getJob = (id: number) => {
    return jobs?.find((job) => job.id === id)
  }

  useEffect(() => {
    function tick() {
      setJobs((jobs) => {
        if (jobs) {
          for (let index = 0; index < jobs.length; index++) {
            const job = { ...jobs[index] }

            switch (job.desiredState) {
              case 'Canceled':
                switch (job.status) {
                  case 'Running':
                    updateJob(job.id, { status: 'Canceled' })
                    break
                }
                break
            }

            switch (job.status) {
              case 'Running':
                if (job.started && Date.now() - new Date(job.started).valueOf() > 5000) {
                  if (Math.random() < 0.01) {
                    if (Math.random() < 0.8) {
                      updateJob(job.id, {
                        status: 'Successful',
                        finished: new Date(Date.now()).toISOString(),
                      })
                    } else {
                      updateJob(job.id, {
                        status: 'Failed',
                        finished: new Date(Date.now()).toISOString(),
                      })
                    }
                  }
                }
                break
            }
          }
        }
        return jobs
      })
    }
    const timeout = setInterval(() => {
      tick()
    }, 100)
    return () => clearTimeout(timeout)
  }, [updateJob])

  return (
    <JobsContext.Provider value={{ jobs, createJob, deleteJob, updateJob, getJob }}>
      {props.children}
    </JobsContext.Provider>
  )
}

let id = 0
