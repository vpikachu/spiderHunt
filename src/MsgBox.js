/**
 * Created by pikachu on 28.09.2015.
 */
function MsgBox(){
    PIXI.Container.apply(this, arguments);
    this.init1();
}
MsgBox.prototype = Object.create(PIXI.Container.prototype);
MsgBox.prototype.init1 = function() {
    var  msg  = new PIXI.Sprite( Game.assets.msgbox.texture);
    msg.anchor.set(0.5,0.5);
    msg.position.set(Game.gameArea.width/2,Game.gameArea.height/2);
    msg.buttonMode = true;
    msg.interactive = true;
    msg.tap = this.hideMsg;
    msg.click = this.hideMsg;
    this.addChild(msg);

    this.isShow = false;
    this.text = new PIXI.Text("text",{
        font : '30px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#557100',
        strokeThickness : 4,
        padding:20,align:"center"
    });

    this.text.anchor.set(0.5,0.5);
    this.text.position.set(msg.position.x,msg.position.y);

    this.addChild(this.text);

    this.callonrelease = null;
};
MsgBox.prototype.showMsg = function(text,callonrelease){
    this.text.text = text;
    this.callonrelease = callonrelease;
    PlayGround.isMessageShowing = true;
    Game.stage.addChild(this);
};

MsgBox.prototype.hideMsg = function(){
    if(actx != undefined) {
        sounds["sound/click.mp3"].play();
    }
    PlayGround.isMessageShowing = false;
    var mb = this.parent;
    Game.stage.removeChild(mb);
    if(mb.callonrelease != null )
    {
        mb.callonrelease.apply();
        mb.callonrelease = null;
    }
    mb = null;


};