/****************************************/
//main game functions
// create a renderer instance.

Game.setup();

var renderer = PIXI.autoDetectRenderer(Game.screen.width, Game.screen.height,{backgroundColor : 0x000000/*0xB0D8FF*/,antialias:true});
document.body.appendChild(renderer.view);


// run the render loop
animate();

Game.elapsed = Date.now();
function animate() {
    Game.now = Date.now();
    update();
    render();
    Game.elapsed = Game.now;
    requestAnimationFrame( animate );
}
function render(){
    renderer.render(Game.stage);
}
function update() {
    Game.stage.doFlow();
}
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////