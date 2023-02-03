# directus-extension-repro

## Prequisites

- pnpm
- node v16.15.0
- Docker

## Testing

### Install the deps

```sh
pnpm i
```

### Build and copy the extension

```sh
pnpm --filter directus-extensions build
```

Make sure it has been copied to `backend/extensions/interfaces/osm-autocomplete/index.js`

### Run directus

Run the following commands in 2 terminals

```sh
pnpm --filter backend docker:dev

pnpm --filter backend start
```
