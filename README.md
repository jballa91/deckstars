# DECKSTARS
**Get yourself a better MTG Deckbuilding UI**

## [DECKSTARS Live Link](www.deckstars.net)


## Technologies Used
- [Node.js](https://nodejs.org/en/docs/)
- [Express.js](https://expressjs.com/en/4x/api.html)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Prisma 2](https://www.prisma.io/docs/)
- [React.js](https://reactjs.org/docs/getting-started.html)
- [Docker](https://docs.docker.com/)
- [Heroku](https://devcenter.heroku.com/categories/reference)
- [Material-UI](https://material-ui.com/getting-started/installation/)

## Documentation
*As I am encouraging real people to use the live application, I won't be exposing backend routes in the documentation. Anyone who is curious will have to explore the code.*
1. [Features](/documentation/features.md)
2. [Frontend Routes](/documentation/frontend_routes.md)
3. [Schema](/documentation/schema.md)

## Installation Instructions
*You will need to [Install Prisma 2]() to use this project on your machine. I recommend a global installation so you can use it in the future. If you'd rather not, I've included instructions below.*
 ```
 git clone https://github.com/jballa91/deckstars.git
 cd deckstars
 npm install
 cd client
 npm install
 cd ..
 ```
> *If you opted to not globally install Prisma 2, now run*:
> ```
> npm install prisma --save-dev
> ```
> You can now run Prisma using npx like the rest of us.
>

You will now need to create a Postgres database and user for the application, and set up a .env according to the spec in the .env.example file.

Now you'll need to install dev dependencies.
```
npm install @prisma/cli debug dotenv dotenv-cli --save-dev
```

One last Prisma install...
```
npm install @prisma/client
```
Run the following commands **in order**.

 **NOTE**: *seedSets.js will take a **while** to run.*
 ```
 npx prisma migrate dev --preview-feature
 node seed.js
 node seedSymbols.js
 node seedUsers.js
 node seedSets.js
 node seedDecks.js
 ```

If all of that succeeded, you're ready to go. Open a second terminal, and in your first terminal run  `npm start` in the root directory of the project. In the second terminal navigate to the `client/` directory and run `npm start`. That will open the application in your OS's preferred browser. Have fun! Alternatively you're more than welcome to visit the [live site](http://www.deckstars.net).