# MDM application with Express, Typescript, Mongoose

This project is Made of express, typescript and mongoose application, designed for Restful API's,

## Prerequisites

1. Latest version of Node to be installed(i recommend NVM, easier to install and possible to work with multiple node versions).
2. Install MongoDB

## Steps to run

```sh
    npm install          <= install all the npm Dependencies
    npm run dev          <= start the Nodemon and watch for changes.
```

## Directory Structure

```
MDM-APP-BACKEND-STRUCTURE
    ├── dist                  <= typescript will compile js to this folder
    ├── node_modules
    ├── src
    │    ├── .env             <= for production, for other envs, use: .env.${NODE_ENV}
    │    ├── api
    │    │    ├── user     <= Replace example for feature name
    │    │    │    ├── user.controller.ts
    │    │    │    ├── user.model.ts
    │    │    │    ├── user.router.ts
    │    ├── config
    │    │    ├── express.ts
    │    │    ├── routes.ts
    │    ├── server.ts
    │    ├── tsconfig.json
    ├── package.json
    ├── tsconfig.json
    ├── README.md
```

- [ ] Add JWT based authentication

## License

MIT
