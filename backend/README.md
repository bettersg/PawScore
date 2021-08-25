# Pawscore Backend

Pawscore backend provides RESTful APIs.

## Installation

Use npm to install dependencies

```bash
npm install
```

## Usage

1. Please either craft your own .env file using the [.env.example](.env.example) file or download a live development .env file from Google Docs

```bash
$ ls -lah .env
-rw-r----- 1 samuel samuel 367 Aug 23 23:06 .env


$ npm start

> pawscore-backend@0.0.1 prestart
> npm run build


> pawscore-backend@0.0.1 prebuild
> eslint . --ext .ts


> pawscore-backend@0.0.1 build
> tsc


> pawscore-backend@0.0.1 start
> node .

server started at http://127.0.0.1:5000
```

## Database Schema
TBC

## Creating a model
Sequelize is used as the ORM for the project. You may review the existing models for code samples on how models are defined.

Ideally, if possible, please provide migration code in the `migration` directory. As sequelize-cli works with JS only, migration scripts have to be written in JS (until we sort out a solution).

## Directory Structure
```
.
├── dist
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.ts
│   ├── config
│   ├── controllers
│   ├── helpers
│   ├── migrations
│   ├── models
│   ├── routes
│   └── seeders
├── tsconfig.json
└── .env
```
Routes should be setup as much in the `route` directory as reasonably possible in the form of Express router.
Models should be within the `models` directory.
CRUD & other controller functions should be store within `controllers` directory


## Contributing
You may review on Trello on the tasks available and pick the tasks that's not taken. Please mark that you're on a task to prevent duplicated efforts.
