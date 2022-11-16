import {
  FormPageSubmitHandler,
  PageBody,
  PageForm,
  PageHeader,
  PageLayout,
} from '@ansible/ansible-ui-framework'
import { Static, Type } from '@sinclair/typebox'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useJobData } from '../common/useJobData'

export function EditJob() {
  const params = useParams<{ id?: string }>()
  const id = Number(params.id)

  const { getJob, updateJob } = useJobData()
  const job = getJob(id)

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
      updateJob(id, { ...job, modified: new Date(Date.now()).toISOString() })
      navigate(-1)
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

  if (!job) {
    return (
      <PageLayout>
        <PageHeader breadcrumbs={[{ label: 'Jobs', to: '/jobs' }, { label: 'Edit Job' }]} />
      </PageLayout>
    )
  } else {
    return (
      <PageLayout>
        <PageHeader
          title={'Edit Job'}
          breadcrumbs={[{ label: 'Jobs', to: '/jobs' }, { label: 'Edit Job' }]}
        />
        <PageBody>
          <PageForm
            schema={JobSchemaType}
            submitText={'Save Job'}
            onSubmit={onSubmit}
            cancelText={'Cancel'}
            onCancel={onCancel}
            defaultValue={job}
          />
        </PageBody>
      </PageLayout>
    )
  }
}
