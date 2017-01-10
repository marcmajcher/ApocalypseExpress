# ApocalypseExpress TODO List

## Implementing

* connections model
* Better handling of ajax errors on client

## Writing Unit Tests

* Test everything by turning off server and displaying message for 500
* Write tests for all services
* Write tests for ticker

## On Deck

* Driver should have a current vehicle

## Bugs

* Trip not working
* Why is it making two calls to /map on the game page?

## Backlog

* Trips between locations should have events

* Each location should have a list of goods for trade with quantities and prices
* Each trade good should have a base price, modified by multipliers in each location
* User should be able to buy and sell goods at locations

* Driver should have reputations (for driving/exploring/combat/trade/etc.)
* Create driver_reputations table

* Drivers should have reputation with each faction
* Drivers should have a starting reputation with each faction
* Each faction should have a set of attributes
  * Name
  * Home location

* Add driver_vehicles for vehicle upgrades/alterations
* Drivers should be able to upgrade/alter vehicles

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

* Each location should have a set of services
  * Exits
  * Mission Board
  * Trading Post
  * Chop Shop
  * News Outlet
  * Mission Board: the WALL (Work and Labor List)

* Drivers should keep track of how many kills they have made (how much damage done/taken?)
* Drivers should keep track of total money made
* Drivers should keep track of how many events they've encountered (success/failure?)
* Drivers should keep track of how many km they've driven
* Badges should be available for various milestones

* Refactor location positions from lat/long to x/y km from Ozz
* Get browser sync and livereload working with gulp and nodemon

## Frontend/UI Tasks

* Update header to be responsive
* Overall design
* Angular form validation on login and register - http://www.ng-newsletter.com/posts/form-validation-with-angularjs.html

## Backend Tasks

* System should create event log for every route action
* Index db tables
* Think about internationalization

## Admin Map Editor

* Add ability to edit distance and difficulty of connections
* Fix zoom multiplier bug on location move
* Create 'add new location' route
* Admin should be able to add a new location
* Return dot to original location if canceled
* Admin should be able to edit location connections

----
* Update auth to use JWT
http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/
* DB error checking everywhere

## Done

* Work on models (services?) for locations/drivers/etc in object class format
* Add server side check for password and email validity on register and /account
* User should not be able to set a new destination that is not connected to their current location.
* Drivers should keep track of all locations visited
* Trip should delete trip when completed
* Only add location to driver_visited the first time visited
* Get correct length for trips
* Componentize angular directives/controllers
* Connections between locations should have a correct distance and difficulty (# of events?)
