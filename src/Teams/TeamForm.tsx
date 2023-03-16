import {
  PageForm,
  PageFormSubmitHandler,
  PageFormTextArea,
  PageFormTextInput,
  PageHeader,
  PageLayout,
} from '@ansible/ansible-ui-framework'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCreate } from '../common/dataHooks'
import { Team } from './Team'

export function CreateTeam() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const createTeam = useCreate('teams')

  const onSubmit: PageFormSubmitHandler<Team> = async (team, setError) => {
    try {
      await createTeam(team)
      navigate(-1)
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Unknown error')
    }
  }

  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[{ label: 'Teams', to: '/teams' }, { label: 'Create Team' }]}
        title={'Create Team'}
      />
      <PageForm<Team>
        submitText={t('Create Team')}
        onSubmit={onSubmit}
        onCancel={() => navigate(-1)}
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
