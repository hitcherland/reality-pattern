class BlackHole extends Game {
	start() {
		super.start();

		var this_=this;
		this.keydown={}
		addEventListener("keydown",function(ev) {
			this_.keydown[ev.key]=ev;
		});
		addEventListener("keyup",function(ev) {
			delete this_.keydown[ev.key];
		});

		var blackholeRadius=200;
		this.gravity=2;
		this.directionalLightPosition=[1,0,0];
		this.collisionManager=this.addChild(new Collider());

		this.blackhole = this.addChild(new Sphere(40,40));
		this.blackhole.scale=[blackholeRadius*2,blackholeRadius*2,1];
		this.blackhole.position=[-canvas.width/2-blackholeRadius*1.5,0,20];

		this.blackholeCollider=this.addChild(new GameObject());
		this.blackholeCollider.position=[-canvas.width/2+blackholeRadius*0.5,0,0]
		this.blackholeCollider.scale=[18,18,18]
		this.blackholeCollider.onCollision=function(X) {
			this_.ship.position=[0,0,0];
		}

		this.ship = this.addChild(new Cube());
		this.ship.scale=24;
		this.ship.position=[24,0,0];
		this.ship.speed=[3,0,0];
		this.ship.onCollision=function(X) {  }
		this.ship.rotation[1]=0.15;

		this.collisionManager.addCollisionDetection(this.ship);
		this.collisionManager.addCollisionDetection(this.blackholeCollider);
	}
	tick() {

		if(this.keydown["ArrowUp"]) {
			this.ship.position[0]+=this.ship.speed[0]
		}
		if(this.keydown["ArrowDown"]) {
			this.ship.position[0]-=this.ship.speed[0]
		}

		if(this.keydown["ArrowLeft"]) {
			this.ship.rotation[0]-=0.2;
		}
		if(this.keydown["ArrowRight"]) {
			this.ship.rotation[0]+=0.2;
		}

		this.ship.rotation[0]-=this.ship.rotation[0]/30;
		console.log(this.gravity);
		this.ship.position[0]-=this.gravity;

	}
}
