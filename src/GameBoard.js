/**
 * Created by pikachu on 09.09.2015.
 */
var GameBoard = new PIXI.Container();
GameBoard.init1 = function(){

    var bg = new PIXI.Sprite(Game.assets.gameboard.texture);
    bg.anchor.set(0,1);
    bg.position.set(0,Game.designResolution.height);

    GameBoard.addChild(bg);


    var back  = new PIXI.Sprite( Game.assets.backbutton.texture);
    back.anchor.set(0,1);
    back.position.set(9,Game.designResolution.height-10);
    back.buttonMode = true;
    back.interactive = true;
    back.tap = GameBoard.showMenu;
    back.click = GameBoard.showMenu;
    GameBoard.addChild(back);


    var spider = new PIXI.Sprite(Game.assets.spyder1.texture);
    spider.position.set(60,Game.designResolution.height-10);
    spider.anchor.set(0,1);
    GameBoard.addChild(spider);

    GameBoard.state = new PIXI.Text("text",{
            font: '20px HennyPenny',
            fill: '#FFFFFF'
            /*wrap:true,
             wrapWidth:600,
             lineHeight:25*/
        }
    );
    GameBoard.state.anchor.set(0,1);
    GameBoard.state.position.set(spider.position.x+spider.width+3,spider.position.y);
    GameBoard.addChild(GameBoard.state);
    PlayGround.addChild(GameBoard);


    /***create game process  menu************/

    this.menu = new PIXI.Container();
    var resume = new MsgBox();
    resume.text.text = "Resume";
    resume.y -= resume.children[0].height/2;
    resume.children[0].click = GameBoard.hideMenu
    resume.children[0].tap = GameBoard.hideMenu;
    resume.children[1].style.font = "35px HennyPenny";

    this.menu.addChild(resume);


    var  mainmenu = new MsgBox();
    mainmenu.text.text = "Main Menu";
    mainmenu.y += mainmenu.children[0].height/2;
    mainmenu.children[0].scale.x = -1;
    mainmenu.children[0].click = GameBoard.goMainMenu;
    mainmenu.children[0].tap = GameBoard.goMainMenu;
    mainmenu.children[1].style.font = "35px HennyPenny";
    this.menu.addChild(mainmenu);

};
GameBoard.hideMenu = function (){
    PlayGround.isMessageShowing = false;
    Game.stage.removeChild(GameBoard.menu);
};
GameBoard.goMainMenu = function () {
    GameBoard.hideMenu();
    Game.showStartMenu();
};
GameBoard.showMenu = function () {
    PlayGround.isMessageShowing = true;
    Game.stage.addChild(GameBoard.menu);
};
GameBoard.updateState = function(){
  GameBoard.state.text = " x "+Game.lives;
    if(Math.isNumeric(Game.level)) GameBoard.state.text += "   level: "+Game.level;
    else
        GameBoard.state.text += "   level: "+Game.level.name;
    GameBoard.state.text += "   score: "+ Game.score;
};