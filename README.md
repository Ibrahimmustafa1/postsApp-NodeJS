# postsApp-NodeJS
 My first Mean app <br>
 Front-End Repo: <a href='https://github.com/Ibrahimmustafa1/postsApp'>posts App FrontEnd</a>
### Real Demo
<a href='https://ibrahimmustafa1.github.io/postsApp/'>postsApp</a>

# Features

- Responsive web design (RWD)
- User authentication (Login/Register/Logout) and authorization
- Spa App
- Angular 
- Angular Material
- Refactored with ES6 and ES7 syntax (eg: async/await)
- RESTful API

```
-------------------------------------------------------------------------
Normal Routes
-------------------------------------------------------------------------
[Method]  [Route]
GET       /                       Landing page
GET       /login                  Request the user login page
GET       /register               Request the user edit page

-------------------------------------------------------------------------
Posts Route
-------------------------------------------------------------------------
[Method]  [Route]
GET       /posts            Fetch all campgrounds
POST      /post            Create a new post to database
GET       /posts/:id        Show the selected post information
PUT       /posts/:id        Update post information 
DELETE    /posts/:id        Delete a campground

# Technologies

## Frontend

- Angular 2+
- TypeScript
- Angular Material
- Html
- Css

## Backend
- Node js
- Express
- MongoDb
- Jwt Token

# Getting Started

Follow the instructions below to set up the environment and run this project on your local machine.

1. Install dependencies via NPM or Yarn

```bash
# Install dependencies via npm
$ npm install

# Install dependencies via yarn
$ yarn install
```

3. Run the server with [nodemon](https://nodemon.io/) and open a browser to visit [http://localhost:3000/](http://localhost:3000/).

```bash
$ npm start
```

