function Game(canv) {
  var canvas;
  var ctx;
  var canvasWidth;
  var canvasHeight;
  const dx = 500;
  const dy = 500;
  var cam;
  var cw = 1000;
  var ch = 1000;
  var oldmousex = 0;
  var oldmousey = 0;
  var objects = [];

  var map = [[]];

  var v = 10;

  this.init = function(canv) {
    setupCanvas(canv);

    cam = new camera();
    cam.init([0, -140, -70]);

    objects = Object.assign([], makeRoad(0));
    cubeOb = new CubeObject();
    cubeOb.init([0, 0, -100]);
    objects.push(cubeOb);

    draw();
  };

  function setupCanvas(canv) {
    canvas = canv;
    ctx = canvas.getContext("2d");
    canvasWidth = canvas.width / 2;
    canvasHeight = canvas.height / 2;
  }

  //adding camera
  function rotate2D(pos, rad) {
    [x, y] = pos;
    s = Math.sin(rad);
    c = Math.cos(rad);
    return [x * c - y * s, y * c + x * s];
  }

  function TransformAndRotate(q, w, e) {
    q -= cam.positon[0];
    w -= cam.positon[1];
    e -= cam.positon[2];

    [v, d] = rotate2D([q, e], cam.rotation[1]);
    q = v;
    e = d;

    return [q, w, e];
  }

  function project(q, w, e) {
    f = 200 / (e / 3);
    q = q * f;
    w = w * f;
    return [q, w];
  }

  function drawCube(facesList, color) {
    for (j in facesList) {
      var face = facesList[j];
      ctx.beginPath();

      ctx.moveTo(face[0][0], face[0][1]);

      // Draw the other vertices
      for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
        ctx.lineTo(face[k][0], face[k][1]);
      }

      // Close the path and draw the face
      ctx.closePath();
      //ctx.stroke();
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  function checkCubeOnScreen(face, screen_coords, vertexList) {
    for (vertex of face) {
      [x, y] = screen_coords[vertex];
      if (
        vertexList[vertex][2] > -10 &&
        x > -15 &&
        x < cw + 20 &&
        y > 0 &&
        y < ch + 20 &&
        vertexList[vertex][2] < 900
      ) {
        onscreen = true;
      } else {
        onscreen = false;
        break;
      }
    }

    return onscreen;
  }

  function draw() {
    ctx.clearRect(0, 0, 2 * canvasWidth, 2 * canvasHeight);

    for (var cubeObject of objects) {
      cube = cubeObject.verti;

      var vertexList = [];
      var screen_coords = [];

      for (var i of cube) {
        var [q, w, e] = i;
        [q, w, e] = TransformAndRotate(q, w, e);
        vertexList.push([q, w, e]);
        [q, w] = project(q, w, e);
        screen_coords.push([q + dx, w + dy]);
      }

      facesList = [];
      var onscreen;

      for (face of cubeObject.cubeFace) {
        onscreen = false;
        onscreen = checkCubeOnScreen(face, screen_coords, vertexList);
        if (onscreen) {
          var coords = [];
          for (var i of face) {
            coords.push(screen_coords[i]);
          }
          facesList.push(coords);
        }
      }

      drawCube(facesList, cubeObject.color);
    }
    requestAnimationFrame(draw);
  }

  function makeWall(x, y, z) {
    arr = [];

    cubeOb = new CubeObject();
    cubeOb.init([0, 0, z]);
    arr.push(cubeOb);
    for (var i = x; i < 50; i = i + 10) {
      for (var j = y; j < 50; j = j + 2) {
        cubeOb = new CubeObject();
        cubeOb.init([-i, -j, z]);
        arr.push(cubeOb);

        cubeOb = new CubeObject();
        cubeOb.init([i, -j, z]);
        arr.push(cubeOb);
      }
    }
    return arr;
  }

  function makeRoad(y) {
    arr = [];

    for (var j = 20; j < 250; j = j + 6) {
      cubeOb = new CubeObject();
      cubeOb.init([0, y, j], "white");
      arr.push(cubeOb);
    }

    for (var i = 8; i < 150; i = i + 10) {
      for (var j = 20; j < 250; j = j + 6) {
        cubeOb = new CubeObject();
        cubeOb.init([-i, y, j], "gray");
        arr.push(cubeOb);

        cubeOb = new CubeObject();
        cubeOb.init([i, y, j], "gray");
        arr.push(cubeOb);
      }
    }
    return arr;
  }

  function move(event) {
    cam.update(event.code);
  }

  function mouse(event) {
    cam.rotate(event, oldmousex, oldmousey);
  }

  function mousedown(event) {
    cam.mousedown = true;
    oldmousex = event.clientX;
    oldmousey = event.clientY;
  }

  function mouseup() {
    cam.mousedown = false;
  }

  document.addEventListener("keydown", move);
  document.addEventListener("mousedown", mousedown);
  document.addEventListener("mousemove", mouse);
  document.addEventListener("mouseup", mouseup);
}

var game = new Game();
game.init(document.getElementsByClassName("canvas")[0]);
