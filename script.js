const r = 6371000;

var degToRad = function(deg) {
  return deg * (Math.PI / 180);
}

module.exports = {
  geodesic: function (a, b, max) {
    const latA = degToRad(a[0]), latB = degToRad(b[0]);
    const longA = degToRad(a[1]), longB = degToRad(b[1]);
    var a = Math.sin((latB - latA) / 2) * Math.sin((latB - latA) / 2) +
      Math.cos(latA) * Math.cos(latB) * 
      Math.sin((longB - longA) / 2) * Math.sin((longB - longA) / 2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return r * c;
  }
}