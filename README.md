# Index UI

Index UI is a simple front-end used to interact with Index. This front-end describes Index and consolidates relevant links to onboard users onto the protocol's basic functionalities. It also allows users to stake, unstake, and claim INDEX tokens during the initial distribution + liquidity mining phase of the protocol's launch.

## Installation

Make a copy of the prod env file

`cp .env.prod .env`

Then install all the dependencies with

`yarn install`

---

This project was created with `create-react-app`.

`yarn start`
Runs the app in development mode on localhost:3000

`yarn build`
Builds the app for production in the `build` folder.

`yarn eject`
Ejects the app from `create-react-app` rails.

## Testing

### Performing E2E Tests with Cypress

To run e2e test with Cypress, first you must serve a local instance

`yarn start`

Once that is served, in another terminal, navigate to the repo and run

`yarn run e2e`

This will kick off Cypress to run headlessly.

### Writing and Debugging Cypress Tests

If you wish to write a test, or debug yours, you can do so with the help of the Cypress tool by running

`yarn run cypress:open`

This will allow you to see and select items on page, more easily obtaining their IDs, selectors, etc. More information on this can be found at [the Cypress website](https://docs.cypress.io/)

&nbsp;

## Contributing

The main purpose of this repository is to continually serve the needs of Index, making it faster, simpler, and easier to use. As new proposals are submitted and the scope of Index's governance evolves, we anticipate this tool will change as well.

We greatly encourage any community contribution that may help Index reach more users and promote greater adoption, so be sure to check out our [Contribution Guidelines](https://github.com/SetProtocol/index-ui/blob/master/CONTRIBUTING.md) for ways to get involved with our project.

## License

Index UI is MIT licensed.
