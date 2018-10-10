const canvas=document.getElementsByClassName('canvas')[0]
const ctx=canvas.getContext('2d');
const dx = canvas.width / 2;
const dy = canvas.height / 2;
var cam;
var w=1000;
var h=1000;
var oldmousex=0;
var oldmousey=0;
//var radian=0;

var c=3;
var v=10;
var cube= [[-c,-c,-c],
            [c,-c,-c],
            [c,c,-c],
            [-c,c,-c],
            [-c,-c,c],
            [c,-c,c],
            [c,c,c],
            [-c,c,c]];

 var cube2= [[-v,-v,-v],
            [v,-v,-v],
            [v,v,-v],
            [-v,v,-v],
            [-v,-v,v],
            [v,-v,v],
            [v,v,v],
            [-v,v,v]];

var cubeEdges=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];

var cubeFace=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[0,3,7,4],[1,2,6,5]];
var faceColor=['rgb(255, 0, 0)','rgb(0,155, 0)','rgb(0, 0, 255)','rgb(255,20,0)','rgb(255,255,0)','rgb(0,155,255)'];


//adding camera

var camera =function()
{

  //assuming y axis is top and bottom movement 
  //assuming x axis is left and right movement
  //assuming any forward and backward movement is z axis movement

  this.mousedown=false;

  //here rotation[0]---this is the rotation of x axis
  //then rotation[1]---this is the rotation of y axis

  this.init=function(positon=[0,0,0],rotation=[0,0])
  {
    this.positon=positon;
    this.rotation=rotation;
  }

  this.update=function(key)
  { 
    var s=3;
 
    if(key==="KeyE") { this.positon[1]-=s; }
    if(key==="KeyQ") { this.positon[1]+=s; }

    x=s*Math.sin(this.rotation[1]);
    y=s*Math.cos(this.rotation[1]);
    
   
    //this works as we are still working with increasing the distance and not anything else
    if(key==="KeyW") { this.positon[0]+=x; this.positon[2]+=y; }
    if(key==="KeyS") { this.positon[0]-=x; this.positon[2]-=y; }
    if(key==="KeyA") { this.positon[0]-=y; this.positon[2]+=x; }
    if(key==="KeyD") { this.positon[0]+=y; this.positon[2]-=x; }
 
  }



  this.rotate=function(event)
  {
    if(this.mousedown) {

      x = oldmousex - event.clientX;
      y = oldmousey - event.clientY;
  
      //controlling the sensativity so that rotation does not happen very fast
      x/=8000;
      y/=8000;

      this.rotation[0]+=y;  //this is where we define that rotation0 for for y movement 
      this.rotation[1]+=x;
    }

  }
}


function rotate2D(pos,rad)
{
  [x,y]=pos;
  s=Math.sin(rad);
  c=Math.cos(rad);
  return [x*c-y*s,y*c+x*s];
}




function draw(objects)
{

  ctx.clearRect(0, 0, 2*dx, 2*dy);
  //drawEdges();

  var vertexList=[];
  var screen_coords=[];


    for ( var i of  cube)
    {
      
        var [q,w,e]=i;

        q-=cam.positon[0];
        w-=cam.positon[1];
        e-=cam.positon[2];

        [v,d]=rotate2D([q,e],cam.rotation[1]);
        q=v;
        e=d;
      
      
        vertexList.push([q,w,e]);
      
       f=200/(e/3);
       q=q*f;
       w=w*f;
       
       screen_coords.push([q+dx,w+dy]);
  
    }


    facesList=[];
    facColor=[];
    depth=[];
    var onscreen;
    mindist=[];
   var counter=0;


    for (face of cubeFace) {

      onscreen=false;
      for ( vertex of face)
      {
          x,y=screen_coords[i];
          if(vertexList[vertex][2]>0 )
          {
            onscreen=true;
          }
          else{
            onscreen=false;
            break;
          }
      }

      // var min=500000;
      // for ( vertex of face)
      // {
      //   var [x1,y1,z1]=vertex;

      //   xp=Math.pow((x2 - x1),2);
      //   yp=Math.pow((y2 - y1),2);
      //   zp=Math.pow((z2 - z1),2);
      //   d = Math.pow((xp+yp+zp),1/2);
        
      //   if(min<d)
      //   {
      //     min=d;
      //   }
      // }

      // mindist.push(min);

      if(onscreen)
      {
        var coords=[];
        for(var i of face)
        {
          coords.push(screen_coords[i]);
        }
        
        facesList.push(coords);
        facColor.push(faceColor[counter]);
        counter++;

        var total=0;
        for(var i=0;i<3;i++)
        {
          var sum=0;
          for(j of face)
          {
            sum+=vertexList[j][i]/4;
           // console.log(j,vertexList[j][i]);
          }
          
         sum=sum*sum;
          total+=sum;
         
        }
       // total=total*total;
        depth.push(total);
      }

      
    } 

    //sorting
    //console.log(mindist);
    temp=Object.assign([],depth);
  
    depth.sort();
    console.log(depth);

    var index=[];
    for(var i=0;i<depth.length;i++)
    {

      test=temp.indexOf(depth[i]);
      temp[test]=-100;
      index.push(test);
    }


 

    //sorting 2

    


    for (var j=index.length-1;j>=0;j--) {

    var face = facesList[index[j]];  //remember to use index
    ctx.beginPath();
    
    ctx.moveTo(face[0][0], face[0][1]);


    // Draw the other vertices
    for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
      ctx.lineTo(face[k][0], face[k][1]);

    }

    // Close the path and draw the face
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = faceColor[index[j]];
    ctx.fill(); 
  }

 requestAnimationFrame(draw);
}


function drawEdges()
{
  for(edge of cubeEdges)
  {
    
      var [x,y,z]=cube[edge[0]];
       
      x-=cam.positon[0];
      y-=cam.positon[1];
      z-=cam.positon[2];

      [a,b]=rotate2D([x,z],cam.rotation[1]);
      x=a;
      z=b;
     
      // [c,d]=rotate2D([y,z],cam.rotation[0]);
      // y=c;
      // z=d;

       f=200/(z/3);
       x=x*f;
       y=y*f;
   
       ctx.beginPath();
       ctx.moveTo(x + dx, y + dy);


       var [x,y,z]=cube[edge[1]];

       x-=cam.positon[0];
       y-=cam.positon[1];
       z-=cam.positon[2];

       [a,b]=rotate2D([x,z],cam.rotation[1]);
       x=a;
       z=b;

      //  [c,d]=rotate2D([y,z],cam.rotation[0]);
      //  y=c;
      //  z=d;
 
   
      f=200/(z/3);
      x=x*f;
      y=y*f;

      ctx.lineTo(x + dx, y + dy);
      ctx.closePath();
      ctx.stroke();
     
    }
}


function init()
{ 
   cam=new camera();
  cam.init([0,0,-20]);
  draw()
}

function move(event) { cam.update(event.code); }

function mouse(event) { cam.rotate(event); }

function mousedown(event) { 
  cam.mousedown=true; 
  oldmousex=event.clientX;
  oldmousey=event.clientY;
}

function mouseup() { cam.mousedown=false; }

init();
document.addEventListener("keydown",move);
document.addEventListener("mousedown",mousedown);
document.addEventListener("mousemove",mouse);
document.addEventListener("mouseup",mouseup);

