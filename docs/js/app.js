var Enemy=function(){this.sprite="images/enemy-bug.png",this.start()};Enemy.prototype.start=function(){this.x=-101;var t=Math.floor(3*Math.random()+1);this.y=83*t-20,this.speed=Math.floor(500*Math.random()+100)},Enemy.prototype.update=function(t){this.x+=t*this.speed,this.x>505&&this.start()},Enemy.prototype.render=function(){ctx.drawImage(Resources.get(this.sprite),this.x,this.y)};var Player=function(){this.sprite="images/char-boy.png"};Player.prototype.update=function(t){},Player.prototype.render=function(){},Player.prototype.handleInput=function(){};var allEnemies=[new Enemy,new Enemy,new Enemy],player=new Player;document.addEventListener("keyup",function(t){var e={37:"left",38:"up",39:"right",40:"down"};player.handleInput(e[t.keyCode])});