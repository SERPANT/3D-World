var Road = function() {
  this.CubeArray = [];
  this.top = [8000, 8000, 8000];

  this.makeRoad = function(start) {
    //  console.log(start);
    for (var x = -start; x < start; x += 20) {
      for (var z = -150; z < 800; z += 20) {
        cubeOb = new CubeObject();
        cubeOb.init([x, -100, z], "green", 0, 2);
        this.CubeArray.push(cubeOb);
      }
    }
  };

  this.getCube = function() {
    return this.CubeArray;
  };
};
