const r = 6371000;

var degToRad = function(deg) {
  return deg * (Math.PI / 180);
}

var radToDeg = function(rad) {
  return rad * (180 / Math.PI);
}

module.exports = {
  findGeodesic: function (latA, longA, latB, longB, max) {
    latA = degToRad(latA);
    latB = degToRad(latB);
    longA = degToRad(longA); 
    longB = degToRad(longB);
    var a = Math.sin((latB - latA) / 2) * Math.sin((latB - latA) / 2) +
      Math.cos(latA) * Math.cos(latB) * 
      Math.sin((longB - longA) / 2) * Math.sin((longB - longA) / 2); 
    var dist = r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    if (max) {
      return dist > max;
    }
    
    return dist;
  }

  findCentroid: function (latArr, longArr) {
    let latSum = 0;
    let longSum = 0;
    for (var i = 0; i < Math.max(latArr.length, longArr.length); i++) {
      latSum += latArr[i] || 0;
      longSum += longArr[i] || 0;
    }

    return [latSum / latArr.length, longSum / longArr.length];
  }
}