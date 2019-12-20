# Project: NaviRad

This project is being developed as a part of the course DH2642 – “Interactive Programming and the dynamic web” which is run as part of the activities of the Royal Institute of Technology in Stockholm, Sweden.

This deployment serves as a submission for the mid-project review which is needed for the course examination and the project should be considered as a work in progress.

The project developers are:

- Magnus Fredriksson
- Adam Liliemark
- Fredrik Öberg


## About

The project NaviRad is an interactive radar simulator intended for introductory radar training and is aimed at people interested in learning how the view of a radar differs from the reality and a chart.

So far in, the project has four views been added to the application of the project: start(the initial view), map, radar and about. 
To get the intended functionalities the application uses the API “Tilezen” as well as “Google Maps”. Which makes it possible to get the properties of the radar component.

The start view of the application has a foundation for a register and login service which grants the user access to the map view. On the map view has an interactive map been developed. The map works by letting the user pick a point of the map and after the choice has been made it sends the user to the radar view.

The radar view renders a simulated image of the surface elevation above sea level around the on the map specified point. With that it displays roughly the same image that a real radar would show if being put at the previously chosen location.
The About view gives a short description of the app as well as the participating developers.

## Plans

The login/register function will be implemented through firebase authorization service and the group is aiming at using firebase database to store user created content.

A radar/map overlay will be implemented on the radar to more clearly se what and where the radar is rendering a simulation of.

Other boats will be visualized on the map through an automatic identification system(AIS) and will be rendered live.

This as well as some design updates is what the group has in for the project’s final submission.

## File Structure

The project is developed using the framework React as well as the state container Redux. The application is initiated from the file index.js located at the base location of the “src “ folder. There you can also find different utility files such as app.js - which serves as the router of the application - and the validateInput file which validates the input from the login as well as the register components.

All the components of the application are positioned in the folder Components localized in the “src” folder. The structure of the components is easiest understood by looking in the “Views” folder where the view components are located. From there you can read that the Start view contains of the Header components as well as Start which itself contains the components Input, and Message. The Start component on its part contains the components LoginForm and RegisterForm. The Map view consists of the Header as well as the MapBox component containing the MapEmbedder. The Radar view is built up of the Header, RadarHeader, SmallMapbox, Radar as well as the RadarMenu components. And the last view - the About view - consists of the Header as well as the Menu and About components.

Lastly the data is being handled in the “Data” folder located in “src”. This folder contains actions as well as reducers separated into different files. The reducers set the states of the Redux store and by that stores dynamically the current state of the user entered information(the longitude and latitude coordinates for where the user clicked on the map as an example). The actions serve as payload when the application sends data to the redux store.



# Running the project

## Using NPM
### `npm install` 
Installs all project dependencies

### `npm start`
compiles and launches the project development server

### `npm run build` 
builds the project into a deployable artifact.



## Using Yarn


### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn eject`
This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
