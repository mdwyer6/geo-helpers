const r = 6371000;

var degToRad = function(deg) {
  return deg * (Math.PI / 180);
}

module.exports = {
  geodesic: function (latA, longA, latB, longB, max) {
    latA = degToRad(latA);
    latB = degToRad(latB);
    longA = degToRad(longA); 
    longB = degToRad(longB);
    var a = Math.sin((latB - latA) / 2) * Math.sin((latB - latA) / 2) +
      Math.cos(latA) * Math.cos(latB) * 
      Math.sin((longB - longA) / 2) * Math.sin((longB - longA) / 2); 
    var dist = r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    if (max) {
      return dist > max;
    }
    
    return dist;
  }
}