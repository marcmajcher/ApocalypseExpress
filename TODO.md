# ApocalypseExpress TODO List

## Implementing

* MOAR TESTS
* User should be able to buy and sell goods at locations
  * Update goods list in UI with Buy/Sell buttons
  * Update goods list screen with available cargo and money
  * Write trade route to buy items
  * Write trade route to sell items

## On Deck

* User should not be able to buy and sell while traveling
  * Refactor the currentLocation while traveling to lastLocation
* User should not be able to buy goods if none in stock
* User should not be able to sell goods if no capacity left
* User should not be able to buy goods if they don't have enough money
* User should not be able to buy goods if they don't have enough cargo space
* User should not be able to buy or sell goods from a location that doesn't have them

* Trips should take fuel based on distance and km/l
* User should not be able to take trip unless they have sufficient fuel
* Destinations should be disabled in UI if unavailable
* Player should be able to refuel at cost in locations
* Player should not be able to refuel if they don't have enough money

* Move trade good modifier/price calculation to library
* Load base goods/prices on server load, keep in memory/service

* Update population, stock, demand, and production for each location and trade good daily
  * If capacity is full, increase capacity or demand?
* Recalculate modifier and price when location_goods is updated

* User should be able to click on city on map to set destination
* Animate screen transitions

## Testing

* seed files for tradegoods and location_goods
* tests for tradegoods and location_goods
* update tests to reflect new account info update method
* test new password change method
* move all frontend tests to protractor
* Write tests for all services
* Write tests for ticker
* Write tests for socket
* Test handling of ajax errors on client - test when server down

## Bugs

* Check out paper bug on home page - in map component, I reckon
* Fix header tab tops in Safari (https://github.com/postcss/autoprefixer?)
* Update "logout $user" in header when user info is updated
* Fix flash messaging
* Update header to be responsive on mobile
* Remove 'ok' from loading on name change/error?

## Backlog

* update gulp to use webpack?
* Add summary of play to News tab
  * Location / Date/time
    * Calculate Date/time => Start at 12/21/2012GMT, time goes 10x faster
  * Driver / Vehicle
  * Local News

* Gin up something for the home page
* Looks like we need something for the "news" page, too.
* Create fake news for News tab (location-based)

* User should be able to update driver name
* User should be able to rename vehicle

* For trips, set vehicle top speed, allow user to choose max speed for trip (slower, safer)
* For trips, record start and end time, and speed, to see how long it takes and whatnot.
* Difficulty of a trip (1-10) is x * .05 chance of an event every km
* Is there something fun to do while they're driving? Minigame? Dashboard?

* Trips between locations should have events
* Replace location description with event log when traveling
* Generate AW-type description for new drivers

* Refactor connections stuff out of the map request - use trip(??)

* Driver should have reputations (for driving/exploring/combat/trade/etc.)
* Create driver_reputations table

* Drivers should have reputation with each faction
* Drivers should have a starting reputation with each faction
* Each faction should have a set of attributes
  * Name
  * Home location
  * Make faction symbols for all the factions, put in header?
  * Use faction symbols for source cities

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
* Buddies (driver/gunner/trader/etc)

* Bots - virtual drivers to exercise System
* Location thing - see who else is there, location chat
* Chat/message window (tutorial), random location chatter generator
* Click on map to navigate?

* Every day, increase population by 1/50,000
  * if pop < 50k, increase by one by random %
* Every day, adjust trade good production and demands by % of population

## Frontend/UI Tasks

* Add smooth transition animation for centerMap
* set map font to roboto

* Graphics - find city/landscape images and process
  - HDR/de|saturate with drip filters

## Backend Tasks

* System should create event log for every route action
* Look at what db tables might need to be indexed
* Think about internationalization

## Admin / Game Management

* Add page to add/edit news for locations
  * (add missions to deliver news)

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
* make header bg opacity .5, overlay sand on metal
* rearrange modules on page
* Should be able to switch between views with tabs
* convert account tab to use controller for email/name
* Driver Status tab
* Think about using ui-router for paths/tabs (thought about it, nah)
* convert account update route to return and handle ajax, not redirect
* Deactivate Location tab while traveling
* Create sub-tabs for Location tab
  * Info
  * Rumors/Bar/Etc
  * Buy and Sell Cargo
  * Buy and Sell Equipment / Weapons
  * Chop Shop
  * Mission Board
  * (Bank??)
  * Fuel Depot / Mechanic
* Travel tab - should just be location tab when traveling?
* Do I want to use ui-router for tabs? I kind of don't.
* Each second, advance trip progress according to speed
  * 60 km/h = 60000 m/h = 1000 m/min = 16.667 m/sec
  * m/sec = km/h / 3.6 real time; 60x = km/h * 16.6667 / 6 => 2.777
* Set up Location screens/tabs

* Item cost calculations

Items have [itemId, name, minimumTech, rarity, and basePrice]
Location_Items have [locationId, itemId, price, modifier, stock, capacity, demand, and production]

Price for a location is calculated:

  const volumeMod = Math.log10(Math.max(1, demand - Math.max(1, demand - production))) * 0.01;
  const rarityMod = (1 - (stock / Math.max(1, capacity))) / 10;
  const flow = production - demand
  const flowBase = (flow > 0) ? 0.9 - Math.log10(flow) * 0.03 :
                   (flow < 0) ? 0.9 + Math.log10(demand - production) * 0.06 : 0.9
  modifier = flowBase + rarityMod - volumeMod + 0.05
  price = basePrice * modifier

* Each trade good should have a base price, modified by multipliers in each location

To set up seeds:
* For each location:
  * For each trade good, if the tech level of the location is at least the level of the good,
    * Roll %, if under rarity of good:
      * Add trade good to location
        * Capacity, Demand, Production are location population * good rarity +/- random 0-50%
        * Stock is random % of Capacity
      * Modifier and price are calculated when item is added to location

* location info should return list of goods
* Each location should have a list of goods for trade with quantities and prices
* Good prices should update after travel

* Streamline protractor testing process
  - Add webdriver, app start, and protractor running to gulp task
* update all protractor tests

* update all api routes to start with /api (update tests) NAH
