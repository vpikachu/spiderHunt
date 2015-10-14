/**
 * Created by pikachu on 28.09.2015.
 */
var MainMenu = new PIXI.Container();
MainMenu.btnPlay = null;
MainMenu.btnRules = null;
MainMenu.init1 = function(){


    MainMenu.btnPlay = new PIXI.Sprite( Game.assets.msgbox.texture);
    MainMenu.btnPlay.buttonMode = true;
    MainMenu.btnPlay.interactive = true;
    MainMenu.btnPlay.tap = MainMenu.onStart;
    MainMenu.btnPlay.click = MainMenu.onStart;
    MainMenu.btnPlay.anchor.set(0.5,0.5);
    MainMenu.btnPlay.position.set(Game.screen.width/2, Game.screen.height/2 - MainMenu.btnPlay.height/2);
    MainMenu.addChild(MainMenu.btnPlay);

    var sprite =   new PIXI.Text("Play",{
        font : '35px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#557100',
        strokeThickness : 4,
        padding:20
    });

    sprite.anchor.set(0.5,0.5);
    sprite.position.set(MainMenu.btnPlay.position.x, MainMenu.btnPlay.position.y);
    MainMenu.addChild(sprite);



    MainMenu.btnRules = new PIXI.Sprite( Game.assets.msgbox.texture);

    MainMenu.btnRules.interactive = true;
    MainMenu.btnRules.buttonMode = true;
    MainMenu.btnRules.tap = MainMenu.onRules;
    MainMenu.btnRules.click = MainMenu.onRules;
    MainMenu.btnRules.anchor.set(0.5,0.5);
    MainMenu.btnRules.position.set(Game.screen.width/2, Game.screen.height/2 + MainMenu.btnRules.height/2);
    MainMenu.btnRules.scale.x = -1;
    MainMenu.addChild(MainMenu.btnRules);

    sprite =   new PIXI.Text("Rules",{
        font : '35px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#557100',
        strokeThickness : 4,
        padding:20
    });

    sprite.anchor.set(0.5,0.5);
    sprite.position.set(MainMenu.btnRules.position.x, MainMenu.btnRules.position.y);
    MainMenu.addChild(sprite);
    MainMenu.bestScore =   new PIXI.Text("Best score: ",{
        font : '30px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#000000',
        strokeThickness : 4,
        padding:20
    });

    MainMenu.bestScore.anchor.set(0.5,0.5);
    MainMenu.bestScore.position.set(Game.screen.width/2,MainMenu.btnPlay.y - MainMenu.btnPlay.height);
    MainMenu.addChild(MainMenu.bestScore);


};
MainMenu.doFlow = function(){

};
MainMenu.onStart = function(){
    InputTracking.setup();
    Game.lives = 3;
    Game.score = 0;


    Game.stage = PlayGround;
    PlayGround.createLevel(1);
};
MainMenu.onRules = function(){

    InputTracking.setup();
    Game.lives = 100;
    Game.score = 0;


    Game.stage = PlayGround;
    PlayGround.createLevel(PlayGround.rules[0]);
};
