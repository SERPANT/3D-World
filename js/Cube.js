var CubeObject = function() {
  var c = 10;
  this.verti = [];
  this.Type;
  this.temp = [];

  var cube = [];

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
    theta = 0,
    objectType = 0,
    size = 10
  ) {
    this.Type = objectType;
    c = size;

    cube = [
      [-c, -c, -c],
      [c, -c, -c],
      [c, c, -c],
      [-c, c, -c],
      [-c, -c, c],
      [c, -c, c],
      [c, c, c],
      [-c, c, c]
    ];

    var [s, d, f] = rotateSelf(theta, pos);

    for (i in cube) {
      var [X, Y, Z] = cube[i];
      this.verti.push([s + X, d + Y, f + Z]);
    }
    this.color = color;
  };

  function rotateSelf(theta, position) {
    var [x, y, z] = position;
    var s = Math.cos(theta) * x - Math.sin(theta) * z;
    var d = y;
    var f = Math.sin(theta) * x + Math.cos(theta) * z;

    return [s, d, f];
  }
};
