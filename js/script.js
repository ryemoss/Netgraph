var i=0;
var numps = 50;
var parls = [];
var maxd = 200;
var xamp = 200;
var yamp = 200;

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

document.getElementById("myCanvas").width = window.innerWidth * .98;
document.getElementById("myCanvas").height = window.innerHeight * .98;

function startMove(){
  for (i=0; i<numps; i++) {
    parls.push(new Particle());
  }
  var interval = window.setInterval(function(){mover();}, 15);
}

function mover(){
  i++;
  ctx.clearRect(0,0, c.width, c.height);

  for (p=0; p+1 <numps; p++)
  {
    parls[p].xp = parls[p].origx + Math.sin(i*parls[p].xt+parls[p].origx)*xamp;
    parls[p].yp = parls[p].origy + Math.sin(i*parls[p].yt+parls[p].origy)*yamp;
    for (y=0; y+1 < numps; y++)
    {
      if (distance(parls[p], parls[y]) < maxd)
        connect(parls[p], parls[y], distance(parls[p], parls[y]));
    }
  }
}

function connect(p1, p2, d)
{
  ctx.beginPath();
  ctx.moveTo(p1.xp, p1.yp);
  ctx.lineTo(p2.xp, p2.yp);
  ctx.globalAlpha = (maxd-d)/(maxd*1.1);
  ctx.stroke();
}

function distance(v1, v2)
{
  var dist = (v1.xp-v2.xp)*(v1.xp-v2.xp) + (v1.yp-v2.yp)*(v1.yp-v2.yp);
  return Math.sqrt(dist);
}

function Particle()
{
  this.xp = 0;
  this.yp = 0;
  this.origx= Math.random()*100 + window.innerWidth/2.3;
  this.origy= Math.random()*100 + window.innerHeight/2.3;
  this.xt = Math.random()/300;
  this.yt = Math.random()/300;
}

startMove();
