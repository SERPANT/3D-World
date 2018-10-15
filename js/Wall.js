var Wall = function() {
  this.CubeArray = [];

  this.makeWall = function(detail) {
    var [x, y, z, wallW, wallH, color] = detail;

    for (var i = x; i < x + wallW; i = i + 20) {
      for (var j = y; j < y + wallH; j = j + 20) {
        cubeOb = new CubeObject();
        cubeOb.init([i, -j, z], color);
        this.CubeArray.push(cubeOb);
      }
    }
  };

  this.getCube = function() {
    return this.CubeArray;
  };
};
