# Demo App for Video Courses and Lessons

## Installation pre-requisites
- Angular version >= 18.x.x
- Node version >= 23 - long-term support (LTS) version
- Use NPM version >= 5

## Installing the Angular CLI
With the following command the angular-cli will be installed globally in your machine:
`npm install -g @angular/cli`

## How To install this repository
The app has several separate npm modules, that are installable separately.
`npm install`

## Run the App (using the Angular CLI)

### 1. Run REST API Back End Server
Run BE with the following command:
`npm run server`

### 2. Run the Front End
To run the FE with the following command:
`npm start`

Go to App: [http://localhost:4200](http://localhost:4200)


## Other Info

### Initializing a clean Angular Material Project
These are the commands and steps needed to scaffold a new Angular Material project from scratch, from an empty folder.
It is recommended to update to the latest version of node using a node versioning tool such as for ie 
[nave](https://github.com/isaacs/nave) or [nvm-windows](https://github.com/coreybutler/nvm-windows).

### Step 1 - Scaffold a clean project using the Angular CLI
With a CLI version 1.5 or above, let's scaffold a new project with routing:
`ng new angular-material-hello-world --routing`

### Step 2 - Installing Angular Material dependencies
Next, let's install these dependencies:
`npm install @angular/material @angular/cdk @angular/animations hammerjs`

### Step 3 - Adding Google Material Icons Font
Add the following link to index.html:
`<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`

### Step 4 - choosing a Theme
Before starting to import components, let's choose a widget theme, available themes in 
`node_modules/@angular/material/prebuild-themes`.

We can for ie use the Indigo Pink theme by adding this line to our styles.css file:
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
