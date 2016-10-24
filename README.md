# ApocalypseExpress

Apocalypse Express is a game inspired by Mad Max, Autoduel, Elite, Auto Assault, Escape Velocity, and any number of drive/fly and deliver type games. Players travel from hold to hold, trading goods, making deliveries, and probably shooting some folks along the way.

## API

## / (index)

GET / : Home page
GET /booyah : Test response
GET /register : Registration form
GET /login : Login form : email, password
POST /login : Log in player
GET /logout : Log out player

### /admin
GET / : Admin dashboard
GET /map : Map editor

### /map
GET / : Get json map data

### /users
POST / : Create new user : email, vemail, password, vpassword, firstname, lastname
