/**
 * Created by pikachu on 28.09.2015.
 */
var PlayGround = new PIXI.Container();
PlayGround.balls = [];
PlayGround.bonuses = [];
PlayGround.trash = [];
PlayGround.isMessageShowing = false;


PlayGround.init1 = function(){
    //

    var web = new PIXI.Sprite(Game.assets.web.texture);
    //web.width = Game.screen.width;
    //web.height = Game.gameArea.height +30;
    PlayGround.addChild(web);

    var background = new PIXI.Sprite(Game.assets.background.texture);
    //background.width = web.width;
    //background.height = web.height;
    PlayGround.addChild(background);

    PlayGround.addChild(GamePoligon.graphics);
    PlayGround.addChild(GamePoligon.mask);

    background.mask = GamePoligon.mask;

    CutArria.init1();
    Player.init1();

    GameBoard.init1();

};

PlayGround.doFlow = function(){
    if(PlayGround.isMessageShowing) return;
    Player.doMove();
    for(var i=0; i< PlayGround.balls.length; i++)
    {
        PlayGround.balls[i].doMove();
    }
};
PlayGround.nextLevel = function(){
    if(Math.isNumeric(Game.level)) PlayGround.createLevel(Game.level+1);
    else
    //do tutorial scene
    {
        var index = PlayGround.rules.indexOf(Game.level);
        if(index==-1 || index+1>=PlayGround.rules.length) Game.showStartMenu();
        else PlayGround.createLevel(PlayGround.rules[index+1]);
    }
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

    /*if(Game.level == 1) */Player.STEP = 2;




    for (var i = 0; i < PlayGround.balls.length; i++) {
        PlayGround.balls[i].destroy();
    }
    Array.clear(PlayGround.balls);

    for (i = 0; i < PlayGround.bonuses.length; i++) {
        PlayGround.bonuses[i].destroy();
    }
    Array.clear(PlayGround.bonuses);

    for (i = 0; i < PlayGround.trash.length; i++) {
        PlayGround.trash[i].destroy();
    }
    Array.clear(PlayGround.trash);

    if(Math.isNumeric(Game.level)) {
        // add BonusFaster
        if (Player.STEP <= 2 && Math.random() < 0.5) {
            PlayGround.bonuses.push(new BonusFaster());
        }

        // add BonusGold
        for (i = 0; i < 3; i++) {
            if (Math.random() > 0.5) {
                PlayGround.bonuses.push(new BonusGold());
            }
        }
        //add enemyes
        for (i = 1; i <= Game.level + 1; i++) {
            PlayGround.balls.push(new Ball());
        }
    }
    else {
        Game.level.init();
    }
    GameBoard.updateState();
    InputTracking.stop();

};
PlayGround.rules = [
    {
        name:"rule 1",
        postMessage:"Next training!",
        init: function(){
            var isTouchDevice = 'ontouchstart' in document.documentElement;
            var Text = new PIXI.Text("Use " + (isTouchDevice?"touch swipes":"arrow keys or mouse swipes")+"  to move spider and surround bug by web",
                {
                    font : '30px HennyPenny',
                    fill : '#000000',
                    align:"center",
                    wordWrap:true,
                    wordWrapWidth:Game.gameArea.width*3/4
                }
            );

            Text.destroy = function(){
                if( PIXI.Text.prototype.destroy != undefined  && PIXI.Text.prototype.destroy != null)
                    PIXI.Text.prototype.destroy.apply(this,arguments);
                PlayGround.removeChild(this);
            };
            Text.position.set(Game.gameArea.width/2, Game.gameArea.height/2);
            Text.anchor.set(0.5,0.5);
            PlayGround.trash.push(Text);
            PlayGround.addChild(Text);


            var ball = new Ball();
            ball.doMove = function(){this.updateGraphicsPos();};
            ball.position.x = 100;
            ball.position.y = 100;
            PlayGround.balls.push(ball);

            ball = new Ball();
            ball.graphics.position.set(Game.gameArea.width-100,Game.gameArea.height-100);
            PlayGround.balls.push(ball);


        },
    },
    {
        name:"rule 2",
        postMessage:"You have completed training.",
        init: function(){
            var Text = new PIXI.Text("Collect bonuses: \nElixir makes spider faster,\n Coins up your score",
                {
                    font : '30px HennyPenny',
                    fill : '#000000',
                    align:"center",
                    wordWrap:true,
                    wordWrapWidth:Game.gameArea.width*3/4
                }
            );

            Text.destroy = function(){
                if( PIXI.Text.prototype.destroy != undefined  && PIXI.Text.prototype.destroy != null)
                    PIXI.Text.prototype.destroy.apply(this,arguments);
                PlayGround.removeChild(this);
            };
            Text.position.set(Game.gameArea.width/2, Game.gameArea.height/2);
            Text.anchor.set(0.5,0.5);
            PlayGround.trash.push(Text);
            PlayGround.addChild(Text);



            PlayGround.balls.push(new Ball());


            PlayGround.balls.push(new Ball());

            var bonuse = new BonusFaster();
            bonuse.graphics.position.set(100,100);
            PlayGround.bonuses.push(bonuse);

            bonuse = new BonusGold();
            bonuse.graphics.position.set(Game.gameArea.width - 100,100);
            PlayGround.bonuses.push(bonuse);


        },
    }
];
