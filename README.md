# React Project

## Installation
.... Report Start
To get started, ensure you have the necessary dependencies installed. Run the following command in your project directory:

```sh
npm install react-bootstrap bootstrap react-router-dom

This instruction will guide the reader to install `react-bootstrap`, `bootstrap`, and `react-router-dom` using npm.

```
1. The NavigationControl component is ready for routing
2. The Report&Analytics layout is ready and it also reponsive, i just need to ajust it to requirements
...Report End


.... Report Start
# Login and SignUp
1. i created one component to be shared between the pages, which hold the logo, and the welcome text passed as a props


# Navigation Header
the navHeader is completed, for the mobile part, two icons aren't showing at the top yet, but am leaving that aside for now
...Report End


.... Report Start
# 3-june-2024
1. sideNavigation component completed
    -Component created in process-
        -Navigation Button
        -Search Bar
        
2. Update of HeaderNavigation
    -Updates-
        -Responsive design while still displaying the user dropdown icon and the notification bell
        -Ajusting the Application name base on the screen size
        -Toggle the sideNavigation using the haederNavigation in mobile mode.
3. Report and Analytices
    -page completed-
        -Page Header Text [component]
        -dropdown component for filter
        -report card box with hovering effect
        -Responsive design
...Report End


.....Report Start
# 19-june-2024
1. Finished consuming SignUp and Login Api
-Created a Context folder used for consuming all Api, with subfolder for every aspect of the Api
-Implemented the SignUp and Login functionality using Axios

## Installation
    To get started, ensure you have the necessary dependencies installed. Run the following command in your project directory and also a new file will be created to store the baseUrl of the appilcation:

```sh
npm install axios
```
    Now in your project root directory where you have package.json file, crerate a new file [ .env ], Add this line of code to the file before running the sever again.
```sh
REACT_APP_EDO_SUBEB_BASE_URL=https://edoivm.azurewebsites.net
```

-Implemented error handling for both login and signup
-Implemented token storage for logged in users using session storage
-Implemented validation for protected routes

2. Finished consuming only the getItems Api form the items section
 -but haven't dispaly the returing data because it an empty array
 -the InventoryItems List is now scrollable, which will also be added to other component





