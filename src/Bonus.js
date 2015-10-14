/**
 * Created by pikachu on 05.09.2015.
 */

function Bonus(){
    this.Radius = 5;
    this.graphics= null;

    this.init();
    this.draw();
    PlayGround.addChild(this.graphics);

}
Bonus.prototype.draw = function (){
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(1, 0xC47AB5, 1);
    this.graphics.beginFill(0xC47AB5, 1);
    this.graphics.drawCircle(0,0,this.Radius);
    this.graphics.endFill();

};
Bonus.prototype.init = function (){

};
Bonus.prototype.doBonus = function (){

};
Bonus.prototype.destroy = function (){
    PlayGround.removeChild(this.graphics);

};
//////////////////////////////////////
function BonusFaster(){
    Bonus.apply(this, arguments);
}
BonusFaster.prototype = Object.create(Bonus.prototype);
BonusFaster.prototype.init = function (){
    var frames = [Game.assets.bottle1.texture,
        Game.assets.bottle2.texture,
        Game.assets.bottle3.texture,
        Game.assets.bottle4.texture,
        Game.assets.bottle5.texture,
        Game.assets.bottle6.texture];
    this.graphics = new PIXI.extras.MovieClip(frames);
    this.graphics.x = Math.customRandom(50, Game.gameArea.width - 50);
    this.graphics.y = Math.customRandom(50, Game.gameArea.height - 50);
    this.Radius = 15
};
BonusFaster.prototype.draw = function (){
    this.graphics.height = this.Radius *2;
    this.graphics.width = this.Radius *2;
    this.graphics.animationSpeed = 0.5;
    this.graphics.anchor.set(0.5,0.5);
    this.graphics.play();
};
BonusFaster.prototype.doBonus = function() {
    Player.graphics.emitter.emit = true;
    Player.STEP += 2;
};
///////////////////////////////////////////////////////
function BonusGold(){
    Bonus.apply(this, arguments);
}
BonusGold.prototype = Object.create(Bonus.prototype);
BonusGold.prototype.init = function (){
    this.Radius = 10;
    this.graphics = new PIXI.Sprite(Game.assets.gold.texture);
    this.graphics.x = Math.customRandom(30, Game.gameArea.width - 30);
    this.graphics.y = Math.customRandom(30, Game.gameArea.height - 30);
};
BonusGold.prototype.draw = function (){
    this.graphics.height = this.Radius *2;
    this.graphics.width = this.Radius *2;
    this.graphics.anchor.set(0.5,0.5);
};
BonusGold.prototype.doBonus = function() {
    Game.score +=25;
};