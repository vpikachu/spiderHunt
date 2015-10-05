/**
 * Created by pikachu on 09.09.2015.
 */
var GameBoard = new PIXI.Container();
GameBoard.init1 = function(){

    var bg = new PIXI.Sprite(Game.resources.gameboard.texture);
    var sf = Game.screen.width/Game.resources.gameboard.texture.width;
    bg.scale.set(sf,sf);
    bg.anchor.set(0,1);
    bg.position.set(0,Game.screen.height);

    GameBoard.addChild(bg);

    GameBoard.state = new PIXI.Text("text",{
            font: '18px HennyPenny',
            fill: '#FFFFFF'
        }
    );
    GameBoard.state.anchor.set(0,1);
    bg = new PIXI.Sprite(Game.resources.spyder1.texture);
    bg.anchor.set(0,1);

    bg.position.set(5,Game.screen.height-7);

    GameBoard.addChild(bg);
    GameBoard.state.position.set(bg.position.x + bg.width + 4,Game.screen.height-5);
    GameBoard.addChild(GameBoard.state);
    PlayGround.addChild(GameBoard);
};

GameBoard.updateState = function(){
  GameBoard.state.text = "x "+Game.lives+"  level: "+Game.level+ "   score: "+ Game.score;
};