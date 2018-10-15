var camera = function() {
  //assuming y axis is top and bottom movement
  //assuming x axis is left and right movement
  //assuming any forward and backward movement is z axis movement

  this.mousedown = false;

  //here rotation[0]---this is the rotation of x axis
  //then rotation[1]---this is the rotation of y axis

  this.init = function(positon = [0, 0, 0], rotation = [0, 0]) {
    this.positon = positon;
    this.rotation = rotation;
  };

  this.update = function(key) {
    var s = 10;

    if (key === "KeyE") {
      this.positon[1] -= s;
    }
    if (key === "KeyQ") {
      this.positon[1] += s;
    }

    //this is the movement required so as the insure the correct rotation
    //this is rotation 1 as we are taking the x axis for transformation
    x = s * Math.sin(this.rotation[1]);
    y = s * Math.cos(this.rotation[1]); //this y is for z axis

    //this works as we are still working with increasing the distance and not anything else
    if (key === "KeyW") {
      this.positon[0] += x;
      this.positon[2] += y;
    }
    if (key === "KeyS") {
      this.positon[0] -= x;
      this.positon[2] -= y;
    }
    if (key === "KeyA") {
      this.positon[0] -= y;
      this.positon[2] += x;
    }
    if (key === "KeyD") {
      this.positon[0] += y;
      this.positon[2] -= x;
    }

    // if(key==="KeyW") {  this.positon[2]+=s; }
    // if(key==="KeyS") {  this.positon[2]-=s; }
    // if(key==="KeyA") { this.positon[0]-=s; }
    // if(key==="KeyD") { this.positon[0]+=s;  }
  };

  this.rotate = function(event, oldmousex, oldmousey) {
    if (this.mousedown) {
      x = oldmousex - event.clientX;
      y = oldmousey - event.clientY;

      //controlling the sensativity so that rotation does not happen very fast
      x /= 1000;
      y /= 1000;

      this.rotation[0] += y; //rotation arround x axis
      this.rotation[1] += x; //rotation arround y axis
    }
  };
};
