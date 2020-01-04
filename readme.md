## Requirements

Check if the following modules on there on your machine

1. Nodejs
2. MongoDb
3. Nodemon
4. yarn (preferable)

## Start server

1. Run mongo deamon ( run mongodb service ) by using command 
	```sh
	mongod
	```
	In some systems it might be 
	``` sh
	sudo systemctl start mongod
	```

2. Install required packages for both frontend and backend. 
	``` sh
	cd be
	npm i
	cd ../fe
	npm i
	```
3. Run backend
	```sh
	nodemon app.js    #if you have nodemon already installed
	node app.js       #works in any case
	```
4. Run Frontend
	```sh
	yarn start # or 
	npm run start
	```

## Database Schema

The database consists of three models. One for each of Products, Categories and Brand. Each of these has the following schema

1. Products

	```sh
		name: {
			type:  String,
			required:  true
		},
		category: {
			type:  String,
			required:  true
		},
		brand: {
			type:  String,
			required:  true
		},
		price: {
			type:  Number,
			required:  true
		},
		quantity: {
			type:  Number,
			required:  true
		},
		description: {
			type:  String,
			required:  true
		}
	```

2. Categories
	```sh
		name: {
			type:  String,
			required:  true
		},
		parents: {
			type: [String],
			required:  true,
		},
		children: {
			type: [String],
			required:  true
		}
	```

## File structure

The folder  structure for backend look like
```sh
be
├── app.js
├── package.json
├── node_modules
├── controllers
	└── auth
		├── login.js
		└── signup.js
	└── products
		├── addProduct.js
		├── getBrand.js
		├── validateCategory.js
		└── getCategory.js
├── models
	├── products.js
	└── users.js
├── routes
	└── products.js
```
The forlder structure for frontend looks like

	fe
	├── package.json
	├── yarn.lock
	├── node_modules
	├── public
		├── favicon.ico
		├── index.htmk
		├── logo.png
		├── manifest.json
		└── robots.txt
	├── src
		├── Components
			├── addCategory.js
			├── addProduct.js
			├── home.js
			└── nav.ja
		├── App.css
		├── App.js
		├── index.css
		├── index.js
		├── setupTests.js
		└── serviceWorker.js
		
