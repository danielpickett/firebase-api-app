This app is LIVE on gh-page: [https://danielpickett.github.io/firebase-api-app](https://danielpickett.github.io/firebase-api-app)

# Basic Notes App using React, React Router and the Firebase REST API.

This app allows a user to create/save records ("notes") to the Firebase realtime database, read them back, edit them and delete them. This app doesn't implement user accounts, so I take no responsibility for what "notes" you will find when you load this app, since anyone can update it.

## Technologies and approach
This app was built with React and React Router. My implementation of React Router may not immediately be apparent. Instead of using Routes to display unique pages, I used dynamic Routes to put individual notes into a condition for being updated or deleted. I used path variables to provide a dynamic URL for each note for both edit and delete.

## How to run

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). To run it locally...
1. First, in the project directory, run `npm install`. 
2. You can then use `npm start` to run the app in development mode. 
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
