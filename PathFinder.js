function preload() {
    game.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('grass', 'assets/tilemaps/grass-tiles-2-small.png');
    game.load.image('shrooms', 'assets/tilemaps/littleshrooms_0.png');
    game.load.image('bush', 'assets/tilemaps/qubodup-bush_0.png');
    game.load.image('bush1', 'assets/tilemaps/qubodup-bush_berries_0.png');
    game.load.image('tree', 'assets/tilemaps/tree2-final.png');
    game.load.image('Overworld', 'assets/tilemaps/Overworld.png');
    game.load.spritesheet('character', 'assets/character.png', 16, 32);
}

var map;
var layer1;
var layer2;
var layer3;

var character;
var characterSpeed = 300;

var cursors;
var mKey, nKey,
    lKey;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    map = game.add.tilemap('map');
    map.addTilesetImage('grass-tiles-2-small', 'grass');
    map.addTilesetImage('littleshrooms_0', 'shrooms');
    map.addTilesetImage('qubodup-bush_0', 'bush');
    map.addTilesetImage('qubodup-bush_berries_0', 'bush1');
    map.addTilesetImage('tree2-final', 'tree');
    map.addTilesetImage('Overworld', 'Overworld');
    map.setCollisionBetween(1, 30);

    layer1 = map.createLayer('Ground');
    layer2 = map.createLayer('Collision');
    layer3 = map.createLayer('Foreground');
    layer1.resizeWorld();
    layer2.resizeWorld();
    layer3.resizeWorld();

    character = game.add.sprite(96, 96, 'character');
    game.physics.arcade.enable(character);
    character.body.collideWorldBounds = true;
    character.scale.setTo(1.5, 1.5);
    character.anchor.setTo(.5, .75);
    character.body.setSize(16, 16, 0, 16);

    character.animations.add('idle', [9, 10, 11, 12], 10, true);
    character.animations.add('up', [34, 35, 36, 37], 10, true);
    character.animations.add('down', [0, 1, 2, 3], 10, true);
    character.animations.add('left', [51, 52, 53, 54], 10, true);
    character.animations.add('right', [17, 18, 19, 20], 10, true);
    game.camera.follow(character);

    cursors = game.input.keyboard.createCursorKeys();
    mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    nKey = game.input.keyboard.addKey(Phaser.Keyboard.N);
    lKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
    game.input.onDown.add(function(pointer, event) {
        var tileworldX = pointer.worldX - (pointer.worldX % 32);
        var tileworldY = pointer.worldY - (pointer.worldY % 32);
        var tileX = Math.floor(pointer.worldX / 32);
        var tileY = Math.floor(pointer.worldY / 32);
        console.log("character: " + Math.floor(character.x / 32) + "," + Math.floor(character.y / 32));
        console.log("tile: " + tileX + "," + tileY);
        calculateFScore(tileX, tileY, tileX, tileY);
        moveTo(character, tileX, tileY);
    });
}

function update() {
    game.physics.arcade.collide(character, layer2);
    layer3.bringToTop();
    character.body.velocity.x = 0;
    character.body.velocity.y = 0;
    if (mKey.isDown) {
        if (characterSpeed > 50) {
            characterSpeed -= 10;
        }
    } else if (nKey.isDown) {
        if (characterSpeed < 500) {
            characterSpeed += 10;
        }
    }
}
