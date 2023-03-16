# Ansible UI Framework Demo

## Getting Started

1. Prerequisites

   - Node 18.x (recommended)
   - NPM 8.x (recommended)

    The project should with older versions of node and npm but may require regenerating the package-lock.json and manually adding required peer dependencies.

2. Clone Repository
  
    ```
    git clone git@github.com:jamestalton/ansible-ui-framework-demo.git
    ```

3. Install Package Dependencies

    ```
    npm ci
    ```

4. Start Project

    ```
    npm start
    ```

## Docker Image

```
docker run --rm -p 3456:8080 ghcr.io/jamestalton/ansible-ui-framework-demo:main
```

The demo should be running on <http://localhost:3456>
