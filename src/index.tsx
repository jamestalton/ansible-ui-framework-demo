// import '@patternfly/react-core/dist/styles/base.css'
import '@patternfly/patternfly/patternfly-base.css'
import '@patternfly/patternfly/patternfly-charts-theme-dark.css'

import { PageFrameworkProvider } from '@ansible/ansible-ui-framework'
import { render } from 'react-dom'
import Main from './Main'

const container = document.createElement('div')
container.style.position = 'fixed'
container.style.width = '100%'
container.style.height = '100%'
container.style.overflow = 'hidden'
document.body.appendChild(container)

render(
  <PageFrameworkProvider>
    <Main />
  </PageFrameworkProvider>,
  container
)
