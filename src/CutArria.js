/**
 * Created by pikachu on 01.09.2015.
 */
var CutArria = {
    points:[],
    startEdgeId:null,
    endEdgeId:null,
    graphics:null,
    init1:function(){
        this.graphics= new PIXI.Graphics();
        PlayGround.addChild(this.graphics);
    },
    startNewCutArria:function(startPoint){
        this.graphics.clear();
        Array.clear(this.points);
        this.startEdgeId = startPoint.edgeId;
        this.points.push({x: startPoint.x, y: startPoint.y});
        this.graphics.lineStyle(3, 0xFFFFFF,1);
        this.graphics.moveTo(this.points[0].x, this.points[0].y);
        this.graphics.currentPath.shape.closed = false;

    },
    drawPath:function () {
        this.graphics.lineStyle(3, 0xFFFFFF,1);
        this.graphics.lineTo(Player.graphics.x, Player.graphics.y);
    }
};