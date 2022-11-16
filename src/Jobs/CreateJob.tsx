import {
  FormPageSubmitHandler,
  PageBody,
  PageForm,
  PageHeader,
  PageLayout,
} from '@ansible/ansible-ui-framework'
import { Static, Type } from '@sinclair/typebox'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useJobs } from './hooks/useJobs'

export function CreateJob() {
  const { createJob } = useJobs()
  const navigate = useNavigate()

  const JobSchemaType = useMemo(
    () =>
      Type.Object({
        name: Type.String({
          title: 'Name',
          placeholder: 'Enter the name', // eslint-disable-line @typescript-eslint/no-unsafe-assignment
          minLength: 1,
          errorMessage: { minLength: 'Name is required' },
        }),
      }),
    []
  )

  type JobSchema = Static<typeof JobSchemaType>

  const onSubmit: FormPageSubmitHandler<JobSchema> = async (job, setError) => {
    try {
      // const _newJob = await requestPost<EdaJob>('/api/Jobs', Job)
      // // navigate(RouteE.replace(':id', newJob.id.toString()))
      await createJob(job)
      navigate('/jobs')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Unknown error')
      }
    }
    return Promise.resolve()
  }
  const onCancel = () => navigate(-1)

  return (
    <PageLayout>
      <PageHeader
        title={'Create Job'}
        breadcrumbs={[{ label: 'Jobs', to: '/jobs' }, { label: 'Create Job' }]}
      />
      <PageBody>
        <PageForm
          schema={JobSchemaType}
          submitText={'Create Job'}
          onSubmit={onSubmit}
          cancelText={'Cancel'}
          onCancel={onCancel}
        />
      </PageBody>
    </PageLayout>
  )
}
