/**
 * Created by pikachu on 01.09.2015.
 */
function Ball(Radius){
    this.Radius = Radius == undefined ? 10 : Radius;
    this.graphics= null;

    this.init();
    this.draw();
    PlayGround.addChild(this.graphics);
    this.updateGraphicsPos();
}

Ball.prototype.init = function (){
    this.position = {x: Math.customRandom(this.Radius+30, Game.gameArea.width - this.Radius-30),
        y: Math.customRandom(this.Radius+30, Game.gameArea.height - this.Radius-30)};

    this.COLLISION_GP = 1;
    this.COLLISION_PLAYER = 2;
    this.COLLISION_PATH=3;
    this.STEP = 3;
    this.randomizeDirection();
};

Ball.prototype.draw = function (){

    var types = ["fly","butterfly","godbug"];
    var type = Math.customRandom(0,2);


    var frames = [Game.assets[types[type]+"1"].texture,
        Game.assets[types[type]+"2"].texture,
        Game.assets[types[type]+"3"].texture,
        Game.assets[types[type]+"4"].texture];
    this.graphics = new PIXI.extras.MovieClip(frames);
    this.graphics.anchor.x = 0.5;
    this.graphics.anchor.y = 0.5;
    this.graphics.scale.x = Math.sign(this.direction.x);
    this.graphics.animationSpeed = 0.5;
    this.graphics.play();
};

Ball.prototype.destroy = function (){
    PlayGround.removeChild(this.graphics);
    this.graphics = this.direction = this.position = this.Radius = this.STEP = null;
};

Ball.prototype.randomizeDirection = function() {
    this.direction = {x: Math.customRandom(1,this.STEP-1)*(Math.random()>0.5?1:-1)};
    this.direction.y = Math.round(Math.sqrt(Math.pow(this.STEP,2) - Math.pow(this.direction.x,2)));

    /*if(this.direction.y <1) this.direction.y = 1;
    else if(this.direction.y == this.STEP) this.direction.y = this.STEP - 1;
*/
    this.direction.y *= (Math.random()>0.5?1:-1);

};
Ball.prototype.updateGraphicsPos = function () {
    this.graphics.x = Math.round(this.position.x);
    this.graphics.y = Math.round(this.position.y);
};
Ball.prototype.doMove = function() {
    var collision = this.processCollisions();
    if(collision == 0){//if no collisions ...
        this.position.x = this.position.x + this.direction.x;
        this.position.y = this.position.y + this.direction.y;
    }
    else if(collision == this.COLLISION_PATH ){//if collision with path
        //loos life

        Game.lives--;
        if(actx != undefined) {
            sounds["sound/lost_life.mp3"].play();
        }
        Game.pressedKey = -1;
        if(Game.lives < 1) {
            var msg = new MsgBox();
            msg.showMsg("Game Over",Game.showStartMenu);
            Game.setBestScore();
            return;
        }

        GameBoard.updateState();

        CutArria.graphics.clear();
        Player.STEP = 2;
        Player.isCutting=false;
        Player.position(CutArria.points[0].x, CutArria.points[0].y);
        InputTracking.stop();
        Array.clear(CutArria.points);

    }

    this.updateGraphicsPos();
};
Ball.prototype.processCollisions = function() {
    var nextpos = {x: this.position.x + this.direction.x,
        y: this.position.y + this.direction.y};

    var currpos = {x: this.position.x,
        y: this.position.y};
    var  point1,point2, A,B;
    //check collisions with Player

    //check collisions with CutArria
    if(Player.isCutting)
        for(var i=0; i < CutArria.points.length; i++)
        {
            point1 = CutArria.points[i];
            point2 = CutArria.points.length == i+1?Player.graphics:CutArria.points[i+1]
            //check intersect by XO vector
            if(point1.x == point2.x)
            {
                //AB - line that is parallel to path on distanse of radius of the ball and minth a border that not allowed to cross
                A = {x: point1.x-this.Radius, y: Math.min2(point1.y,point2.y)-this.Radius};
                B = {x: A.x, y: Math.max2(point1.y,point2.y)+this.Radius};

                if(Math.isLinesCrossing(A,B,currpos,nextpos))
                //collision detect
                    return this.COLLISION_PATH;

                A.x += 2*this.Radius;
                B.x = A.x;

                if(Math.isLinesCrossing(A,B,currpos,nextpos))
                //collision detect
                    return this.COLLISION_PATH;

            }
            else//check intersect by YO vector
            {

                //AB - line that is parallel to path on distanse of radius of the ball and minth a border that not allowed to cross
                A = {x: Math.min2(point1.x,point2.x)-this.Radius, y: point1.y - this.Radius};
                B = {x:Math.max2(point1.x,point2.x)+this.Radius, y:A.y};


                if(Math.isLinesCrossing(A,B,currpos,nextpos))
                //collision detect
                    return this.COLLISION_PATH;

                A.y += 2*this.Radius;
                B.y = A.y;

                if(Math.isLinesCrossing(A,B,currpos,nextpos))
                //collision detect
                    return this.COLLISION_PATH;
            }
        }

    //check collision  with GamePoligon
    var n,t1,t2;//normal to edge and points t1t2 of line that indicates the not allowed border to cross
    for(i=0; i < GamePoligon.points.length; i++)
    {
        point1 = GamePoligon.points[i];
        point2 = GamePoligon.points.length == i+1?GamePoligon.points[0]:GamePoligon.points[i+1];

        n = {x:Math.sign(point1.y-point2.y),y : Math.sign(point2.x-point1.x)};

        if(n.x == - Math.sign(this.direction.x) || n.y == - Math.sign(this.direction.y))
        {
            t1 = {x: point1.x + this.Radius*(n.x - n.y),
                y: point1.y + this.Radius*(n.y + n.x)};

            t2 = {x: point2.x + this.Radius*(n.x+ n.y),
                y: point2.y + this.Radius*(n.y- n.x)};

            if(Math.isLinesCrossing(currpos,nextpos,t1,t2))
            {
                if(n.x != 0) this.direction.x = this.direction.x*(-1);
                else this.direction.y = this.direction.y*(-1);

                this.graphics.scale.x = Math.sign(this.direction.x);
                //this.COLLISION_GP;
            }
        }
    }
    return 0;
};
/////////////////////////////////////////////////////////////////////////////
function BallFaster(){
    Ball.apply(this, arguments);
}
BallFaster.prototype = Object.create(Ball.prototype);
BallFaster.prototype.draw = function (){
    this.graphics = new PIXI.Container();
    var gr = new PIXI.Graphics();
    gr.lineStyle(1, 0x7FA491, 1);
    gr.beginFill(0x7FA491, 1);
    gr.drawCircle(0,0,this.Radius);
    gr.endFill();
    this.graphics.addChild(gr);

    var txt = new PIXI.Text("F");
    txt.x = -2;
    txt.y = -3;
    txt.style.font = "bold 8px Arial";
    this.graphics.addChild(txt);

};
BallFaster.prototype.destroy = function() {
    Ball.prototype.destroy.apply(this,arguments);
    Player.STEP += 2;
};