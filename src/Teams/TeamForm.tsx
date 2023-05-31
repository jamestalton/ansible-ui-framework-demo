import {
  PageForm,
  PageFormSubmitHandler,
  PageFormTextArea,
  PageFormTextInput,
  PageHeader,
  PageLayout,
} from '@ansible/ansible-ui-framework'
import { Bullseye, Spinner } from '@patternfly/react-core'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useIdbItem, useIdbPutItem } from '../common/IDBProvider'
import { Team } from './Team'

export function CreateTeam() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const createTeam = useIdbPutItem('teams')

  const onSubmit: PageFormSubmitHandler<Team> = async (team, setError) => {
    try {
      await createTeam(team)
      navigate(-1)
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Unknown error')
    }
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Teams', to: '/access/teams' }, { label: 'Create team' }]}
        title={'Create team'}
      />
      <PageForm<Team>
        submitText={t('Create team')}
        onSubmit={onSubmit}
        onCancel={() => navigate(-1)}
      >
        <TeamInputs />
      </PageForm>
    </>
  )
}

export function EditTeam() {
  const params = useParams<{ id?: string }>()
  const id = Number(params.id)
  const team = useIdbItem('teams', id)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const updateTeam = useIdbPutItem('teams')

  if (!team) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    )
  }

  const onSubmit: PageFormSubmitHandler<Team> = async (team, setError) => {
    try {
      await updateTeam(team)
      navigate(-1)
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Unknown error')
    }
  }

  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[{ label: 'Teams', to: '/access/teams' }, { label: 'Edit Team' }]}
        title={'Edit Team'}
      />
      <PageForm<Team>
        submitText={t('Save team')}
        onSubmit={onSubmit}
        onCancel={() => navigate(-1)}
        defaultValue={team}
      >
        <TeamInputs />
      </PageForm>
    </PageLayout>
  )
}

export function TeamInputs() {
  const { t } = useTranslation()

  return (
    <>
      <PageFormTextInput<Team>
        label={t('Name')}
        name="name"
        placeholder={t('Enter name') ?? undefined}
        isRequired
        minLength={3}
      />
      <PageFormTextArea<Team>
        label={t('Description')}
        name="description"
        placeholder={t('Enter description') ?? undefined}
      />
    </>
  )
}
