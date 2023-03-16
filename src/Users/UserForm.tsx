import {
  PageForm,
  PageFormSelectOption,
  PageFormSubmitHandler,
  PageFormTextInput,
  PageHeader,
  PageLayout,
} from '@ansible/ansible-ui-framework'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCreate } from '../common/dataHooks'
import { User, UserType } from './User'

export function CreateUser() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const createUser = useCreate('users')

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
        breadcrumbs={[{ label: 'Users', to: '/users' }, { label: 'Create User' }]}
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
      <PageFormSelectOption<User>
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
