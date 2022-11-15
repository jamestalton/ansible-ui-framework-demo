import { useEffect, useState } from 'react'

export interface IJob {
  id: number
  name: string
  status: 'Running' | 'Failed' | 'Successful'
}

let id = 0

export function useJobs(initialCount: number, interval: number) {
  const [jobs, setJobs] = useState<IJob[]>([])
  useEffect(() => {
    function createJob() {
      setJobs((jobs) => {
        id++
        return [
          ...jobs,
          { id: id, name: `Job ${id.toString().padStart(4, '0')}`, status: 'Running' },
        ]
      })
    }
    for (let i = 0; i < initialCount; i++) {
      createJob()
    }
    const timeout = setInterval(() => {
      createJob()
    }, interval)
    return () => clearInterval(timeout)
  }, [initialCount, interval])
  return {
    jobs,
  }
}
