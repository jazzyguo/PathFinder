function preload() {
    game.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('grass', 'assets/tilemaps/grass-tiles-2-small.png');
    game.load.image('shrooms', 'assets/tilemaps/littleshrooms_0.png');
    game.load.image('bush', 'assets/tilemaps/qubodup-bush_0.png');
    game.load.image('bush1', 'assets/tilemaps/qubodup-bush_berries_0.png');
    game.load.image('tree', 'assets/tilemaps/tree2-final.png');
    game.load.spritesheet('character', 'assets/character.png', 16, 32);
}

var map;
var layer1;
var layer2;
var layer3;
var character;
var cursors;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    map = game.add.tilemap('map');
    map.addTilesetImage('grass-tiles-2-small', 'grass');
    map.addTilesetImage('littleshrooms_0', 'shrooms');
    map.addTilesetImage('qubodup-bush_0', 'bush');
    map.addTilesetImage('qubodup-bush_berries_0', 'bush1');
    map.addTilesetImage('tree2-final', 'tree');
    map.setCollisionBetween(1, 30);

    layer1 = map.createLayer('Ground');
    layer2 = map.createLayer('Collision');
    layer3 = map.createLayer('Foreground');
    layer1.resizeWorld();
    layer2.resizeWorld();
    layer3.resizeWorld();

    character = game.add.sprite(96, 96, 'character');
    game.physics.arcade.enable(character);
    character.scale.setTo(1.5, 1.5);
    character.anchor.setTo(.5, .5);
    character.animations.add('idle', [9, 10, 11, 12], 10, true);
    character.animations.add('up', [34, 35, 36, 37], 10, true);
    character.animations.add('down', [0, 1, 2, 3], 10, true);
    character.animations.add('left', [51, 52, 53, 54], 10, true);
    character.animations.add('right', [17, 18, 19, 20], 10, true);
    game.camera.follow(character);


    character.body.collideWorldBounds = true;


    cursors = game.input.keyboard.createCursorKeys();


}

function update() {
  game.physics.arcade.collide(character, layer2);
  layer3.bringToTop();


    character.body.velocity.x = 0;
    character.body.velocity.y = 0;
    if (cursors.left.isDown) {
        character.body.velocity.x = -300;
        character.animations.play('left');
    } else if (cursors.right.isDown) {
        character.body.velocity.x = 300;
        character.animations.play('right');
    } else if (cursors.down.isDown) {
        character.body.velocity.y = 300;
        character.animations.play('down');

    } else if (cursors.up.isDown) {
        character.body.velocity.y = -300;
        character.animations.play('up');
    } else {
        character.animations.play('idle');
    }



}
