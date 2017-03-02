function Astar(destX, destY) {
  var openList = [];
  var closedList = [];

}

function getTile() {
    var x = (Math.floor(character.x / 32));
    var y = (Math.floor(character.y / 32));
    console.log("character at: " + x + " " + y);
    var leftTile = map.getTileLeft(1, x, y);
    console.log("left" + leftTile.x + " " + leftTile.y);
    var rightTile = map.getTileRight(1, x, y);
    console.log("right" + rightTile.x + " " + rightTile.y);
    var aboveTile = map.getTileAbove(1, x, y);
    console.log("above" + aboveTile.x + " " + aboveTile.y);
    var belowTile = map.getTileBelow(1, x, y);
    console.log("below" + belowTile.x + " " + belowTile.y);
}

function moveTo(sprite, destX, destY){
  var move = game.add.tween(sprite)
  move.to({x: destX * 32, y: destY * 32}, characterSpeed);
  move.onComplete.add(function() {
    sprite.animations.play('idle');
  }, this)
  if(destX > Math.floor(sprite.x / 32)){
    sprite.animations.play('right');
  } else if (destX < Math.floor(sprite.x / 32)){
    sprite.animations.play('left');
  }
  if(destY > Math.floor(sprite.y / 32)){
    sprite.animations.play('down');
  } else if (destY < Math.floor(sprite.y / 32)){
    sprite.animations.play('up');
  }
  move.start();
}

//gets lowest F score adjacent to tile
function getNextTile(tile) {

}

//calculates F score of tile
function calculateFScore(tileX, tileY, destX, destY) {
    var g = 0;
    var h = 0;
    var f = 0;
    g += Math.abs(tileX - Math.floor(character.x / 32));
    g += Math.abs(tileY - Math.floor(character.y / 32));
    h += Math.abs(tileX - destX);
    h += Math.abs(tileY - destY);
    f = Math.abs(g + h);

    console.log("g: " + g);
    console.log("h: " + h);
    console.log("f: " + f);
}
