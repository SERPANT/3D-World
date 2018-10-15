var CubeObject = function() {
  var c = 10;
  this.verti = [];
  this.Type;

  var cube = [
    [-c, -c, -c],
    [c, -c, -c],
    [c, c, -c],
    [-c, c, -c],
    [-c, -c, c],
    [c, -c, c],
    [c, c, c],
    [-c, c, c]
  ];

  this.cubeFace = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 1, 5, 4],
    [2, 3, 7, 6],
    [0, 3, 7, 4],
    [1, 2, 6, 5]
  ];

  this.color;

  this.init = function(
    pos = [0, 0, 0],
    color = "red",
    objectType = 0,
    size = 5
  ) {
    this.Type = objectType;
    c = size;
    var [x, y, z] = pos;

    for (i in cube) {
      var [X, Y, Z] = cube[i];
      this.verti.push([x + X, y + Y, z + Z]);
    }
    this.color = color;
  };
};
