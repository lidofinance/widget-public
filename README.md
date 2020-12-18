# Lido Widget

A widget for submitting Ether to the pool.

## Development

### Prerequisites

- Node.js v12+
- Yarn package manager

This project requires an `.env` file which is distributed via private communication channels.
A sample can be found in [`sample.env`](./sample.env).

### Development server

To get started, copy `.env` file to the repo root and install the dependencies:

```bash
yarn install
```

Then, start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker build

To build and push an image, run:

```bash
yarn docker-build
```

When starting a container, specify the following environment variables:

- `ACTIVE_CHAIN_ID`
- `LIDO_CONTRACT_ADDRESS`
- `SUBMIT_GAS_LIMIT`

## Hosting on IPFS

IPFS does not provide a Node.js server, which is why it can only host a static version of this app.

To export the widget to static HTML, run

```
yarn build
```

This command will build the production version of the app as well as run `next export`, which will output static files into `out` directory in the root of the project. For more info about static export, see `next export` [docs](https://nextjs.org/docs/advanced-features/static-html-export).

Now to deploy the static website to IPFS, run

```
npx ipfs-deploy out
```

It may take a while to upload it to IPFS but if everything goes right, you will be taken to your newly-deployed widget in your browser. For more info, please visit `ipfs-deploy` [github page](https://github.com/ipfs-shipyard/ipfs-deploy).
