/**
 * Created by pikachu on 28.09.2015.
 */
var MsgBox = new PIXI.Container();
MsgBox.init1 = function() {
    var  msg  = new PIXI.Sprite( Game.resources.msgbox.texture);
    msg.anchor.set(0.5,0.5);
    msg.position.set(Game.gameArea.width/2,Game.gameArea.height/2);
    msg.buttonMode = true;
    msg.interactive = true;
    msg.tap = MsgBox.hideMsg;
    msg.click = MsgBox.hideMsg;
    MsgBox.addChild(msg);

    MsgBox.isShow = false;
    MsgBox.text = new PIXI.Text("text",{
        font : '25px HennyPenny',
        fill : '#FFFFFF',
        stroke : '#557100',
        strokeThickness : 4,
        padding:20,align:"center"
    });

    MsgBox.text.anchor.set(0.5,0.5);
    MsgBox.text.position.set(msg.position.x,msg.position.y);

    MsgBox.addChild(MsgBox.text);

    MsgBox.callonrelease = null;
};



MsgBox.showMsg = function(text,callonrelease){
    MsgBox.text.text = text;
    MsgBox.callonrelease = callonrelease;
    MsgBox.isShow = true;
    Game.stage.addChild(MsgBox);
};
MsgBox.hideMsg = function(){
    MsgBox.isShow = false;
    Game.stage.removeChild(MsgBox);
    MsgBox.callonrelease.apply();
};
