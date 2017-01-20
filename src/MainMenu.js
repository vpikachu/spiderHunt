/**
 * Created by pikachu on 28.09.2015.
 */
var MainMenu = new PIXI.Container();
MainMenu.btnPlay = null;
MainMenu.btnRules = null;
MainMenu.init1 = function(){
    var sprite = new PIXI.Sprite(Game.assets.logo.texture);
    MainMenu.addChild(sprite);


//spider
    sprite = new PIXI.extras.MovieClip([Game.assets.hunter1.texture,
        Game.assets.hunter2.texture,
        Game.assets.hunter3.texture,
        Game.assets.hunter4.texture,
        Game.assets.hunter5.texture,
        Game.assets.hunter6.texture]);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.animationSpeed = 0.5;
    sprite.position.set(220,140);
    sprite.play();
    MainMenu.addChild(sprite);
//bug
    MainMenu.bug = new Ball();
    PlayGround.removeChild(MainMenu.bug.graphics);
    MainMenu.addChild(MainMenu.bug.graphics);

    MainMenu.bug.iter = 0;


    MainMenu.bug.position.x = Game.designResolution.width/2;
    MainMenu.bug.position.y = 300;

	
	
    MainMenu.btnPlay = new MsgBox();
    MainMenu.btnPlay.text.text = "Play";
    //MainMenu.btnPlay.y += MainMenu.btnPlay.children[0].height/2;
    MainMenu.btnPlay.children[0].click = MainMenu.onStart
    MainMenu.btnPlay.children[0].tap = MainMenu.onStart;
    MainMenu.btnPlay.children[1].style.font = "35px HennyPenny";

    MainMenu.addChild(MainMenu.btnPlay);


	
	
	
	MainMenu.btnRules = new MsgBox();
    MainMenu.btnRules.text.text = "Tutorial";
    MainMenu.btnRules.y += MainMenu.btnRules.children[0].height;
    MainMenu.btnRules.children[0].click = MainMenu.onRules
    MainMenu.btnRules.children[0].tap = MainMenu.onRules;
    MainMenu.btnRules.children[1].style.font = "35px HennyPenny";

    MainMenu.addChild(MainMenu.btnRules);
    
    MainMenu.bestScore =   new PIXI.Text("Best score: ",{
        font : '30px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#363636',
        strokeThickness : 8,
        padding:20
    });

    MainMenu.bestScore.anchor.set(0.5,0.5);
    MainMenu.bestScore.position.set(Game.designResolution.width/2,MainMenu.btnRules.y + MainMenu.btnRules.height);
    MainMenu.addChild(MainMenu.bestScore);


};
MainMenu.doFlow = function(){
    if(MainMenu.bug.iter> PIXI.PI_2)MainMenu.bug.iter -=PIXI.PI_2;
    MainMenu.bug.position.y += Math.cos(2*MainMenu.bug.iter) * 5;
    MainMenu.bug.position.x += Math.sin(MainMenu.bug.iter) * 10;
    MainMenu.bug.updateGraphicsPos();


    /*if(MainMenu.bug.iter + MainMenu.bug.delta < 0)
        MainMenu.bug.delta = 0.1;
    if(MainMenu.bug.iter + MainMenu.bug.delta > 4*Math.PI)
        MainMenu.bug.delta = -0.1;
        */

    MainMenu.bug.iter +=0.1;
};
MainMenu.onStart = function(){
    //InputTracking.setup();
    if(actx != undefined) {
        sounds["sound/click.mp3"].play();
    }
    Game.lives = 3;
    Game.score = 0;


    Game.stage = PlayGround;
    PlayGround.createLevel(1);
};
MainMenu.onRules = function(){
    if(actx != undefined) {
        sounds["sound/click.mp3"].play();
    }
    //InputTracking.setup();
    Game.lives = 100;
    Game.score = 0;


    Game.stage = PlayGround;
    PlayGround.createLevel(PlayGround.rules[0]);
};
