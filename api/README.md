# API

## Running tests

The `api` service test suite requires a PostgreSQL connection to run.

To run the test suite in the default container, run the `rails test` command in an `api` service container:

```sh
docker compose run --rm api rails test
```

The test environment connects to the separate `press_gang_test` database.
