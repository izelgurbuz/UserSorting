# User Sorting Table

Basic Web application to fetch and sort users according to their pace, distance and total time.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

MongoDB cluster needs to be prepared. Then get the URI of the created database and add it to `.env` file.

Then, CSV files under `database`folder needs to be imported into your database.You can use these commands.

```bash
 mongoimport --uri "YOUR_MONGODB_URI" --collection users --drop --type csv  --file users.csv --headerline
```

and

```bash
 mongoimport --uri "YOUR_MONGODB_URI" --collection pace --drop --type csv  --file pace.csv --headerline
```

### Installing

Just basically run `npm install && npm run dev`.

This will install all dependencies and starts the app.

Backend of this project will run at port `5000` and frontend will be served over port `3000`.

## Built With

- [MongoDB](https://www.mongodb.com/) - NoSQL database program
- [ExpressJS](https://nodejs.org/) - Backend Web Application Framework
- [ReactJS](https://reactjs.org/) - Frontend Javascript Library
- [NodeJS](https://nodejs.org/) - Backend JavaScript runtime environment

## Authors

- **İzel Gürbüz Culban** - _Initial work_ -

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Why Choices

MongoDB was chosen due to its light-weight and high scalability.
ReactJS was chosen since it is the most trending and competitive based on performance as frontend library.
NodeJS with ExpressJS is easy to scale in case of need to expand the application. It is also fast and modular.
