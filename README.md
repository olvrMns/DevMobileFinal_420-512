# BACKEND

- [rawg](https://api.rawg.io/docs/)
- [giantbomb](https://www.giantbomb.com/api/documentation/)
- [igdb](https://api-docs.igdb.com/#getting-started)

## .ENV

- .dev.env / .test.env
    - SERVER_PORT
    - EXPIRES_IN
    - REFRESH_EXPIRES_IN
    - PRIVATE_KEY
    - DB_USER
    - DB_PWD
    - DB_PORT
    - DB_HOST
    - DB_NAME
    - RAWG_API_KEY
    - GB_API_KEY

## npm install
- express
- dotenv
- mysql2
- winston
- bcrypt
- cors
- jsonwebtoken
- http-status-codes
    ### --save-dev
    - cross-env
    - nodemon

## REF
- [fix __dir](https://stackoverflow.com/questions/64383909/dirname-is-not-defined-error-in-node-js-14-version)
- [env?](https://stackoverflow.com/questions/77498008/nodemon-not-loading-env-variables-in-node-js-20-9-0-undefined)

##

```
import { config } from 'dotenv';
import path from 'path';
config({path: `${path.resolve()}/.${process.env.NODE_ENV}.env`});
```

```
--exec node --env-file=.dev.env
```