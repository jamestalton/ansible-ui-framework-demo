export interface Job {
  id: number
  name: string
  status: JobStatus
  started?: string
  finished?: string
  created: string
  modified?: string
  desiredState?: JobStatus
}

export type JobStatus = '' | 'Running' | 'Failed' | 'Successful' | 'Canceled'
