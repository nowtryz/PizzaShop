Server
======

## Environment variables

| Name                  | Example value              | Description                                                     |
|-----------------------|----------------------------|-----------------------------------------------------------------|
| **Mongo settings**                                                                                                 |||
| `MONGO_HOST`          | \<user>:\<passwd>localhost | mongo host (including user and password                         |
| `MONGO_PORT`          | 27017                      | mongo port (optional in cluster)                                |
| `MONGO_DB`            | pizza                      | the name of the mongo database to use                           |
| `MONGO_VERBOSE`       | false                      | If the server should log all communications with the database, useful in development environments |
| `MONGO_CLUSTERED`     | false                      | If the server is connecting to a mongo cluster (e.g. mongodb atlas) |
| **Express settings**                                                                                               |||
| `HTTP_PORT`           | 3000                       | The port to listen to (replaced by `PORT`if present)            |
| `HTTP_HOST`           | http://localhost           | The host with which the server is accessible (for oauth callbacks) |
| `PROXY_HOST`          | false                      | If present and not falsy, force the server to use `HTTP_HOST` as a raw address instead of appending `PORT` to it. Useful when the application is access though an http proxy (e.g. Heroku) |
| `JWT_SECRET`          | "My so secret sentence"    | The secret use to generate and validate jwt tokens              |
| `SESSION_SECRET`      | mySecretKey                | The secret use to validate session cookies                      |
| `GOOGLE_OAUTH_ID`     |                            | The client id for google oauth2 authentication                  |
| `GOOGLE_OAUTH_SECRET` |                            | The client secret for google oauth2 authentication              |
