# ApocalypseExpress

TODO: update everything

Apocalypse Express is a game inspired by Mad Max, Autoduel, Elite, Auto Assault, Escape Velocity, and any number of drive/fly and deliver type games. Players travel from hold to hold, trading goods, making deliveries, and probably shooting some folks along the way.

## API

### Main
**Public routes**

| Method | Route     | |
| ------ | --------- | ---
| GET    | /         | Home page
| GET    | /booyah   | Test response
| GET    | /register | Player registration form
| GET    | /login    | Player login form
| POST   | /login    | Log in player {email, password}
| GET    | /logout   | Log out player


### Admin
**\*Admin login required**

| | Method | Route | |
|---|---|---|---|
|  | GET | /admin | Admin dashboard
| * | GET | /admin/map | Map editor
| * | GET | /admin/mapseed | knex seed file
| * | PATCH | /admin/map/location/:locid | Update map location {name, longitude, latitude, description, population, tech, type}

### Driver
**Player login required**

| Method | Route | |
|---|---|---|
| GET | /driver | Driver info for current player

### Game
**Player login required**

| Method | Route | |
|---|---|---|
| GET | /game | Main game page

## Location
**Player login required**

| Method | Route | |
|---|---|---|
| GET | /location | Info for player's current location
| GET | */location/:locid* | Brief info for given location

### Map
**Player login required**

| Method | Route | |
|---|---|---|
| GET | */map* | Get json map data for user (visited locations)

### Trip
**Player login required**

| Method | Route | |
|---|---|---|
| GET | */trip* | Get current trip information
| POST | */trip* | Start trip
| PUT | */trip* | Create new trip with destination id[s] {destination[]}
| PATCH | */trip* | Add destination id[s] to current trip route {destination[]}
| DELETE | */trip* | Clear current trip

### Users
**\*Player login required**

| | Method | Route | |
|---|---|---|---|
| | POST  | /user | Create new player {email, vemail, password, vpassword, firstname, lastname}
| * | GET   | /user/account | Player account management page
| * | PATCH | /user/account | Update player info {firstname, lastname, cpassword, password, vpassword}

## Database Schema

```
   +---------------------------+                                     +--------------------------+
   | Config                    |                                     | Vehicles                 |
   +---------------------------+                                     +--------------------------+
   | config          | string  |                                     | id           | integer   |
   | defaultLocation | integer |                                     | created_at   | time      |
   +---------------------------+                                     | updated_at   | time      |
                                                                     | model        | string    |
                                                                     | size         | string    |
   +--------------------------+       +-----------------------+      | type         | string    |
   | Users                    |       | Drivers               |      | cargocap     | integer   |
   +--------------------------+       +-----------------------+      | passengercap | integer   |
   | id             | integer +------>| id          | integer |<--+  | fuelcap      | integer   |
   | email          | string  |       | created_at  | time    |   |  | mpg          | integer   |
   | hashedPassword | string  |       | updated_at  | time    |   |  | price        | integer   |
   | role           | string  |       | name        | string  |   |  | topspeed     | integer   |
   | created_at     | time    |  +----+ location    | id      |   |  | armorf       | integer   |
   | updated_at     | time    |  |    | money       | integer |   |  | armorr       | integer   |
   | firstname      | string  |  |    | health      | integer |   |  | armorb       | integer   |
   | lastname       | string  |  |----+ destination | id      |   |  | armorl       | integer   |
   | driVerid       | id      |  |    +-----------------------+   |  | tired        | string    |
   +--------------------------+  |                                |  | engine       | string    |
                                 |                                |  +--------------------------+
                                 |                                |
   +-----------------------+     |                                |  +----------------------+
   | Locations             |<----+                                |  | Trips                |
   +-----------------------+                                      |  +----------------------+
   | id          | integer |<----------------------------------+  +--+ driverid   | id      |
   | name        | string  |                                   |     | sequence   | integer |
   | latitude    | float   |          +----------------------+ +-----+ locationid | id      |
   | longitude   | float   |          | Connections          |       +----------------------+
   | description | string  |          +----------------------+
   | population  | integer |<---------+ start      | id      |
   | tech        | integer |<---------+ end        | id      |
   | factionid   | id      +----+     | distance   | integer |
   | type        | string  |    |     | difficulty | integer |
   +-----------------------+    |     +----------------------+
                                v
```

**config**

Column | Type | Modifiers
---|---|---
config | character varying(255) |
defaultLocation | integer                |

**connections**

Column | Type | Modifiers
---|---|---
start | integer |
end | integer |
distance | integer |
`
Foreign-key constraints:
 "city_link_city1_foreign" FOREIGN KEY (start) REFERENCES locations(id) ON DELETE CASCADE
 "city_link_city2_foreign" FOREIGN KEY (end) REFERENCES locations(id) ON DELETE CASCADE
`

**drivers**

Column | Type | Modifiers
---|---|---
id          | integer                  | not null default nextval('drivers_id_seq'::regclass)
created_at  | timestamp with time zone | not null default now()
updated_at  | timestamp with time zone | not null default now()
name        | character varying(255)   | not null
location    | integer                  |
money       | integer                  | not null default 0
health      | integer                  | not null default 100
destination | integer                  |
`
Indexes:
"drivers_pkey" PRIMARY KEY, btree (id)
`

`
Foreign-key constraints:
"drivers_destination_foreign" FOREIGN KEY (destination) REFERENCES locations(id)
"drivers_location_foreign" FOREIGN KEY (location) REFERENCES locations(id) ON DELETE CASCADE
`

`
Referenced by:
TABLE "users" CONSTRAINT "users_driverid_foreign" FOREIGN KEY (driverid) REFERENCES drivers(id) ON DELETE CASCADE
`

**locations**

Column | Type | Modifiers
---|---|---
id          | integer                | not null default nextval('cities_id_seq'::regclass)
name        | character varying(255) | not null
latitude    | real                   | not null
longitude   | real                   | not null
description | character varying(255) | not null default 'This is a location.'::character varying
population  | integer                | not null default 1000
tech        | integer                | not null default 5
factionid   | integer                | not null default 0
type        | text                   | default 'hold'::text
`
Indexes:
"cities_pkey" PRIMARY KEY, btree (id)
"cities_name_unique" UNIQUE CONSTRAINT, btree (name)
`

`
Check constraints:
"locations_type_check" CHECK (type = ANY (ARRAY['hold'::text, 'freehold'::text, 'camp'::text, 'fort'::text, 'compound'::text, 'hardhold'::text, 'enclave'::text]))
`

`
Referenced by:
TABLE "connections" CONSTRAINT "city_link_city1_foreign" FOREIGN KEY (start) REFERENCES locations(id) ON DELETE CASCADE
TABLE "connections" CONSTRAINT "city_link_city2_foreign" FOREIGN KEY (end) REFERENCES locations(id) ON DELETE CASCADE
TABLE "drivers" CONSTRAINT "drivers_destination_foreign" FOREIGN KEY (destination) REFERENCES locations(id)
TABLE "drivers" CONSTRAINT "drivers_location_foreign" FOREIGN KEY (location) REFERENCES locations(id) ON DELETE CASCADE
`

**trips**

Column    |  Type   | Modifiers
---|---|---
driverid | integer | not null
locationid | integer | not null
sequence | integer | not null

`
Foreign-key constraints:
   "trips_destination_foreign" FOREIGN KEY (destination) REFERENCES locations(id)
   "trips_driverid_foreign" FOREIGN KEY (driverid) REFERENCES drivers(id)
`

**users**

Column | Type | Modifiers
---|---|---
id             | integer                  | not null default nextval('users_id_seq'::regclass)
email          | character varying(255)   | not null
hashedPassword | character(60)            | not null
role           | text                     | default 'player'::text
created_at     | timestamp with time zone | not null default now()
updated_at     | timestamp with time zone | not null default now()
firstname      | character varying(255)   | not null
lastname       | character varying(255)   | not null
driverid       | integer                  |
`
Indexes:
"users_pkey" PRIMARY KEY, btree (id)
"users_email_unique" UNIQUE CONSTRAINT, btree (email)
`

`
Check constraints:
"users_role_check" CHECK (role = ANY (ARRAY['player'::text, 'admin'::text]))
`

`
Foreign-key constraints:
"users_driverid_foreign" FOREIGN KEY (driverid) REFERENCES drivers(id) ON DELETE CASCADE
`

**vehicles**

Column | Type | Modifiers
---|---|---
id           | integer                  | not null default nextval('vehicles_id_seq'::regclass)
created_at   | timestamp with time zone | not null default now()
updated_at   | timestamp with time zone | not null default now()
model        | character varying(255)   | not null
size         | character varying(255)   | not null
type         | character varying(255)   | not null
cargocap     | integer                  | not null
passengercap | integer                  | not null
fuelcap      | integer                  | not null
mpg          | integer                  | not null
price        | integer                  | not null
topspeed     | integer                  | not null
armorf       | integer                  | not null
armorr       | integer                  | not null
armorb       | integer                  | not null
armorl       | integer                  | not null
tires        | character varying(255)   | not null default ''::character varying
engine       | character varying(255)   | not null default ''::character varying
`
Indexes:
"vehicles_pkey" PRIMARY KEY, btree (id)
`
