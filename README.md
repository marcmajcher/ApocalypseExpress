# ApocalypseExpress

Apocalypse Express is a game inspired by Mad Max, Autoduel, Elite, Auto Assault, Escape Velocity, and any number of drive/fly and deliver type games. Players travel from hold to hold, trading goods, making deliveries, and probably shooting some folks along the way.

## API

## Main
**Public routes**

| Method | Route     |                                  |
| ------ | --------- | -------------------------------- |
| GET    | /         | Home page                        |

| Method | Route     |                                  |
| ------ | --------- | -------------------------------- |
| GET    | /         | Home page                        |


### Admin
**\*Admin login required**

|| Method | Route | Description |
|---|---|---|---|
|  | GET | /admin | Admin dashboard
| * | GET | /admin/map | Map editor
| * | GET | /admin/mapseed | knex seed file
| * | PATCH | /admin/map/location/:locid | Update map location {name, longitude, latitude, description, population, tech, type}

### Driver
**Player login required**
| Method | Route | Description |
|---|---|---|
| GET | */driver* | Driver info for current player

### Game
**Player login required**
| Method | Route | |
|---|---|---|
| GET | /game | Main game page

## Location
**Player login required**
| Method | Route | |
|---|---|---|
| GET | */location* | Info for player's current location
| GET | */location/:locid* | Brief info for given location

### Map
**Player login required**
| Method | Route | |
|---|---|---|
| GET | /map | Get json map data for user (visited locations)

### Users
**\*Player login required**
| | Method | Route | |
|---|---|---|---|
| | POST  | /user | Create new player {email, vemail, password, vpassword, firstname, lastname}
| * | GET   | /user/account | Player account management page
| * | PATCH | /user/account | Update player info {firstname, lastname, cpassword, password, vpassword}
