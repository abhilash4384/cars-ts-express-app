# The Cars App

The Cars App is an API project that addresses a common scenario I encounter when working with frontend technologies like React to test the realworld problems. It provides an API backup, allowing me to thoroughly test the functionality. This project serves as an opportunity to fulfill this need and refresh my backend technology skills.

## Fuctionality

1. User Registration
2. Login
3. Car(CRUD Details)

## Techstack

- NodeJS
- ExpressJS
- MongoDB using Mongoose
- Typescript
- Zod validations

## Scripts

I've utilized 'pnpm' for package installation; however, feel free to use yarn or npm if it's your preferred choice. Simply replace the 'pnpm' keyword in all the commands with 'yarn' or 'npm'.

- required packages installation

```bash
pnpm i
```

- starting project in devlopment mode, before starting the app make sure the mongodb server is running on 27017(In case of any other port you can specify the port in .env file)

```bash
pnpm start
```

- production build

```bash
pnpm build
```

- Setting up debugger (optional), install below dependecies. In case of any issues check the .vscode/launch.json file and you can also refer <a href="https://www.youtube.com/watch?v=f3i9b3uK00U&ab_channel=RobertsDevTalk" target="_blank">this</a> video.

```bash
pnpm add -D ts-node tsconfig-paths
```

## Postman Collection

This app contains postman(ref postman dir) collection which you can directly import into postman & test the request
