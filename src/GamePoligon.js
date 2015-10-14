/**
 * Created by pikachu on 01.09.2015.
 */
var GamePoligon = {points:[],
    graphics: new PIXI.Graphics(),
    mask:new PIXI.Graphics(),
    addCutArria: function(){

        var poligon1=[],poligon2=[];
        if(CutArria.startEdgeId == CutArria.endEdgeId)
        {
            if(Math.abs(CutArria.points[0].x - GamePoligon.points[CutArria.startEdgeId].x)+
                Math.abs(CutArria.points[0].y - GamePoligon.points[CutArria.startEdgeId].y)>
                Math.abs(CutArria.points.last().x - GamePoligon.points[CutArria.startEdgeId].x)+
                Math.abs(CutArria.points.last().y - GamePoligon.points[CutArria.startEdgeId].y))

                CutArria.points.reverse();
        }
        else
        if(CutArria.startEdgeId > CutArria.endEdgeId)
        {
            var buff = CutArria.startEdgeId;
            CutArria.startEdgeId = CutArria.endEdgeId;
            CutArria.endEdgeId = buff;
            CutArria.points.reverse();
        }


        for(var i=CutArria.startEdgeId+1; i<=CutArria.endEdgeId;i++)
        {
            poligon1.push(GamePoligon.points[i]);
        }

        if(GamePoligon.points[CutArria.endEdgeId].x == CutArria.points.last().x &&
            GamePoligon.points[CutArria.endEdgeId].y == CutArria.points.last().y)
            i = CutArria.points.length-2;
        else
            i = CutArria.points.length-1;

        for(;i>=0;i--)
        {
            poligon1.push(CutArria.points[i]);
        }
//***********************************************************************************

        for(i=0;i<=CutArria.startEdgeId;i++)
        {
            poligon2.push(GamePoligon.points[i]);
        }

        if(GamePoligon.points[CutArria.startEdgeId].x == CutArria.points[0].x &&
            GamePoligon.points[CutArria.startEdgeId].y == CutArria.points[0].y)
            i = 1;
        else
            i = 0;

        for(;i<CutArria.points.length;i++)
        {
            poligon2.push(CutArria.points[i]);
        }

        if(CutArria.endEdgeId+1 < GamePoligon.points.length) {
            if (GamePoligon.points[CutArria.endEdgeId + 1].x == CutArria.points[0].x &&
                GamePoligon.points[CutArria.endEdgeId + 1].y == CutArria.points[0].y)
                i = CutArria.endEdgeId + 2;
            else
                i = CutArria.endEdgeId + 1;

            for(;i<GamePoligon.points.length;i++)
            {
                poligon2.push(GamePoligon.points[i]);
            }
        }

        Math.normolizePoligon(poligon1);
        Math.normolizePoligon(poligon2);

        var S1 = Math.poligonSquare(poligon1);
        var S2 = Math.poligonSquare(poligon2);


        Array.clear(GamePoligon.points);
        if(S1 > S2)
        {            //draw S2

            GamePoligon.deleteBallsInPoligon(poligon2);
            //GamePoligon.collectBonuses(poligon2);
            Game.score += Math.round(S1/ (Game.gameArea.width*Game.gameArea.height)*100);

            Array.clear(poligon2);
            GamePoligon.points = poligon1;
        }
        else
        {

            GamePoligon.deleteBallsInPoligon(poligon1);
            //GamePoligon.collectBonuses(poligon1);
            Game.score += Math.round(S1/ (Game.gameArea.width*Game.gameArea.height)*100);

            Array.clear(poligon1);
            GamePoligon.points = poligon2;
        }
        GameBoard.updateState();
        CutArria.graphics.clear();
        GamePoligon.drawPoligon();

    },
    drawPoligon: function(){

        this.mask.clear();
        this.graphics.clear();
        this.graphics.lineStyle(3, 0xFFFFFF, 1);
        this.mask.lineStyle(0, 0x000000, 1);
        this.mask.beginFill(0x000000, 1);
        this.graphics.moveTo(this.points[0].x, this.points[0].y);
        this.mask.moveTo(this.points[0].x, this.points[0].y);
        for (var j=1; j < this.points.length; j++)
        {
            this.graphics.lineTo(this.points[j].x, this.points[j].y);
            this.mask.lineTo(this.points[j].x, this.points[j].y);
        }
        this.graphics.lineTo(this.points[0].x, this.points[0].y);
        this.mask.moveTo(this.points[0].x, this.points[0].y);

        this.mask.endFill();
    },
    deleteBallsInPoligon: function(poligon){
        for(var i = 0; i < PlayGround.balls.length; )
        {
            if(Math.isInPolygon(PlayGround.balls[i].position , poligon)){
                PlayGround.balls[i].graphics.stop();
                PlayGround.trash.push(PlayGround.balls[i]);
                PlayGround.balls.splice(i,1);
            }
            else i++;
        }
    },
    collectBonuses: function(poligon){
        for(var i = 0; i < PlayGround.bonuses.length; )
        {
            if(Math.isInPolygon(PlayGround.bonuses[i].graphics , poligon)){
                PlayGround.bonuses[i].doBonus();
                PlayGround.bonuses[i].destroy();
                PlayGround.bonuses.splice(i,1);
            }
            else i++;
        }
    }

};