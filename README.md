# Index UI

[![License](https://img.shields.io/:license-mit-blue.svg)](https://opensource.org/licenses/MIT)

Index UI is a simple front-end used to interact with Index. This front-end describes Index and consolidates relevant links to onboard users onto the protocol's basic functionalities. It also allows users to stake, unstake, and claim INDEX tokens during the initial distribution + liquidity mining phase of the protocol's launch.

## Local development

This project was created with [create-react-app](https://create-react-app.dev/). Refer to their docs for advanced usage.

### Prerequisites

1. Install [Node](https://nodejs.org/en/) 14+
1. Install [yarn](https://yarnpkg.com/getting-started/install)
1. Fork this repo
1. Clone your fork locally

### Steps

1. Make a copy of the prod env file
   ```bash
   cp .env.prod .env
   ```
1. Install all the dependencies
   ```bash
   yarn install
   ```
1. Start the app in development mode on localhost:3000
   ```bash
   yarn start
   ```
1. Navigate to [http://localhost:3000/](http://localhost:3000/). The changes you make locally should live-reload in the app.

---

## Testing

### Unit tests

Run unit tests in watch mode

```bash
yarn test
```

### Run E2E Tests with Cypress

To run e2e test with Cypress, first you must serve a local instance

```bash
yarn start
```

Once that is served, in another terminal, navigate to the repo and run

```bash
yarn run e2e
```

This will kick off Cypress to run headlessly.

### Writing and Debugging Cypress Tests

If you wish to write a test, or debug yours, you can do so with the help of the Cypress tool by running

```bash
yarn run cypress:open
```

This will allow you to see and select items on page, more easily obtaining their IDs, selectors, etc. More information on this can be found on the [Cypress docs](https://docs.cypress.io/)

### Helpful Commands

Build the app for production in the `build` folder.

```
yarn build
```

Eject the app from `create-react-app` rails.

```
yarn eject
```

This project uses [browserslist](https://github.com/browserslist/browserslist). We need to [regularly update browser data](https://github.com/browserslist/browserslist#browsers-data-updating) via

```bash
npx browserslist --update-db
```

## Contributing

The main purpose of this repository is to continually serve the needs of Index, making it faster, simpler, and easier to use. As new proposals are submitted and the scope of Index's governance evolves, we anticipate this tool will change as well.

We greatly encourage any community contribution that may help Index reach more users and promote greater adoption, so be sure to check out our [Contribution Guidelines](https://github.com/SetProtocol/index-ui/blob/master/CONTRIBUTING.md) for ways to get involved with our project.

## Style Guide

### Absolute imports

Prefer absolute imports over relative imports because this is a loose codebase convention. Refer to [Configuring React Absolute Imports For TypeScript](https://justinnoel.dev/2019/06/18/configuring-react-absolute-imports-for-typescript/) if your editor isn't picking up absolute imports.

```typescript
// Good
import Page from 'components/Page'

// Bad
import Page from '../../components/Page'
```

### Import ordering

Order library imports at the top of the file, then a newline separator, then imports for exported members that are defined in this package.

```typescript
// Good
import React, { useEffect } from 'react'
import { Container, Spacer } from 'react-neu'

import Page from 'components/Page'
import Explanation from 'components/Explanation'
```

```typescript
// Bad
import React, { useEffect } from 'react'
import Page from 'components/Page'
import { Container, Spacer } from 'react-neu'
import Explanation from 'components/Explanation'
```

## License

Index UI is MIT licensed.
