#Geo-helpers

[![CircleCI Status](https://circleci.com/gh/mdwyer6/geo-helpers/tree/master.svg?style=shield&circle-token=0444f057fadb28aacd3cb6b5809dc831f439dd0b)](https://circleci.com/gh/mdwyer6/geo-helpers)

Helper methods for dealing with geolocation.

##Installation
```npm install geo-helpers```

##Methods
###findGeodesic(latA, longA, latB, longB[, max])
* latA - Float
* longA - Float
* latB - Float
* longB - Float
* max - Integer

If max parameter is excluded function returns the orthodromic distance between given coordinates a and b. Otherwise checks if orthodromic distance between a and b exceeds the max parameter and returns a boolean value.

###findCentroid(latArr, longArr)
* latArr - Array
* longArr - Array

Returns geometric midpoint (arithmetic mean) given an array of latitude coordinates and an array of longitude coordinates.

###interpolatePoints(latA, longA, latB, longB, distBetweenPoints)
* latA - Float
* longA - Float
* latB - Float
* longB - Float
* distBetweenPoints - Float

Returns geographical coordinates of a fixed distance apart (distBetweenPoints) along the direct path between two given points.