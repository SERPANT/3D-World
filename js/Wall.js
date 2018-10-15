var Wall = function() {
  this.CubeArray = [];
  this.top;

  this.makeWall = function(detail) {
    var [x, y, z, wallW, wallH, color] = detail;
    this.top = [x + wallW, y + wallH, z];
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
