** Start Backend server

cd be --> go to directory
npm i --> install required

if nodemon exists on local machine ? nodemon app.js : npm i -g nodemon; nodemon app.js

Structure:

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
│       ├── productSearch.js
│       └── checkStatus.js
├── models
│   ├── products.js
│   └── users.js
├── routes
│   ├── auth.js
│   └── products.js