var Engine=function(e){function n(){var e=Date.now(),a=(e-p)/1e3;t(a),o(),p=e,f.requestAnimationFrame(n)}function a(){m(),p=Date.now(),n()}function t(e){"paused"==game.state?g(e):i(e)}function i(e){allEnemies.forEach(function(n){n.update(e)}),player.update()}function g(e){}function o(){var e,n,a=["images/water-block.png","images/stone-block.png","images/stone-block.png","images/stone-block.png","images/grass-block.png","images/grass-block.png"],t=6,i=5;for(e=0;e<t;e++)for(n=0;n<i;n++)h.drawImage(Resources.get(a[e]),101*n,83*e);r(),"start"==game.state&&s()}function r(){allEnemies.forEach(function(e){e.render()}),player.render()}function s(){h.fillStyle="rgba(0, 0, 0, 0.75)",h.fillRect(0,0,d.width,d.height),c(),l()}function c(){h.font="64px cursive",h.textAlign="center",h.fillStyle="white",h.fillText("Title",d.width/2,166),selector.render();for(var e=0;e<5;e++)h.drawImage(Resources.get(selector.charImages[e]),101*e,224)}function l(){}function m(){}var p,u=e.document,f=e.window,d=u.createElement("canvas"),h=d.getContext("2d");d.width=505,d.height=606,u.body.appendChild(d),Resources.load(["images/stone-block.png","images/water-block.png","images/grass-block.png","images/enemy-bug.png","images/char-boy.png","images/char-cat-girl.png","images/char-horn-girl.png","images/char-pink-girl.png","images/char-princess-girl.png","images/Selector.png"]),Resources.onReady(a),e.ctx=h}(this);