/**
 * Created by pikachu on 09.09.2015.
 */
var GameBoard = new PIXI.Container();
GameBoard.init1 = function(){

    var bg = new PIXI.Sprite(Game.assets.gameboard.texture);
    var sf = Game.screen.width/Game.assets.gameboard.texture.width;
    bg.scale.set(sf,sf);
    bg.anchor.set(0,1);
    bg.position.set(0,Game.screen.height);

    GameBoard.addChild(bg);


    var back  = new PIXI.Sprite( Game.assets.backbutton.texture);
    back.anchor.set(0,1);
    back.scale.set(sf,sf);
    back.position.set(5,Game.screen.height-7);
    back.buttonMode = true;
    back.interactive = true;
    back.tap = GameBoard.showMenu;
    back.click = GameBoard.showMenu;
    GameBoard.addChild(back);

    GameBoard.state = new PIXI.Text("text",{
            font: '17px HennyPenny',
            fill: '#FFFFFF'
            /*wrap:true,
            wrapWidth:600,
            lineHeight:25*/
        }
    );
    GameBoard.state.anchor.set(0,1);
    var spider = new PIXI.Sprite(Game.assets.spyder1.texture);

    spider.position.set(15+back.position.x+back.width,Game.screen.height-10);
    spider.anchor.set(0,1);
    //spider.scale.set(sf,sf);

    GameBoard.addChild(spider);
    GameBoard.state.position.set(spider.position.x+spider.width+3,spider.position.y);
    GameBoard.state.scale.set(sf,sf);
    GameBoard.addChild(GameBoard.state);
    PlayGround.addChild(GameBoard);
};

GameBoard.updateState = function(){
  GameBoard.state.text = " x "+Game.lives;
    if(Math.isNumeric(Game.level)) GameBoard.state.text += "   level: "+Game.level;
    else
        GameBoard.state.text += "   level: "+Game.level.name;
    GameBoard.state.text += "   score: "+ Game.score;
};
GameBoard.showMenu = function () {
    if(PlayGround.isMessageShowing) return;

    var msgResume = new MsgBox();
    msgResume.position.y -= msgResume.height/2;
    var msgMainMenu = new MsgBox();
    msgMainMenu.position.y += msgMainMenu.height/2;
    msgMainMenu.getChildAt(0).scale.x = -msgMainMenu.getChildAt(0).scale.x
    msgMainMenu.separateBoxes.push(msgResume);
    msgResume.separateBoxes.push(msgMainMenu);

    msgMainMenu.showMsg("Menu",function(){Game.showStartMenu();});
    msgResume.showMsg("Resume",function(){});

};