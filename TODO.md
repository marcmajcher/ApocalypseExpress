# ApocalypseExpress TODO List

## Implementing

* DB error checking everywhere

## Writing Unit Tests

* Write tests for all services

## On Deck


## Backlog

* User should be able to buy and sell goods at locations
* Each trade good should have a base price, modified by multipliers in each location
* Each location should have a list of goods for trade with quantities and prices
* Refactor location positions from lat/long to x/y km from Ozz
* Work on models (services?) for locations/drivers/etc in object class format
* Driver should have reputations (for driving/exploring/combat/trade/etc.)
* Get browser sync and livereload working with gulp and nodemon
* Driver should have a current vehicle
* Connections between locations should have a correct distance and difficulty (# of events?)
* Add driver_vehicles for vehicle upgrades/alterations
* Drivers should be able to upgrade/alter vehicles
* Drivers should have reputation with each faction
* Create driver_reputations table
* Trips between locations should have events
* Drivers should have a starting reputation with each faction
* Drivers should keep track of how many kills they have made (how much damage done/taken?)
* Drivers should keep track of total money made
* Drivers should keep track of how many events they've encountered (success/failure?)
* Drivers should keep track of how many km they've driven
* Badges should be available for various milestones
* Vehicles should have a list of attributes
  * Model
  * Size
  * Type
  * Cargo Capacity
  * Fuel Capacity
  * kmpg
  * Base Price
  * Top Speed
  * Passengers
  * TRBL armor
  * Weapons
  * Add-ons
* Each faction should have a set of attributes
  * Name
  * Home location
* Each location should have a set of services
  * Exits
  * Mission Board
  * Trading Post
  * Chop Shop
  * News Outlet
* Mission Board: the WALL (Work and Labor List)

## Frontend/UI Tasks

* Update header to be responsive
* Overall design
* Angular form validation on login and register

## Backend Tasks

* Add server side check for password and email validity on register and /account
* System should create event log for every route action
* Index db tables
* Update auth to use JWT
* Think about internationalization

## Admin Map Editor

* Fix zoom multiplier bug on location move
* Create 'add new location' route
* Admin should be able to add a new location
* Return dot to original location if canceled
* Admin should be able to edit location connections

----

## Done

* User should not be able to set a new destination that is not connected to their current location.
* Drivers should keep track of all locations visited
* Trip should delete trip when completed
* Only add location to driver_visited the first time visited
* Get correct length for trips
