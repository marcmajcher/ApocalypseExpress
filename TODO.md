# ApocalypseExpress TODO List

## Implementing

* rearrange modules on page
* Tabs:
  * News
  * Location:
    * Info
    * Rumors/Bar/Etc
    * Buy and Sell Cargo
    * Buy and Sell Equipment / Weapons
    * Chop Shop
    * Mission Board
    * (Bank??)
    * Fuel Depot / Mechanic
  * Travel
  * Driver Status
    * Buddies (driver/gunner/trader/etc)

## On Deck


## Writing Unit Tests

* Write tests for all services
* Write tests for ticker
* Write tests for socket
* Test handling of ajax errors on client - test when server down

## Bugs

* Update header to be responsive on mobile

## Backlog

* For trips, set vehicle top speed, allow user to choose max speed for trip (slower, safer)
* For trips, record start and end time, and speed, to see how long it takes and whatnot.
* Difficulty of a trip (1-10) is x * .05 chance of an event every km
* Is there something fun to do while they're driving? Minigame? Dashboard?
* Trips between locations should have events
* Replace location description with event log when traveling
* Generate AW-type description for new drivers

* User should be able to rename vehicle
* Each location should have a list of goods for trade with quantities and prices
* Each trade good should have a base price, modified by multipliers in each location
* User should be able to buy and sell goods at locations

* Refactor connections stuff out of the map request - use trip(??)

* Driver should have reputations (for driving/exploring/combat/trade/etc.)
* Create driver_reputations table

* Drivers should have reputation with each faction
* Drivers should have a starting reputation with each faction
* Each faction should have a set of attributes
  * Name
  * Home location

* Add driver_vehicles for vehicle upgrades/alterations
* Drivers should be able to upgrade/alter vehicles

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

* Refactor location positions from lat/long to x/y km from Ozz?
* Get browser sync and livereload working with gulp and nodemon?
* Shut down socket when browser window closes, or on error?

* Bots - virtual drivers to exercise System
* Location thing - see who else is there, location chat
* Chat/message window (tutorial), random location chatter generator

## Frontend/UI Tasks

* Add smooth transition animation for centerMap

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
* Trip not working
* connections model
* Angular form validation on login and register - http://www.ng-newsletter.com/posts/form-validation-with-angularjs.html
* Create custom directives for form validation
* NOT Update auth to use JWT http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/
* Update ticker loop with Promise.all: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
* set up little socket server for trip progress push ("little")
* Show trip progress via socket messages, refresh when done
* When user logs out during trip, don't emit:
Unhandled rejection TypeError: Cannot read property 'emit' of undefined
    at util.knex.where.then (/Users/majcher/repo/ApocalypseExpress/app/models/trip.js:91:17)
(Also drivers.traveling=t/f bug)
* Set destination on load/game start if in progress or selected (set traveling flag)
* Why not returning destination id on game load?
* Test everything by turning off server and displaying message for 500
* Why is it making two calls to /map on the game page?
* Move map as driver travels - add travel dot?
* Driver should have a current vehicle
* Vehicles should have a name
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
  * display driver stats and vehicle on dashboard
  * create component for driver stats
* Overall design
