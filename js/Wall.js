var Wall = function() {
  this.CubeArray = [];
  this.top;

  this.makeWall = function(detail) {
    var [x, y, z, wallW, wallH, angle, color] = detail;

    for (var i = x; i < x + wallW; i = i + 20) {
      for (var j = y; j < y + wallH; j = j + 20) {
        cubeOb = new CubeObject();
        cubeOb.init([i, -j, z], color, angle);
        this.CubeArray.push(cubeOb);
      }
    }

    var final = this.CubeArray[this.CubeArray.length - 1];
    this.top = final.verti[Math.floor((final.verti.length - 1) / 2)];
  };

  this.getCube = function() {
    return this.CubeArray;
  };
};
