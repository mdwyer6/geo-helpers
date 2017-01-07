//var DBSCAN = require('dbscan');
//var spawn = require("child_process").spawn;

const r = 6371000;

var _degToRad = function(deg) {
  return deg * (Math.PI / 180);
}

var _radToDeg = function(rad) {
  return rad * (180 / Math.PI);
}

var _geoToCartesian = function(lat, long) {
  lat = _degToRad(lat);
  long = _degToRad(long);
  var N = 6378000 / Math.sqrt(1 - 0.00669438444 * Math.pow(Math.sin(lat), 2));
  var x = N * Math.cos(lat) * Math.cos(long);
  var y = N * Math.cos(lat) * Math.sin(long);
  var z = (N * (1 - 0.00669438444)) * Math.sin(lat);

  return [x, y, z];
}

// var _cartesianToGeo = function(x, y, z) {

// }

var findGeodesic = function (latA, longA, latB, longB, max) {
    latA = _degToRad(latA);
    latB = _degToRad(latB);
    longA = _degToRad(longA); 
    longB = _degToRad(longB);
    var a = Math.sin((latB - latA) / 2) * Math.sin((latB - latA) / 2) +
      Math.cos(latA) * Math.cos(latB) * 
      Math.sin((longB - longA) / 2) * Math.sin((longB - longA) / 2); 
    var dist = r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    if (max) {
      return dist > max;
    }
    
    return dist;
  },

var findCentroid = function (latArr, longArr) {
    let latSum = 0;
    let longSum = 0;
    for (var i = 0; i < Math.max(latArr.length, longArr.length); i++) {
      latSum += latArr[i] || 0;
      longSum += longArr[i] || 0;
    }

    return [latSum / latArr.length, longSum / longArr.length];
  },

var interpolatePoints = function(latA, longA, latB, longB, distBetweenPoints) {
    var totalDist = findGeodesic(latA, longA, latB, longB);
    var latDisplacement = latB - latA;
    var longDisplacement = longB - longA;
    var coords = [];
    var ratio = distBetweenPoints / totalDist;
    for (var i = 0; i < Math.floor(totalDist / distBetweenPoints); i++) {
      var pair = [];
      pair.push(latA + (latDisplacement * ratio) * (i + 1), longA + (longDisplacement * ratio) * (i + 1));
      coords.push(pair);
    }

    return coords;
  }

  //---------------------------------------------------------//
  //---------------------In Developement---------------------//
  //---------------------------------------------------------//

  // findClusters: function (maxDist, minSamples, dataset) {
  //   var eps = maxDist / r;
  //   var python = spawn('python',["./cluster.py", eps, minSamples, dataset]);
  //   var result = '';
    

  //   process.stdout.on('data', function(data) {
  //     result += data;
  //   });

  //   return result;
  // }

module.exports = {
  findGeodesic: findGeodesic,
  findCentroid: findCentroid,
  interpolatePoints: interpolatePoints
}