# Containerized Ruby on Rails and Postgres

# Prerequisites
This project requires a Docker installation and assumes a git installation.

# Installation
1. Clone the repo:
```
git clone <project repo url>
```

2. Navigate to project directory
```
cd <project name>
```

3. Build docker images for development mode
```
docker compose build
```

4. Start application in development mode
```
docker compose up
```

# API Service

## Testing
Run tests with docker compose:
```
docker compose run --rm --remove-orphans api bundle exec rails test [filespec(s)]
```

# DB Operations
Dump database with the following command:
```
# development mode
docker compose exec db pg_dump -U ${POSTGRES_USER} -d ${POSTGRES_DB}

# production mode
docker compose -f docker-compose.production.yml exec db pg_dump -U ${POSTGRES_USER} -d ${POSTGRES_DB}
```

# License
This project is licensed under the GPL 3.0 license.
