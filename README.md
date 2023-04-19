# Welcome to my Bookshelf App!

This is an app written to learn about Node.js applications and deployment of applications on AWS through the serverless framework. In this repository, you can deploy a cloud-hosted application to manage a list of books you have read.

See the app on AWS here: https://d2guitijgdkb3.cloudfront.net/

# About this project

## Infrastructure

The application consists of two packages: the API server (back-end) and the client. The application is meant to be deployed to AWS, and contains a serverless-compose file to deploy both projects simultaneously (as the client relies on the back-end's api gateway url).

The API server is hosted on an API Gateway instance, and the front-end is running a server on a Lambda function for SSR, with it's static assets hosted in an S3 bucket. The Lambda function and assets bucket sit behind a Cloudfront deployment to route calls accordingly and cache the static assets (when they exist).

For storage, there is currently one DynamoDB table holding the books data.

On top of the AWS infrastucture, there are also github actions for deploying, linting, and testing.

## Backend

The backend uses Node.js as it's language, and for packages, it uses:

- Node
- Express for the server
- Dynamoose as an ORM for DynamoDB
- ValidatorJS for object validation
- Jest for testing

## Frontend

The frontend is using Vue3 with Nuxt3 and SSR, along with Vuetify for its component framework.

## Others

This repo also uses prettier and eslint for linting / formatting, and NPM for its package management. It also uses Husky for pre-commit hooks to run formatting before it commits.

# Local Development

Prerequisites:

- Node.js
- Serverless installed locally (https://www.serverless.com/framework/docs/getting-started)
- Java installed locally (for the local DynamoDB server)

To develop on this repo locally:

1. Clone the repository

2. Install the dependencies in the root, `client` and `server` folders.

3. Inside the server folder, run the following command to install the local dynamodb server

```
sls dynamodb install
```

4. Startup the API server inside the `server` folder with

```
npm run dev
```

You should see a response similar to

```
Dynamodb Local Started, Visit: http://localhost:3004/shell
DynamoDB - created table books

Starting Offline at stage dev (ap-northeast-1)

Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * Api: bookshelf-api-dev-Api

   ┌───────────────────────────────────────────────────────────────────────┐
   │                                                                       │
   │   ANY | http://localhost:3000/dev/api/{proxy*}                        │
   │   POST | http://localhost:3000/2015-03-31/functions/Api/invocations   │
   │                                                                       │
   └───────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀

```

5. Inside the client folder, rename `.env.example` to `.env`, and make sure the value of the host is equal to the output from your serverless offline server (with the `dev` as the stage). For example, for the server above, the value of `VITE_API_BASE_URL` should be `http://localhost:3000/dev/`

6. Inside the client folder, start the development server with

```
npm run dev
```

With this, your two servers should be up and running and you should be able to start adding books to your list!

# Future Steps

As this is an MVP, there is a lot I would like to add to bring this to a more polished state. This includes:

- Better test coverage
- Implementing validator.js a little more thoroughly, and returning errors on model creation
- Adding validator middleware to post endpoints to validate the request has the necessary contents before allowing it through to the controller
- Migrating from DynamoDB to a relational database (DynamoDB was chosen due to the extra resources that would have been needed to be provisioned to use RDS)
- Better configuration for Prettier
- Add a seeder for Books for local development
- More atomic design of frontend components
- Adding a library to frontend for basic validation rules to make easily reusable validation for forms
