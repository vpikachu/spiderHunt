/**
 * Created by pikachu on 01.09.2015.
 */
var Player = {
    graphics: new PIXI.Container(),
    isCutting: false,
    direction: {x:0,y:0},//vertor direction of player moving.
    STEP: 2,//velocity of player.
    COLLISION_PATH : 3,
    Radius:10,
    playMovie:function () {

        if(this.direction.x==-1)
            this.graphics.emitter.maxStartRotation = 0;
        else if(this.direction.x==1)
            this.graphics.emitter.maxStartRotation = 180;
        else if(this.direction.y==1)
            this.graphics.emitter.maxStartRotation = 270;
        else if(this.direction.y==-1)
            this.graphics.emitter.maxStartRotation = 90;

        this.graphics.emitter.minStartRotation = this.graphics.emitter.maxStartRotation;



        if(!this.isPlaying()) {
            this.graphics.movieClip.play();
            this.graphics.emitter.emit =  this.STEP != 2;
        }


    },
    stopMovie: function() {
        if(this.isPlaying()) {
            this.graphics.movieClip.stop();
            this.graphics.emitter.emit = false;
        }
    },
    isPlaying:function(){
        return this.graphics.movieClip.playing;
    },
    init1:function(){
        /*
        create particle of spyder rush
         */

        var pc = /*new PIXI.Container();*/new PIXI.ParticleContainer(2000, {
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true

        });

        this.graphics.emitter = new cloudkid.Emitter(

            // The DisplayObjectContainer to put the emitter in
            // if using blend modes, it's important to put this
            // on top of a bitmap, and not use the PIXI.Stage
            pc,

            // The collection of particle images to use
            [Game.resources.particle.texture],
            {
                    "alpha": {
                    "start": 0.5,
                        "end": 0
                },
                    "scale": {
                    "start": 0.2,
                        "end": 0.1,
                        "minimumScaleMultiplier": 1
                },
                    "color": {
                    "start": "#25becc"/*"#000000"*/,
                        "end": "#25becc"/*"#999999"*/
                },
                    "speed": {
                    "start": 80,
                        "end": 80
                },
                    "acceleration": {
                    "x": 0,
                        "y": 0
                },
                    "startRotation": {
                    "min": 270,
                        "max": 270
                },
                    "rotationSpeed": {
                    "min": 0,
                        "max": 0
                },
                    "lifetime": {
                    "min": 0.15,
                        "max": 0.15
                },
                    "blendMode": "normal",
                    "frequency": 0.001,
                    "emitterLifetime": -1,
                    "maxParticles": 1000,
                    "pos": {
                    "x": 0,
                        "y": 0
                },
                    "addAtBack": false,
                    "spawnType": "circle",
                    "spawnCircle": {
                    "x": 0,
                        "y": 0,
                        "r": 10
                }
            }
        );
        PlayGround.addChild(pc);
        this.graphics.emitter.emit = false;
        /*
        create movie clip with spyder
         */
        var frames = [Game.resources.spyder1.texture,
            Game.resources.spyder2.texture,
            Game.resources.spyder3.texture,
            Game.resources.spyder4.texture,
            Game.resources.spyder5.texture,
            Game.resources.spyder6.texture,
            Game.resources.spyder7.texture,
            Game.resources.spyder8.texture
            ];
        this.graphics.movieClip = new PIXI.extras.MovieClip(frames);
        this.graphics.movieClip.anchor.x = 0.5;
        this.graphics.movieClip.anchor.y = 0.5;
        this.graphics.movieClip.animationSpeed = 0.5;
        this.graphics.addChild(this.graphics.movieClip);
        PlayGround.addChild(this.graphics);
    },
    applyStartProperties: function() {
        this.direction = {x:0,y:0};
        this.isCutting = false;
        Player.position(14,18);
        this.stopMovie();
        InputTracking.stop();
    },
    position: function(x,y){
        this.graphics.position.x = x;
        this.graphics.position.y = y;
        this.graphics.emitter.updateOwnerPos(x,y);
    },
    isMoveBackOnCutting: function(){
        if(this.isCutting){
            if(this.direction.x + Math.sign(this.graphics.x - CutArria.points.last().x)==0 &&
                this.direction.y + Math.sign(this.graphics.y - CutArria.points.last().y)==0)
                return true;
        }
        return false;

    },
    doMove:function(){
        if(Game.checkIsWIN())
        {
            this.stopMovie();
            var msg = new MsgBox();
            msg.showMsg("You win! Next Level!",PlayGround.nextLevel);
            Game.score +=100;
            return;
        }
        this.graphics.emitter.update((Game.now - Game.elapsed) * 0.001);


        if((InputTracking.direction.y == -1 && this.graphics.y > 0) || /*"ArrowUp"*/

        (InputTracking.direction.x == 1 && this.graphics.x <Game.gameArea.width/*"ArrowRight"*/) ||

        (InputTracking.direction.y == 1 && this.graphics.y <Game.gameArea.height/*"ArrowDown"*/) ||

        (InputTracking.direction.x == -1 && this.graphics.x > 0/*"ArrowLeft"*/))
        {
            Player.direction.x = InputTracking.direction.x;
            Player.direction.y = InputTracking.direction.y;
        }
        else
        if(InputTracking.pressedKey ==38 && this.graphics.position.y !=0 /*"ArrowUp"*/)
        {this.direction.x = 0; this.direction.y = -1;}
        else if(InputTracking.pressedKey == 39 && this.graphics.position.x !=Game.gameArea.width/*"ArrowRight"*/)
        {this.direction.x = 1; this.direction.y =0;}
        else if(InputTracking.pressedKey ==40 && this.graphics.position.y !=Game.gameArea.height/*"ArrowDown"*/)
        {this.direction.x = 0; this.direction.y =1;}
        else if(InputTracking.pressedKey == 37 && this.graphics.position.x !=0/*"ArrowLeft"*/)
        {this.direction.x = -1; this.direction.y =0;}
        else{
            this.direction.x = 0; this.direction.y =0;
            this.stopMovie();
            return;
        }




        //do not allow to move back when cuttiong
        if(this.isMoveBackOnCutting()) {this.stopMovie(); return;}

        //process starting/ending cutting of new area
        var point = {x:this.graphics.x + this.direction.x*this.STEP,y:this.graphics.y+this.direction.y*this.STEP};
        var isInPoligon = Math.isInPolygon(point, GamePoligon.points);
        var crossPoint=null;
        if(!this.isCutting && isInPoligon){
            crossPoint = this.checkCollisions();
            if(crossPoint != null)
            {
                CutArria.startNewCutArria(crossPoint);
                this.isCutting = true;
            }
        } else
        if(this.isCutting) {
            //add cutArria point when changed direction
            if(((CutArria.points.last().x == this.graphics.x  && this.direction.x !=0) ||
                (CutArria.points.last().y == this.graphics.y  && this.direction.y !=0)))
            {
                CutArria.points.push({x: this.graphics.x, y: this.graphics.y});
            }

            if (!isInPoligon) {
                crossPoint = this.checkCollisions();
                if (crossPoint != null) {
                    CutArria.points.push({x: crossPoint.x, y: crossPoint.y});
                    CutArria.endEdgeId = crossPoint.edgeId;
                    GamePoligon.addCutArria();
                    this.isCutting = false;
                    InputTracking.stop();
                    this.stopMovie();
                }
            }
            else
            {
                if(this.checkPathCrossing() == this.COLLISION_PATH)
                {
                    Game.lives--;
                    Game.pressedKey = -1;
                    if(Game.lives < 1) {
                        Game.setBestScore();
                        this.stopMovie();
                        var msg = new MsgBox();
                        msg.showMsg("GameOver",  Game.showStartMenu);
                    }
                    else  {
                        GameBoard.updateState();
                        Player.isCutting=false;
                        Player.STEP = 2;
                        Player.position(CutArria.points[0].x, CutArria.points[0].y);
                        CutArria.graphics.clear();
                        Array.clear(CutArria.points);
                        InputTracking.stop();
                        this.stopMovie();
                    }

                    return;
                }
            }
        }

        this.playMovie();

        this.checkBonusCrossing();



        if(point.y < 0) point.y = 0;
        else if(point.y > Game.gameArea.height) point.y = Game.gameArea.height;

        if(point.x > Game.gameArea.width) point.x = Game.gameArea.width;
        else if(point.x < 0) point.x = 0;


        this.position(point.x,point.y);

        if(this.isCutting)
        {
            CutArria.drawPath();
        }
    },
    checkCollisions: function() {

        var nextpos = {x: this.graphics.position.x + this.direction.x*this.STEP,
            y: this.graphics.position.y + this.direction.y*this.STEP};

        var currpos = {x: this.graphics.position.x,
            y: this.graphics.position.y};

        var point1, point2;

        //collision with GamePoligon
        for(var i=0; i < GamePoligon.points.length; i++)
        {
            point1 = GamePoligon.points[i];
            point2 = GamePoligon.points[i+1==GamePoligon.points.length? 0: i+1];
            // point1.point2-vertical, direction - horizontal
            if(point1.x == point2.x && this.direction.x !=0)
            {
                if(((point1.x >= currpos.x && point1.x<= nextpos.x) ||
                    (point1.x >= nextpos.x && point1.x<= currpos.x)) &&
                    ((currpos.y >= point1.y && currpos.y<= point2.y) ||
                    (currpos.y >= point2.y && currpos.y<= point1.y))
                )
                {
                    //collision detect

                    return {x:point1.x,y:currpos.y,
                        edgeId:i};
                }
            }
            else// point1.point2-horizontal, direction - vertical
            if(point1.y == point2.y && this.direction.y !=0)
            {

                if(((point1.x <= currpos.x && point2.x>= currpos.x) ||
                    (point2.x <= currpos.x && point1.x>= currpos.x)) &&
                    ((currpos.y <= point1.y && nextpos.y >= point1.y) ||
                    (nextpos.y <= point1.y && currpos.y >= point1.y))
                )
                {
                    //collision detect
                    return {x:currpos.x,y: point1.y,
                        edgeId:i
                    };
                }
            }

        }
        return null;
    },
    checkBonusCrossing: function () {
        var nextpos = {x: this.graphics.position.x + this.direction.x*this.STEP,
            y: this.graphics.position.y + this.direction.y*this.STEP};

        var currpos = {x: this.graphics.position.x,
            y: this.graphics.position.y};
        //collisions with bonuses
        var rect1 = {point1:{x:0,y:0},point2:{x:0,y:0}};
        var rect2 = {point1:{x:0,y:0},point2:{x:0,y:0}};
        for(i=0;i < PlayGround.bonuses.length;i++)
        {
            //create rect of overlaing
            rect1.point1.x = PlayGround.bonuses[i].graphics.x - PlayGround.bonuses[i].Radius;
            rect1.point2.x = PlayGround.bonuses[i].graphics.x + PlayGround.bonuses[i].Radius;
            rect1.point1.y = PlayGround.bonuses[i].graphics.y - PlayGround.bonuses[i].Radius;
            rect1.point2.y = PlayGround.bonuses[i].graphics.y + PlayGround.bonuses[i].Radius;
            if(nextpos.x == currpos.x){
                rect2.point1.x = currpos.x - Player.Radius;
                rect2.point2.x = currpos.x + Player.Radius;
                if(nextpos.y>currpos.y)
                {
                    rect2.point1.y = currpos.y - Player.Radius;
                    rect2.point2.y = nextpos.y + Player.Radius;
                }
                else {
                    rect2.point1.y = nextpos.y - Player.Radius;
                    rect2.point2.y = currpos.y + Player.Radius;
                }
            }
            else{
                rect2.point1.y = currpos.y - Player.Radius;
                rect2.point2.y = currpos.y + Player.Radius;
                if(nextpos.x>currpos.x)
                {
                    rect2.point1.x = currpos.x - Player.Radius;
                    rect2.point2.x = nextpos.x + Player.Radius;
                }
                else {
                    rect2.point1.x = nextpos.x - Player.Radius;
                    rect2.point2.x = currpos.x + Player.Radius;
                }
            }
            //define if has overlaing
            if(
                ((rect1.point1.x>=rect2.point1.x && rect1.point1.x<=rect2.point2.x) ||
                (rect1.point2.x>=rect2.point1.x && rect1.point2.x<=rect2.point2.x) ||

                    (rect2.point1.x>=rect1.point1.x && rect2.point1.x<=rect1.point2.x) ||
                    (rect2.point2.x>=rect1.point1.x && rect2.point2.x<=rect1.point2.x))
                &&
                ((rect1.point1.y>=rect2.point1.y && rect1.point1.y<=rect2.point2.y) ||
                    (rect1.point2.y>=rect2.point1.y && rect1.point2.y<=rect2.point2.y) ||

                    (rect2.point1.y>=rect1.point1.y && rect2.point1.y<=rect1.point2.y) ||
                    (rect2.point2.y>=rect1.point1.y && rect2.point2.y<=rect1.point2.y))
            )
            {
                //!!!GOt Bonuses!!!
                PlayGround.bonuses[i].doBonus();
                PlayGround.bonuses[i].destroy();
                PlayGround.bonuses.splice(i,1);
            }

        }
    },
    checkPathCrossing: function(){
        var nextpos = {x: this.graphics.position.x + this.direction.x*this.STEP,
            y: this.graphics.position.y + this.direction.y*this.STEP};

        var currpos = {x: this.graphics.position.x,
            y: this.graphics.position.y};

        var point1, point2;

        //collision with path
        for(var i=0; i < CutArria.points.length-2; i++)
        {
            point1 = CutArria.points[i];
            point2 = CutArria.points[i+1];
            // point1.point2-vertical, direction - horizontal
            if(point1.x == point2.x && this.direction.x !=0)
            {
                if(((point1.x >= currpos.x && point1.x<= nextpos.x) ||
                    (point1.x >= nextpos.x && point1.x<= currpos.x)) &&
                    ((currpos.y >= point1.y && currpos.y<= point2.y) ||
                    (currpos.y >= point2.y && currpos.y<= point1.y))
                )
                {
                    //collision detect

                    return this.COLLISION_PATH;
                }
            }
            else// point1.point2-horizontal, direction - vertical
            if(point1.y == point2.y && this.direction.y !=0)
            {

                if(((point1.x <= currpos.x && point2.x>= currpos.x) ||
                    (point2.x <= currpos.x && point1.x>= currpos.x)) &&
                    ((currpos.y <= point1.y && nextpos.y >= point1.y) ||
                    (nextpos.y <= point1.y && currpos.y >= point1.y))
                )
                {
                    //collision detect
                    return this.COLLISION_PATH;
                }
            }

        }
    }
};