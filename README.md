# Basic Notes App using Firebase REST API.

This project was created for Code Louisville's JavaScript/React session. It uses the Firebase REST API to implement basic CRUD functionality. This app allows a user to create/save records ("notes") to the Firebase realtime database, read them back, edit them or delete them. This app doesn't implement user accounts, so I take no responsibility for what "notes" you will find when you load this app, since anyone can update it.

## Technologies and approach
This app was built with React and React Router. My implementation of React Router may not immediately be apparent. Instead of using Routes to display unique pages, I used Routes put individual notes into a condition for being updated or deleted. I used path variables to provide a dynamic URL for each note for both edit and delete.

## How to run

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). To run it locally...
1. First, in the project directory, run `npm install`. 
2. You can then use `npm start` to run the app in development mode. 
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
