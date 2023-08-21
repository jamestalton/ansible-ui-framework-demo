import {
  PageForm,
  PageFormSelect,
  PageFormSubmitHandler,
  PageFormTextInput,
  PageHeader,
  PageLayout,
} from '@ansible/ansible-ui-framework'
import { Bullseye, Spinner } from '@patternfly/react-core'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useIdbItem, useIdbPutItem } from '../common/IDBProvider'
import { User, UserType } from './User'

export function CreateUser() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const createUser = useIdbPutItem('users')

  const onSubmit: PageFormSubmitHandler<User> = async (user, setError) => {
    try {
      await createUser(user)
      navigate(-1)
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Unknown error')
    }
  }

  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[{ label: 'Users', to: '/access/users' }, { label: 'Create User' }]}
        title={'Create User'}
      />
      <PageForm<User>
        submitText={t('Create User')}
        onSubmit={onSubmit}
        onCancel={() => navigate(-1)}
        defaultValue={{ userType: UserType.Member }}
      >
        <UserInputs />
      </PageForm>
    </PageLayout>
  )
}

export function EditUser() {
  const params = useParams<{ id?: string }>()
  const id = Number(params.id)
  const user = useIdbItem('users', id)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const updateUser = useIdbPutItem('users')

  if (!user) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    )
  }

  const onSubmit: PageFormSubmitHandler<User> = async (user, setError) => {
    try {
      await updateUser(user)
      navigate(-1)
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Unknown error')
    }
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Users', to: '/access/users' }, { label: 'Edit user' }]}
        title={'Edit user'}
      />
      <PageForm<User>
        submitText={t('Save user')}
        onSubmit={onSubmit}
        onCancel={() => navigate(-1)}
        defaultValue={user}
      >
        <UserInputs />
      </PageForm>
    </>
  )
}

export function UserInputs() {
  const { t } = useTranslation()

  return (
    <>
      <PageFormTextInput<User>
        label={t('Username')}
        name="username"
        placeholder={t('Enter username') ?? undefined}
        isRequired
        minLength={3}
      />
      <PageFormSelect<User>
        label={t('Type')}
        name="userType"
        placeholderText={t('Select user type')}
        options={[
          { label: t('Admin'), value: UserType.Admin },
          { label: t('Member'), value: UserType.Member },
        ]}
      />
      <PageFormTextInput<User>
        label={t('First name')}
        name="firstName"
        placeholder={t('Enter first name') ?? undefined}
      />
      <PageFormTextInput<User>
        label={t('Last name')}
        name="lastName"
        placeholder={t('Enter last name') ?? undefined}
      />
    </>
  )
}
