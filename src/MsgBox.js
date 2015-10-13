/**
 * Created by pikachu on 28.09.2015.
 */
function MsgBox(){
    PIXI.Container.apply(this, arguments);
    this.init1();
}
MsgBox.prototype = Object.create(PIXI.Container.prototype);
MsgBox.prototype.init1 = function() {
    var  msg  = new PIXI.Sprite( Game.resources.msgbox.texture);
    msg.anchor.set(0.5,0.5);
    msg.position.set(Game.gameArea.width/2,Game.gameArea.height/2);
    msg.buttonMode = true;
    msg.interactive = true;
    msg.tap = this.hideMsg;
    msg.click = this.hideMsg;
    this.addChild(msg);

    this.isShow = false;
    this.text = new PIXI.Text("text",{
        font : '25px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#557100',
        strokeThickness : 4,
        padding:20,align:"center"
    });

    this.text.anchor.set(0.5,0.5);
    this.text.position.set(msg.position.x,msg.position.y);

    this.addChild(this.text);

    this.callonrelease = null;
    this.separateBoxes = [];
};
MsgBox.prototype.showMsg = function(text,callonrelease){
    this.text.text = text;
    this.callonrelease = callonrelease;
    PlayGround.isMessageShowing = true;
    Game.stage.addChild(this);
};

MsgBox.prototype.hideMsg = function(){
    PlayGround.isMessageShowing = false;
    var mb = this.parent;
    for(var i=0;i<mb.separateBoxes.length; i++){
        Game.stage.removeChild(mb.separateBoxes[i]);
        mb.separateBoxes[i].callonrelease = null;
        mb.separateBoxes[i] = null;
    }
    Game.stage.removeChild(mb);
    mb.callonrelease.apply();
    mb.callonrelease = null;
    mb = null;

};