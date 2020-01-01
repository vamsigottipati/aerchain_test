## Start Backend server

```sh
cd be              # go to directory
npm i              # install required

# if nodemon exists on local machine

nodemon app.js 

# if nodemon is not present

npm i -g nodemon
nodemon app.js 

```

Structure:

```sh

be
├── app.js
├── package.json
├── node_modules
├── controllers
│   └── auth
│       ├── login.js
│       └── signup.js
│   └── products
│       ├── addProduct.js
│       ├── getBrand.js
│       └── getCategory.js
├── models
│   ├── products.js
│   └── users.js
├── routes
│   └── products.js

```