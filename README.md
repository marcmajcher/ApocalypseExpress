# ApocalypseExpress

Apocalypse Express is a game inspired by Mad Max, Autoduel, Elite, Auto Assault, Escape Velocity, and any number of drive/fly and deliver type games. Players travel from hold to hold, trading goods, making deliveries, and probably shooting some folks along the way.

## API

## Main
**Public routes**
| GET  | / | Home page
| GET  | /booyah | Test response
| GET  | /register | Player registration form
| GET  | /login | Player login form
| POST | /login | Log in player { email, password}
| GET  | /logout | Log out player

### Admin
**\*Admin login required**
|  | GET | /admin | Admin dashboard
| * | GET | /admin/map | Map editor
| * | GET | /admin/mapseed | knex seed file
| * | PATCH | /admin/map/location/:locid | Update map location {name, longitude, latitude, description, population, tech, type}

### Driver
**Player login required**
| GET | */driver* | Driver info for current player

### Game
**Player login required**
| GET | /game | Main game page

## Location
**Player login required**
| GET | */location* | Info for player's current location
| GET | */location/:locid* | Brief info for given location 

### Map
**Player login required**
| GET /map : Get json map data for user (visited locations)

### Users
**\*Player login required**
| | POST  | /user | Create new player {email, vemail, password, vpassword, firstname, lastname}
| * | GET   | /user/account | Player account management page
| * | PATCH | /user/account | Update player info {firstname, lastname, cpassword, password, vpassword}
