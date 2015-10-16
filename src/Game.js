/**
 * Created by pikachu on 01.09.2015.
 */
var Game = {
    stage:null,
    screen: {width:540, height:960},
    designResolution: {width:540, height:960},
    gameArea: {width:540, height:960},
    devicePixelRatio:1,
    scaleFactor: 1,
    lives:3,
    level:1,
    score:0,
    bestScore:0,
    elapsed:Date.now(),
    now: Date.now(),
    assets:null,
    setup:function(){
        //scaling game to device resolution;
        this.devicePixelRatio = window.devicePixelRatio;
        this.scaleFactor = Math.min(window.innerWidth/this.designResolution.width,
            window.innerHeight/this.designResolution.height);
        this.screen.width = this.scaleFactor * this.designResolution.width;
        this.screen.height = this.scaleFactor * this.designResolution.height;

		/*if(this.detectmob()){
			this.screen.width = window.innerWidth;
			this.screen.height = window.innerHeight;
		}*/
        if(window.localStorage.getItem("$BEST_SCORE$") == null)     window.localStorage.setItem("$BEST_SCORE$",0);
        this.bestScore = window.localStorage["$BEST_SCORE$"];


        //loading screen
        var loading = PIXI.Sprite.fromImage("img/loading.png");
        loading.anchor.set(0.5,0.5);
        loading.position.set(this.designResolution.width/2, this.designResolution.height/2);
        this.stage = new PIXI.Container();
        this.stage.scale.set(this.scaleFactor);
        this.stage.addChild(loading);
        this.stage.doFlow= function(){};

        window.addEventListener("resize",Game.ongameresize);

        var loader = new PIXI.loaders.Loader();
        loader.add("background","img/background.png");
        loader.add("msgbox","img/msgbox.png");
        loader.add("fly1","img/fly/fly0001.png");
        loader.add("fly2","img/fly/fly0002.png");
        loader.add("fly3","img/fly/fly0003.png");
        loader.add("fly4","img/fly/fly0004.png");
        loader.add("butterfly1","img/butterfly/butterfly0001.png");
        loader.add("butterfly2","img/butterfly/butterfly0002.png");
        loader.add("butterfly3","img/butterfly/butterfly0003.png");
        loader.add("butterfly4","img/butterfly/butterfly0004.png");
        loader.add("godbug1","img/godbug/godbug0001.png");
        loader.add("godbug2","img/godbug/godbug0002.png");
        loader.add("godbug3","img/godbug/godbug0003.png");
        loader.add("godbug4","img/godbug/godbug0004.png");
        loader.add("gameboard","img/gameboard.png");
        loader.add("spyder1","img/spyder/spyder0001.png");
        loader.add("spyder2","img/spyder/spyder0002.png");
        loader.add("spyder3","img/spyder/spyder0003.png");
        loader.add("spyder4","img/spyder/spyder0004.png");
        loader.add("spyder5","img/spyder/spyder0005.png");
        loader.add("spyder6","img/spyder/spyder0006.png");
        loader.add("spyder7","img/spyder/spyder0007.png");
        loader.add("spyder8","img/spyder/spyder0008.png");
        loader.add("web","img/web.png");
        loader.add("gold","img/gold.png");
        loader.add("bottle1","img/bottle/bottle0001.png");
        loader.add("bottle2","img/bottle/bottle0002.png");
        loader.add("bottle3","img/bottle/bottle0003.png");
        loader.add("bottle4","img/bottle/bottle0004.png");
        loader.add("bottle5","img/bottle/bottle0005.png");
        loader.add("bottle6","img/bottle/bottle0006.png");
        loader.add("particle","img/particle.png");
        loader.add("backbutton","img/backbutton.png");
        loader.add("logo","img/logo.png");
        loader.add("hunter1","img/hunter/hunter0001.png");
        loader.add("hunter2","img/hunter/hunter0002.png");
        loader.add("hunter3","img/hunter/hunter0003.png");
        loader.add("hunter4","img/hunter/hunter0004.png");
        loader.add("hunter5","img/hunter/hunter0005.png");
        loader.add("hunter6","img/hunter/hunter0006.png");
        loader.load(Game.ontexturesload);
    },
    ontexturesload: function(loader,resouces){
        Game.assets = resouces;
        resouces = null;

        Game.gameArea.height = Game.designResolution.height-
            Game.assets.gameboard.texture.height;
        Game.gameArea.width = Game.designResolution.width;


        PlayGround.init1();
        MainMenu.init1();
        Game.rescaleScenes();

        if(actx != undefined){

        sounds.whenLoaded = Game.onsoundsload;
        sounds.load([
            "sound/coin.mp3",
            "sound/drink.mp3",
            "sound/click.mp3",
            "sound/blow.mp3",
            "sound/end_of_net.mp3",
            "sound/next_level.mp3",
            "sound/lost_life.mp3"

        ]);
        } else Game.onsoundsload();



    },
    onsoundsload: function(){
        sounds["sound/blow.mp3"].volume = 0.5;
        Game.showStartMenu();
        InputTracking.setup();
    },
    ongameresize: function() {
        Game.scaleFactor = Math.min(window.innerWidth/Game.designResolution.width,
            window.innerHeight/Game.designResolution.height);

        Game.screen.width = Game.scaleFactor * Game.designResolution.width;
        Game.screen.height = Game.scaleFactor * Game.designResolution.height;

        renderer.resize(Game.screen.width,Game.screen.height);

        Game.rescaleScenes();
    },
    rescaleScenes:function(){
        MainMenu.scale.set(Game.scaleFactor,Game.scaleFactor);
        PlayGround.scale.set(Game.scaleFactor,Game.scaleFactor);
    },
	detectmob: function detectmob() { 
		 if( navigator.userAgent.match(/Android/i)
		 || navigator.userAgent.match(/webOS/i)
		 || navigator.userAgent.match(/iPhone/i)
		 || navigator.userAgent.match(/iPad/i)
		 || navigator.userAgent.match(/iPod/i)
		 || navigator.userAgent.match(/BlackBerry/i)
		 || navigator.userAgent.match(/Windows Phone/i)
		 ){
			return true;
		  }
		 else {
			return false;
		  }
	},
    setBestScore: function(){
      if(this.score > this.bestScore) {
          this.bestScore = this.score;
          window.localStorage["$BEST_SCORE$"] = this.bestScore;
      }
    },
    showStartMenu: function(){
        Game.stage = MainMenu;
        MainMenu.bestScore.text = "Best score: "+Game.bestScore;
        MainMenu.bestScore.visible = Game.bestScore != 0;

    },
    checkIsWIN : function(){
        return PlayGround.balls.length <=1;
    }
};