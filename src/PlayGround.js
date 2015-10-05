/**
 * Created by pikachu on 28.09.2015.
 */
var PlayGround = new PIXI.Container();
PlayGround.balls = [];
PlayGround.bonuses = [];
PlayGround.trash = [];



PlayGround.init1 = function(){
    //

    var web = new PIXI.Sprite(Game.resources.web.texture);
    web.width = Game.screen.width;
    web.height = Game.gameArea.height +30;
    PlayGround.addChild(web);

    var background = new PIXI.Sprite(Game.resources.background.texture);
    background.width = web.width;
    background.height = web.height;
    PlayGround.addChild(background);

    PlayGround.addChild(GamePoligon.graphics);
    PlayGround.addChild(GamePoligon.mask);

    background.mask = GamePoligon.mask;

    CutArria.init1();
    Player.init1();

    GameBoard.init1();

};

PlayGround.doFlow = function(){
    if(MsgBox.isShow) return;
    Player.doMove();
    for(var i=0; i< PlayGround.balls.length; i++)
    {
        PlayGround.balls[i].doMove();
    }
};
PlayGround.nextLevel = function(){
  PlayGround.createLevel(Game.level+1);
};
PlayGround.createLevel = function(level){
    Game.level = level;

    Array.clear(GamePoligon.points);

    GamePoligon.points[0] = {x:20,y:20};
    GamePoligon.points[1] = {x:Game.gameArea.width - 20,y:20};
    GamePoligon.points[2] = {x:Game.gameArea.width-20,y:Game.gameArea.height-20};
    GamePoligon.points[3] = {x:20,y:Game.gameArea.height-20};

    GamePoligon.drawPoligon();

    CutArria.graphics.clear();
    Array.clear(CutArria.points);

    Player.applyStartProperties();

    if(Game.level == 1) Player.STEP = 2;

    for(var i=0;i<PlayGround.balls.length;i++)
    {
        PlayGround.balls[i].destroy();
    }
    Array.clear(PlayGround.balls);

    for(i=0;i<PlayGround.bonuses.length;i++)
    {
        PlayGround.bonuses[i].destroy();
    }
    Array.clear(PlayGround.bonuses);

    for(i =1; i<= Game.level +1; i++)
    {
        PlayGround.balls.push(new Ball(5));
    }

    for(i=0;i<PlayGround.trash.length;i++)
    {
        PlayGround.trash[i].destroy();
    }
    Array.clear(PlayGround.trash);


    // add BonusFaster
    if(Player.STEP <= 2 && Math.random() <0.5){
        PlayGround.bonuses.push(new BonusFaster());
    }

    // add BonusGold
    for(i=0; i < 3; i++) {
        if (Math.random() > 0.5) {
            PlayGround.bonuses.push(new BonusGold());
        }
    }
    GameBoard.updateState();
    InputTracking.stop();

};
