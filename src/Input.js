/**
 * Created by pikachu on 01.09.2015.
 */
var InputTracking = {
    direction: {x:0,y:0},
    prev_x:0,
    prev_y:0,
    next_x:0,
    next_y:0,
    isMoved:false,
    stop:function() {
        window.onmousemove = null;
        InputTracking.pressedKey = null;
        InputTracking.isMoved = false;
        InputTracking.direction.x = 0; InputTracking.direction.y = 0;
    },
    pressedKey: null,
    onKeyDown: function(e){
        if(InputTracking.pressedKey != -1)
            InputTracking.pressedKey = e.keyCode;

    },
    onKeyUp: function(e){
        if(e.keyCode == InputTracking.pressedKey || InputTracking.pressedKey == -1)  InputTracking.pressedKey = null;
    },
    setup: function (){
        document.addEventListener("keyup",InputTracking.onKeyUp,false);
        document.addEventListener("keydown",InputTracking.onKeyDown,false);
        document.addEventListener("mousedown",InputTracking.mousedown,false );
        document.addEventListener("mouseup",InputTracking.mouseup,false );

        document.addEventListener("touchstart",InputTracking.touchstart,false );
        document.addEventListener("touchend",InputTracking.touchend,false );
        document.addEventListener("touchmove",InputTracking.touchmove,false );
    },
    mousedown: function(e)
    {
        InputTracking.isMoved = true;
        InputTracking.prev_x = e.clientX;
        InputTracking.prev_y = e.clientY;
        InputTracking.next_x = InputTracking.prev_x;
        InputTracking.next_y = InputTracking.prev_y;
        window.onmousemove = InputTracking.mousemove;
    },
    mousemove: function(e){
        if(!InputTracking.isMoved) return;
        var dx,dy;
        dx = e.clientX - InputTracking.next_x;
        dy = e.clientY - InputTracking.next_y;

        if( Math.abs(dx) < Player.Radius &&  Math.abs(dy) < Player.Radius) return;
        InputTracking.next_x = e.clientX;
        InputTracking.next_y = e.clientY;


        if(Math.abs(dx) != Math.abs(dy)){
            if(Math.abs(dx) > Math.abs(dy))
            {

                InputTracking.direction.x = Math.sign(dx);
                InputTracking.direction.y = 0;
            }
            else {
                InputTracking.direction.x = 0;
                InputTracking.direction.y = Math.sign(dy);
            }
        }
    },
    mouseup: function(e)
    {
        InputTracking.stop();
    },
    touchstart: function(e)
    {
        InputTracking.isMoved = true;
        InputTracking.prev_x = e.touches[0].clientX;
        InputTracking.prev_y = e.touches[0].clientY;
        InputTracking.next_x = InputTracking.prev_x;
        InputTracking.next_y = InputTracking.prev_y;
        e.preventDefault();
    },
    touchend: function(e) {
        InputTracking.stop();
        e.preventDefault();
    },
    touchmove: function(e){

        if(!InputTracking.isMoved) return;

        var dx,dy;
        dx = e.touches[0].clientX - InputTracking.next_x;
        dy = e.touches[0].clientY - InputTracking.next_y;

        if( Math.abs(dx) < Player.Radius &&  Math.abs(dy) < Player.Radius) return;
        InputTracking.next_x = e.touches[0].clientX;
        InputTracking.next_y = e.touches[0].clientY;


        if(Math.abs(dx) != Math.abs(dy)){
            if(Math.abs(dx) > Math.abs(dy))
            {

                InputTracking.direction.x = Math.sign(dx);
                InputTracking.direction.y = 0;
            }
            else {
                InputTracking.direction.x = 0;
                InputTracking.direction.y = Math.sign(dy);
            }
        }
        e.preventDefault();
    }
};
