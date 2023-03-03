import {
  PageForm,
  PageFormSubmitHandler,
  PageFormTextInput,
  PageHeader,
  PageLayout,
} from '@ansible/ansible-ui-framework'
import { useNavigate } from 'react-router-dom'
import { createItem } from '../common/useCRUD'
import { User } from './User'

export function CreateUser() {
  const navigate = useNavigate()

  const onSubmit: PageFormSubmitHandler<User> = async (user, setError) => {
    try {
      await createItem<User>('users', user)
      navigate('/users')
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Unknown error')
    }
  }

  return (
    <PageLayout>
      <PageHeader
        title={'Create User'}
        breadcrumbs={[{ label: 'Users', to: '/users' }, { label: 'Create User' }]}
      />
      <PageForm<User> submitText={'Create User'} onSubmit={onSubmit} onCancel={() => navigate(-1)}>
        <PageFormTextInput<User> label="Username" name="username" isRequired minLength={3} />
        <PageFormTextInput<User> label="First name" name="firstName" />
        <PageFormTextInput<User> label="Last name" name="lastName" />
      </PageForm>
    </PageLayout>
  )
}
